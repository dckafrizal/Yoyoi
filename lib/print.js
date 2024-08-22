const {
  WAMessageStubType,
  generateWAMessage,
  areJidsSameUser,
  proto,
} = require("@whiskeysockets/baileys");
const chalk = require("chalk");
const { tanggal } = require("./myfunc");

module.exports = async (m, conn = {}, chatUpdate) => {
  let type = m.isGroup ? "GROUP CHAT" : "PRIVATE CHAT";

  let from = await conn.getName(m.chat);
  let number = m.sender.split("@")[0] + ` [ ${m.name} ]`;
  let isBot = m.isBaileys ? "YA" : "NO";
  let plugin = m.plugin;
  let headers = `${chalk.yellow.bold("--------------------------------------------------")}
     ${chalk.cyan.bold("• CHAT INFORMATION")}
 ${chalk.yellow.bold("-----------------------------------------------------------")}`;
  let body = `${chalk.green.bold(`• TYPE : ${type}`)}
${chalk.yellow.bold(`• DATE : ${tanggal(new Date())}`)}
 ${chalk.cyan.bold(`• FROM : ${from}`)}
${chalk.blue.bold(`• NUMBER : ${number}`)}
${chalk.yellow.bold(`• CHATBOT : ${isBot}`)}
 ${chalk.magenta.bold(`• PLUGIN : ${plugin || ""}`)}
${chalk.green.bold("• MIMTYPE :")} ${chalk.black(chalk.bgGreen(m.messageStubType ? WAMessageStubType[m.messageStubType] : m.mtype))}`;
  let command = `${chalk.green.bold("=======================================")}
${m.isCommand ? chalk.yellow.bold(m.text) : m.error ? chalk.red.bold(m.text) : chalk.white.bold(m.text)}
${chalk.green.bold("=======================================")}`;
  let footer = chalk.blue.bold("SCRIPT CHRISTY-MD BY RITZ");

  console.log(`${headers}\n${body}\n${command}\n${footer}`);
  const chat = db.data.chats[m.chat];
  let detect = false;
  if (chat.antiBot) {
    const groupMetadata = await conn.groupMetadata(m.chat);
    const participants = (m.isGroup ? groupMetadata.participants : []) || [];
    const user =
      (m.isGroup
        ? participants.find((u) => conn.decodeJid(u.id) === m.sender)
        : {}) || {}; // User Data
    const bot =
      (m.isGroup
        ? participants.find((u) => conn.decodeJid(u.id) == conn.user.jid)
        : {}) || {}; // Your Data
    const isRAdmin = user?.admin == "superadmin" || false;
    const isAdmin = isRAdmin || user?.admin == "admin" || false; // Is User Admin?
    const isBotAdmin = bot?.admin || false; // Are you Admin?

    if (m.isBaileys && !m.fromMe) {
      if (isAdmin || !isBotAdmin) {
      } else {
        await conn.sendMessage(m.chat, {
          text: `*[ System notice ]* Detect anoher bot, I will kick you`,
        });
        await conn.groupParticipantsUpdate(m.chat, [m.sender], "remove");
        detect = true;
      }
    }
  }
};

let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log("Update config.js");
  delete require.cache[file];
  require(file);
});
