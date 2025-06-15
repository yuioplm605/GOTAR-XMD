const { cmd } = require('../command');

cmd({
  pattern: "اسبام",
  desc: "⛔ اسبام تقيل جدا",
  category: "tools",
  filename: __filename
}, async (conn, m, { reply }) => {
  const text = "\u200E".repeat(4000) + "\n" + "⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠ ".repeat(300);
  await conn.sendMessage(m.chat, { text }, { quoted: m });
});

cmd({
  pattern: "اسبام2",
  desc: "⛔ اسبام اتقل جدا جدا",
  category: "tools",
  filename: __filename
}, async (conn, m, { reply }) => {
  const text = "\u200E".repeat(7000) + "\n" + "⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠ ".repeat(800);
  await conn.sendMessage(m.chat, { text }, { quoted: m });
});

cmd({
  pattern: "اسبام3",
  desc: "☠️ اسبام مميت 🔥",
  category: "tools",
  filename: __filename
}, async (conn, m, { reply }) => {
  const text = "\u200E".repeat(10000) + "\n" + "⎝⎝⛥ 𝐋𝐔𝐂𝐈𝐅𝐄𝐑 ⛥⎠⎠ ".repeat(2000);
  await conn.sendMessage(m.chat, { text }, { quoted: m });
});