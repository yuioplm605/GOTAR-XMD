const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "صور",
    alias: ["ص", "img", "searchimg"],
    react: "🖼️",
    desc: "دور على صور من الإنترنت 😍",
    category: "fun",
    use: ".صور <كلمة البحث>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) return reply("✋🏼 اكتبلي اللي عاوز تدور عليه يا نجم\nمثال: .صور قطط كيوت 😻");

        await reply(`🔍 بدورلك على صور لـ "${query}" ... استنى ثواني`);

        const url = `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`;

        const tokenRes = await axios.get(url);
        const tokenMatch = tokenRes.data.match(/vqd='([^']+)'/);

        if (!tokenMatch) return reply("⚠️ معرفتش أجبلك الصور، جرّب كلمة تانية.");

        const vqd = tokenMatch[1];
        const imgApi = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}`;

        const imgRes = await axios.get(imgApi, {
            headers: { "Referer": "https://duckduckgo.com/" }
        });

        const images = imgRes.data.results.slice(0, 5);

        if (!images.length) return reply("🙁 ملقتش صور.. جرب كلمة تانية.");

        for (const img of images) {
            await conn.sendMessage(from, {
                image: { url: img.image },
                caption: `🔎 نتيجة للبحث: *${query}*\n> *✪『𝙇𝙐𝘾𝙄𝙁𝙀𝙍』✪*`
            }, { quoted: mek });

            await new Promise(res => setTimeout(res, 1000));
        }

    } catch (err) {
        console.error("DuckDuckGo Error:", err.message);
        reply("💥 حصلت مشكلة وأنا بجيب الصور. جرب تاني بعد شوية.");
    }
});