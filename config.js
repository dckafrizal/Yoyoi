//RECORD BY RITZ 
//SORRY AGAK JELEK

global.owner = ["6288294872511", "6283187610223"];
global.mods = ["6288294872511"]; // Moderator
global.prems = ["6288294872511"]; // Premium
// YANG ATAS ITU UBAH JADI NOMOR LU
// & YG BAWAH INI, NOMOR,NAMA,EMAIL LU
global.fsizedoc = "45000000000"; // default 10TB
global.fpagedoc = "19";
global.numberbot = "6283187610223";
global.namedoc = "Christy Bot Whatsapp Multi device";
global.author = 'Ritz';
global.nameowner = "Ritz";
global.nomorown = "6288294872511";
global.dana = "083187610223";
global.pulsa = "083187610223";
global.ovo = "083187610223";
global.saweria = "https://saweria.co/Reskiyani";
global.namebot = "Christy - MD";
global.sgc = "https://chat.whatsapp.com/HFh6WiecebfB0rLu3HC8dH";
global.sourceUrl = "https://whatsapp.com/channel/0029VaX3jOgAe5VguykGye3k";
global.sig = "https://www.instagram.com/ritz.404/";
global.swa = "wa.me/6288294872511";
global.gif = "https://telegra.ph/file/46860212557abb12acc78.mp4"; //Ini buat gif yang di menu
global.icon = "https://telegra.ph/file/f20440d800c473fb5fe4c.jpg";
global.thumb = "https://telegra.ph/file/77d1b32f6b6c99cf4a263.jpg";
global.version = "BetaV2";
global.wm = "Christy MD 2023-2024";
global.watermark = "Christy - Multidevice";
global.wm2 = "Christy - Multidevice";
global.wm3 = "Christy - Multidevice";
global.isPairing = true;
global.wm4 = "Christy - Multidevice";
global.fla =
  "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=";
global.wait = "*[ PLEASE WAIT... ]*";
global.eror = "*[ SYSTEM ERROR ]*";
global.done = "```Christy MD 2023-2024```";
global.salah = "Salah\n";
global.web = "https://whatsapp.com/channel/0029VaX3jOgAe5VguykGye3k";
global.packname = "[ STICKER BY CHRISTY-BOT ]";
global.author = `Always Ritz`;
//APIKEY 
global.btc = 'zz7zuBmf'
global.lann = 'always' 
//BATAS
global.multiplier = 100;
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      exp: "✉️",
      money: "💵",
      potion: "🥤",
      diamond: "💎",
      common: "📦",
      uncommon: "🎁",
      mythic: "🗳️",
      legendary: "🗃️",
      pet: "🎁",
      sampah: "🗑",
      armor: "🥼",
      sword: "⚔️",
      kayu: "🪵",
      batu: "🪨",
      string: "🕸️",
      kuda: "🐎",
      kucing: "🐈",
      anjing: "🐕",
      petFood: "🍖",
      gold: "👑",
      emerald: "💚",
    };
    let results = Object.keys(emot)
      .map((v) => [v, new RegExp(v, "gi")])
      .filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

global.danied = {
  contextInfo: {
    mentionedJid: [],
    groupMentions: [],
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "1203631440383540@newsletter",
      newsletterName: "CHRISTY - MULTI DEVICE",
      serverMessageId: -1,
    },
    forwardingScore: 256,
    externalAdReply: {
      title: `[ x ] Your Acces has Danied`,
      body: null,
      thumbnailUrl: "https://telegra.ph/file/07ef1888fca19d324fd4c.jpg",
      sourceUrl:  sgc,
      mediaType: 1,
      renderLargerThumbnail: true,
    },
  },
};
let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update config.js");
  delete require.cache[file];
  require(file);
});