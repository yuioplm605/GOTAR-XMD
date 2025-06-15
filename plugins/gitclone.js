const { cmd } = require("../command");
const { ownerNumber, botNumber } = require("../config");

cmd({
  pattern: "اسبام-استيكر",
  alias: ["سبام", "حرب-استيكر", "spam"],
  desc: "رد على استيكر وخلي عمك لوسيفر يغرقه سبام 🔥 (خاص بالمطور فقط)",
  react: "💥",
  category: "سبام لوسيفر",
  filename: __filename
}, async (conn, m, store, { reply, quoted, args, sender }) => {
  try {
    // تحقق إن اللي بيستخدم الأمر هو المطور فقط
    if (sender !== ownerNumber) {
      return reply("🖕🏻 مش بسمعش غير كلام عمك لوسيفر 🤫");
    }

    // لازم يرد على استيكر
    if (!quoted || !quoted.message || !quoted.message.stickerMessage) {
      return reply("❌ رد على استيكر يا نجم عشان أعمله اسبام 💀");
    }

    // عدد مرات التكرار (افتراضي 10)
    const count = parseInt(args[0]) || 10;
    if (count > 100) return reply("🚫 كفاية بقى يا لوسيفر، 100 مرة كحد أقصى!");

    reply(`😈 اسبام شغال يا عم لوسيفر… هيغرق بـ ${count} استيكر 💣`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(m.chat, { sticker: quoted.message.stickerMessage }, { quoted: m });
      await new Promise(r => setTimeout(r, 500)); // نص ثانية بين كل استيكر
    }

    reply("✅ خلصت اسبام الاستيكر يا كبير 🔥");

  } catch (e) {
    console.error("❌ Error in اسبام:", e);
    reply("❌ حصلت مشكلة وانا بسبّـم الاستيكر 😢");
  }
});