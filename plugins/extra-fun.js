const { cmd } = require("../command");
const config = require('../config');

cmd({
  pattern: "توافق",
  alias: ["صداقة", "فحص"],
  desc: "احسب نسبة التوافق بين اتنين.",
  category: "fun",
  react: "💖",
  filename: __filename,
  use: "@شخص1 @شخص2",
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 2) {
      return reply("منشن اتنين عشان احسب التوافق بينهم.\nمثال: `.توافق @user1 @user2`");
    }

    let user1 = m.mentionedJid[0]; 
    let user2 = m.mentionedJid[1]; 

    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;

    let compatibilityScore = Math.floor(Math.random() * 1000) + 1;

    if (user1 === specialNumber || user2 === specialNumber) {
      compatibilityScore = 1000;
      return reply(`💖 نسبة التوافق بين @${user1.split('@')[0]} و @${user2.split('@')[0]} هي: ${compatibilityScore}+/1000 💖`);
    }

    await conn.sendMessage(mek.chat, {
      text: `💖 نسبة التوافق بين @${user1.split('@')[0]} و @${user2.split('@')[0]} هي: ${compatibilityScore}/1000 💖`,
      mentions: [user1, user2],
    }, { quoted: mek });

  } catch (error) {
    console.log(error);
    reply(`❌ حصلت مشكلة: ${error.message}`);
  }
});

  cmd({
  pattern: "الهالة",
  desc: "احسب مستوى الهالة بتاع أي حد.",
  category: "fun",
  react: "💀",
  filename: __filename,
  use: "@منشن",
}, async (conn, mek, m, { args, reply }) => {
  try {
    if (args.length < 1) {
      return reply("منشن حد عشان احسبله الهالة بتاعته.\nمثال: `.الهالة @user`");
    }

    let user = m.mentionedJid[0]; 
    const specialNumber = config.DEV ? `${config.DEV}@s.whatsapp.net` : null;

    let auraScore = Math.floor(Math.random() * 1000) + 1;

    if (user === specialNumber) {
      auraScore = 999999;
      return reply(`💀 الهالة بتاعت @${user.split('@')[0]} مرعبة: ${auraScore}+ 🗿`);
    }

    await conn.sendMessage(mek.chat, {
      text: `💀 الهالة بتاعت @${user.split('@')[0]}: ${auraScore}/1000 🗿`,
      mentions: [user],
    }, { quoted: mek });

  } catch (error) {
    console.log(error);
    reply(`❌ حصلت مشكلة: ${error.message}`);
  }
});

cmd({
    pattern: "جلد",
    desc: "جلد حد هزار كده في الجروب 😹🔥",
    category: "fun",
    react: "🔥",
    filename: __filename,
    use: "@منشن"
}, async (conn, mek, m, { q, reply }) => {
    let roasts = [
        "يا ابني إنت دماغك أبطأ من النت في القرية 😂",
        "تفكيرك عامل زي بطارية نوكيا، بيخلص من غير ما تستخدمه!",
        "وشك يخوف أكتر من تحديثات واتساب المفاجئة!",
        "انت ليه حاسس إنك مهم؟ حتى جوجل مش بيطلعلك!",
        "دماغك شغالة على ويندوز 98 ولسه بتتهنج!",
        "أنت لو دخلت امتحان ذكاء هتطلع بدرجة سالب!",
        "إنت نسخة بيتا من البني آدمين، ولسه محتاج تحديثات!",
        "كل ما تتكلم بحس إن في فايروس دخل الموبايل!",
        "يا عم إنت عبقري على الفاضي، محدش بيستخدمك!",
        "إنت مثال حي على جملة 'فاضي بس بيحب يتكلم'!",
        "أفكارك عاملة زي الواي فاي في المترو، موجودة بس مش شغالة!",
        "مفيش فرق بينك وبين رسالة '404 not found'!",
        "وشك لو دخل موسوعة هيبقى في قسم الحوادث!",
        "إنت مينفعش تتحط في جروب، تتحط في quarantine!",
        "إنت السبب الرئيسي في كتم صوت الجروب 😂",
        "الوحيد اللي ممكن يخلي سيري تقولك: 'مش فاضية ليك دلوقتي'!",
        "لما بتتكلم، الميمز بتتولد تلقائي!",
        "إنت محتاج antivirus في دماغك قبل ما تتكلم!",
        "مخك في وضع الطيران من زمان!",
        "حتى جوجل بيقولك: 'ملناش دعوة بيه ده'!",
        "أنت تقدر تتحط تحت تصنيف: 'خطأ بشري غير قابل للإصلاح'!",
        "إنت لو دخلت عالم مارفل هتبقى شخصية شريرة بس غبية!",
        "يا عم إنت تهريجك محتاج VPN عشان يفهموه!",
        "إنت الوحيد اللي لو اتحط في فيلم، هيبقى التصنيف (مأساوي كوميدي)!"
    ];               
        
    let randomRoast = roasts[Math.floor(Math.random() * roasts.length)];
    let sender = `@${mek.sender.split("@")[0]}`;
    let mentionedUser = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);

    if (!mentionedUser) {
        return reply("استعمل الأمر كده: .جلد @حد منشنه عشان أفرمه 😂");
    }

    let target = `@${mentionedUser.split("@")[0]}`;
    
    let message = `${target} :\n *${randomRoast}*\n> كله هزار يا نجم، متزعلش 🖤😂`;
    await conn.sendMessage(mek.chat, { text: message, mentions: [mek.sender, mentionedUser] }, { quoted: mek });
});

