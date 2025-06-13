const fs = require('fs');
const path = require('path');
const { cmd } = require('../command');

const REPLY_FILE = path.join(__dirname, '../autoreply.json');

function loadReplies() {
  if (!fs.existsSync(REPLY_FILE)) return {};
  return JSON.parse(fs.readFileSync(REPLY_FILE, 'utf-8'));
}

function saveReplies(data) {
  fs.writeFileSync(REPLY_FILE, JSON.stringify(data, null, 2));
}

// ✅ إضافة رد
cmd({ on: 'رد' }, async (conn, mek, m, { body, isCreator }) => {
  if (!isCreator) return m.reply('مش بسمعش غير كلام عمك لوسيفر يلا ومساعدين بتوعو 🤫 🖕🏻');

  const match = body.split('|');
  if (match.length < 3) return m.reply('❌ الصيغة: رد | الكلمة | الرد');

  const key = match[1].trim();
  const reply = match.slice(2).join('|').trim();

  const data = loadReplies();
  if (!data[key]) data[key] = [];

  if (!data[key].includes(reply)) {
    data[key].push(reply);
    saveReplies(data);
    m.reply(`✅ تم إضافة الرد على "${key}"`);
  } else {
    m.reply('❗ الرد ده موجود بالفعل للكلمة دي.');
  }
});

// ✅ حذف رد
cmd({ on: 'حذف' }, async (conn, mek, m, { body, isCreator }) => {
  if (!isCreator) return m.reply('مش بسمعش غير كلام عمك لوسيفر يلا ومساعدين بتوعو 🤫 🖕🏻');

  const match = body.split('|');
  if (match.length < 3) return m.reply('❌ الصيغة: حذف | الكلمة | الرد');

  const key = match[1].trim();
  const reply = match.slice(2).join('|').trim();

  const data = loadReplies();
  if (!data[key]) return m.reply('❌ مفيش ردود للكلمة دي.');

  const index = data[key].indexOf(reply);
  if (index === -1) return m.reply('❌ الرد ده مش موجود للكلمة دي.');

  data[key].splice(index, 1);
  if (data[key].length === 0) delete data[key];

  saveReplies(data);
  m.reply(`🗑️ تم حذف الرد "${reply}" من الكلمة "${key}"`);
});

// ✅ عرض كل الردود
cmd({ on: 'الردود' }, async (conn, mek, m, { isCreator }) => {
  if (!isCreator) return m.reply('مش بسمعش غير كلام عمك لوسيفر يلا ومساعدين بتوعو 🤫 🖕🏻');

  const data = loadReplies();
  if (Object.keys(data).length === 0) return m.reply('📭 مفيش أي ردود محفوظة.');

  let text = '*📚 الردود الحالية:*\n\n';
  for (const [key, replies] of Object.entries(data)) {
    text += `🗝️ *${key}*:\n${replies.map(r => `– ${r}`).join('\n')}\n\n`;
  }

  m.reply(text.trim());
});

// ✅ رد تلقائي
cmd({ on: 'body' }, async (conn, mek, m, { body }) => {
  try {
    const data = loadReplies();
    const key = Object.keys(data).find(k => k.toLowerCase() === body.toLowerCase());

    if (key) {
      const replies = data[key];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      await m.reply(randomReply);
    }
  } catch (err) {
    console.error('رد تلقائي خطأ:', err.message);
  }
});