const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "wstalk",
    alias: ["channelstalk", "chinfo"],
    desc: "Get WhatsApp channel information",
    category: "utility",
    react: "🔍",
    filename: __filename
},
async (conn, mek, m, { from, reply, args }) => {
    try {
        // Rejoindre les arguments en une seule chaîne
        const url = args.join(" ");
        if (!url) return reply("❌ Please provide a WhatsApp channel URL\nExample: .wstalk https://whatsapp.com/channel/0029Vad7YNyJuyA77CtIPX0x");

        // Extraire l'ID du canal depuis l'URL
        const channelId = url.match(/channel\/([0-9A-Za-z]+)/i)?.[1];
        if (!channelId) return reply("❌ Invalid WhatsApp channel URL");

        // API endpoint
        const apiUrl = `https://itzpire.com/stalk/whatsapp-channel?url=https://whatsapp.com/channel/${channelId}`;

        // Requête API
        const response = await axios.get(apiUrl);
        const data = response.data.data;

        // Format des informations
        const channelInfo = `╭━━〔 *CHANNEL INFO* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• *📢 Title*: ${data.title}
┃◈┃• *👥 Followers*: ${data.followers}
┃◈┃• *📝 Description*: ${data.description.replace(/\n/g, '\n┃◈┃• ')}
┃◈└───────────┈⊷
╰──────────────┈⊷
> © *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅʏʙʏ ᴛᴇᴄʜ*`;

        // Envoi de l'image avec les infos
        await conn.sendMessage(from, {
            image: { url: data.img },
            caption: channelInfo,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in wstalk command:", e);
        reply(`❌ Error: ${e.response?.data?.message || e.message}`);
    }
});