cmd({
    pattern: "مدح",
    desc: "مدح شخص متمنشن بكلام حلو",
    category: "مرح",
    react: "💖",
    filename: __filename,
    use: "@tag"
}, async (conn, mek, m, { reply }) => {
    let compliments = [
        "وشك يفتح النفس يا سكر 🤍",
        "أنت شبه القمر في الليالي الصفرا 🌙✨",
        "أنت مش طبيعي، جمالك دا مايتوصفش 😍",
        "لو في حد يستاهل كلمة مميز، فأنت وبس 🤩",
        "ضحكتك لحالها ممكن تصالح بين اتنين متخانقين 😂❤️",
        "أنت من الناس اللي وجودهم بيطمن 💛",
        "اللي شبهك مافيش منه اتنين 👑",
        "أنت عامل زي النسمة في عز الحر 💨☀️",
        "ربنا يخليك كده دايمًا منوّر الدنيا 🌟",
        "يا بخت اللي يعرفك، ويا بخت اللي صاحبك 💘"
    ];

    let target = m.mentionedJid[0] || (mek.quoted && mek.quoted.sender);
    if (!target) return reply("منشن حد عشان أمدحه يا جميل 😅");

    let name = `@${target.split("@")[0]}`;
    let randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

    await conn.sendMessage(mek.chat, {
        text: `🙈 ${name} \n${randomCompliment}`,
        mentions: [target]
    }, { quoted: mek });
});

cmd(
    {
        pattern: "تحويل_نص-لاموجي",
        desc: "يحوّل الكلام لإيموجي",
        category: "مرح",
        react: "✔️",
        filename: __filename,
        use: "<نص>"
    },
    async (conn, mek, m, { args, q, reply }) => {
        try {
            let text = args.join(" ");
            if (!text) return reply("اكتب حاجه احولهالك لإيموجي يا عم ✋😂");

            let emojiMapping = {
                "a": "🅰️", "b": "🅱️", "c": "🇨️", "d": "🇩️",
                "e": "🇪️", "f": "🇫️", "g": "🇬️", "h": "🇭️",
                "i": "🇮️", "j": "🇯️", "k": "🇰️", "l": "🇱️",
                "m": "🇲️", "n": "🇳️", "o": "🅾️", "p": "🇵️",
                "q": "🇶️", "r": "🇷️", "s": "🇸️", "t": "🇹️",
                "u": "🇺️", "v": "🇻️", "w": "🇼️", "x": "🇽️",
                "y": "🇾️", "z": "🇿️",
                "0": "0️⃣", "1": "1️⃣", "2": "2️⃣", "3": "3️⃣",
                "4": "4️⃣", "5": "5️⃣", "6": "6️⃣", "7": "7️⃣",
                "8": "8️⃣", "9": "9️⃣", " ": "⠀"
            };

            let emojiText = text.toLowerCase().split("").map(char => emojiMapping[char] || char).join("");
            await conn.sendMessage(mek.chat, {
                text: `🔤 *كلامك بإيموجي يا معلم:*\n\n${emojiText}`
            }, { quoted: mek });

        } catch (error) {
            console.log(error);
            reply(`فيه حاجه غلط حصلت 😅\n${error.message}`);
        }
    }
);