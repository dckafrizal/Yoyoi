let handler = async (m, { conn, text }) => {
  let hashira = [
    { area: "Hashira", name: "Yoriichi Tsugikuni (Hashira Matahari)", tier: 5 },
    { area: "Hashira", name: "Gyomei Himejima (Hashira Batu)", tier: 4 },
    { area: "Hashira", name: "Sanemi Shinazugawa (Hashira Angin)", tier: 4 },
    { area: "Hashira", name: "Muichiro Tokito (Hashira Kabut)", tier: 3 },
    { area: "Hashira", name: "Giyu Tomioka (Hashira Air)", tier: 3 },
    { area: "Hashira", name: "Obanai Iguro (Hashira Ular)", tier: 3 },
    { area: "Hashira", name: "Tengen Uzui (Hashira Suara)", tier: 3 },
    { area: "Hashira", name: "Kyojuro Rengoku (Hashira Api)", tier: 3 },
    { area: "Hashira", name: "Mitsuri Kanroji (Hashira Cinta)", tier: 2 },
    { area: "Hashira", name: "Shinobu Kocho (Hashira Serangga)", tier: 2 },
    { area: "Hashira", name: "Kanae Kocho (Hashira Bunga)", tier: 2 },
    { area: "Non Hashira", name: "Kanao Tsuyuri (Lower Rank)", tier: 1 },
    { area: "Non Hashira", name: "Tanjiro Kamado (Lower Rank)", tier: 1 },
    { area: "Non Hashira", name: "Zenitsu Agatsuma (Lower Rank)", tier: 1 },
    { area: "Non Hashira", name: "Inosuke Hashibira (Lower Rank)", tier: 1 },
    { area: "Non Hashira", name: "Genya Shinazugawa (Lower Rank)", tier: 1 },
    { area: "Non Hashira", name: "Murata (Lower Rank)", tier: 1 },
    { area: "Non Hashira", name: "Ozaki (Lower Rank)", tier: 1 },
    { area: "Non Hashira", name: "Kaigaku (Lower Rank)", tier: 1 },
    { area: "Ex Hashira", name: "Jigoro Kuwajima", tier: 2 },
    { area: "Ex Hashira", name: "Sakonji Urokodaki", tier: 2 },
  ];

  let user = global.db.data.users[m.sender];
  let pengirim = m.sender.split("@")[0];

  let __timers = (new Date - global.db.data.users[m.sender].lasthunt);
  let _timers = (1200000 - __timers);
  let timers = clockString(_timers);

  if (!user.demon) {
    return conn.reply(m.chat, `Anda bukan *Demon* dan tidak dapat memburu Hashira atau Korps.`, m);
  }

  if (new Date - global.db.data.users[m.sender].lasthunt <= 1200000) {
    return conn.reply(m.chat, `⏳ Tunggu *${timers}* untuk berburu Hashira lagi`, m);
  }

  let area_hashira = hashira[Math.floor(Math.random() * hashira.length)];
  let hashiraName = area_hashira.name.toUpperCase();
  let hashiraTier = area_hashira.tier;

  let coins = parseInt(Math.floor(Math.random() * 100000 * hashiraTier));
  let exp = parseInt(Math.floor(Math.random() * 10000 * hashiraTier));
  let healing = Math.floor(Math.random() * 100 * hashiraTier);

  user.health -= healing;
  user.lasthunt = new Date * 1; // waktu hunt 2 menit

  if (user.health < 0) {
    let msg = `*@${pengirim}* Anda terluka parah dalam pertempuran melawan ${hashiraName}`;
    if (user.level > 0) {
      user.level -= 1;
      user.exp -= exp * 1;
      msg += `\n⚠️ Level Anda turun 1 karena terluka!`;
    }
    user.health = 100;
    conn.reply(m.chat, msg, m);
    return;
  }

  user.money += coins * 1;
  user.exp += exp * 1;
  global.db.data.users[m.sender].tiketcoin += 1;

  if (!user.hashirakill) {
    user.hashirakill = 0;
  }
  user.hashirakill += 1;

  // Increase stats based on hashira tier
  let statBoost = hashiraTier;
  user.defense = (user.defense || 0) + statBoost;
  user.regeneration = (user.regeneration || 0) + statBoost;
  user.attack = (user.attack || 0) + statBoost;
  user.speed = (user.speed || 0) + statBoost;
  user.health = (user.health || 0) + statBoost * 10; // Increasing health more significantly

  let pesan = `🎉 Kamu bertemu *${hashiraName}* dari _${area_hashira.area}_ dan berhasil mengalahkannya:\n
💰 *Money*: _${new Intl.NumberFormat('en-US').format(coins)}_
📈 *Xp*: _${new Intl.NumberFormat('en-US').format(exp)}_
❤️ *Health Lost*: _-${healing}_\n• *Tersisa* _${user.health}_ *Health*
🎟️ *Tiketcoin*: + _1_
🗡️ *Total Hashira Defeated*: _${user.hashirakill}_\n
📊 *Stat Boost*:
🛡️ *Defense*: + _${statBoost}_
💧 *Regeneration*: + _${statBoost}_
⚔️ *Attack*: + _${statBoost}_
⚡ *Speed*: + _${statBoost}_
❤️ *Health*: + _${statBoost * 10}_`;

  conn.reply(m.chat, pesan, m, {
    contextInfo: {
      externalAdReply: {
        mediaType: 1,
        title: 'AXELLDX',
        thumbnailUrl: 'https://telegra.ph/file/fdc90de73b6b0d8d199e3.jpg',
        renderLargerThumbnail: true,
        sourceUrl: ''
      }
    }
  });
};

handler.help = ['hashirakill', 'korpskill'];
handler.tags = ['rpg'];
handler.command = /^hashirakill|korpskill/i;
handler.limit = true;
handler.group = true;
handler.fail = null;

module.exports = handler;

function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':');
}