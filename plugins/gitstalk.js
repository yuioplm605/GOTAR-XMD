const { cmd } = require("../command");
const { owner } = require("../config");

cmd({
  pattern: "اسبام-صور",
  alias: ["spamimg", "spic"],
  desc: "اسبام صور متكررة برد على صورة",
  react: "📸",
  category: "fun",
  filename: __filename
}, async (conn, m, store, {
  args,
  reply,
  isOwner,
  quoted,
  sender
}) => {
  if (!owner.includes(sender.split("@")[0])) {
    return reply("🛑 مش بسمع غير كلام عمك لوسيفر يلا 🤫🖕🏻");
  }

  const count = parseInt(args[0]);
  if (!quoted || !quoted.message || !quoted.message.imageMessage) {
    return reply("❌ لازم ترد على صورة عشان أعمل اسبام!");
  }

  if (isNaN(count) || count < 1 || count > 100) {
    return reply("⚠️ اكتب رقم بين 1 و 100 يا جامد!");
  }

  const media = await conn.downloadMediaMessage(quoted);

  for (let i = 0; i < count; i++) {
    await conn.sendMessage(m.chat, { image: media }, { quoted: m });
    await new Promise(res => setTimeout(res, 100)); // 100 ملي ثانية بس
  }

  reply(`✅ خلصت اسبام ${count} صورة يا عمهم!`);
});