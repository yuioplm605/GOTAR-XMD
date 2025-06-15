const { cmd } = require("../command");
const config = require("../config");

cmd({
    pattern: "سبام",
    desc: "إرسال رسالة سبام بعدد معين (مطور فقط)",
    category: "tools",
    react: "💣",
    filename: __filename
}, async (conn, mek, m, { args, reply, sender }) => {

    // التحقق من إن اللي بيستخدم الأمر هو المطور
    if (!config.owner.some(owner => sender.includes(owner))) {
        return reply("✋🏻 مش بسمع غير كلام عمك لوسيفر والمساعدين بتوعه 🤫🖕🏻");
    }

    // التحقق من عدد ومدخلات الرسالة
    if (args.length < 2) {
        return reply("❗ الاستخدام:\n٭سبام <عدد> <الرسالة>");
    }

    const count = parseInt(args[0]);
    const message = args.slice(1).join(" ");

    if (isNaN(count)) {
        return reply("❗ اكتب عدد صحيح يا عم لوسيفر");
    }

    reply(`🚨 سبام شغال يا معلم... ${count} رسالة`);

    for (let i = 0; i < count; i++) {
        await conn.sendMessage(m.chat, { text: message });
        await new Promise(res => setTimeout(res, 100)); // تأخير 100ms
    }

    reply("نكت كسمك بي نجاح 💣💀");
});