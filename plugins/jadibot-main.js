let baileys = require("@whiskeysockets/baileys");
let {
  useMultiFileAuthState,
  DisconnectReason,
  makeInMemoryStore,
  jidNormalizedUser,
  makeCacheableSignalKeyStore,
  PHONENUMBER_MCC,
} = baileys;
let { Boom } = require("@hapi/boom");
let NodeCache = require("node-cache");
let Pino = require("pino");
let simple = require("../lib/simple");
let fs = require("fs");

if (global.ak instanceof Array) console.log();
else global.ak = [];

let handler = async (m, { conn, args, usedPrefix, command, isOwner, text }) => {
  let ak = global.conn;
  let user = global.db.data.users[m.sender];

  let authFile = "database/jadibot/" + m.sender.split("@")[0];
  let isInit = !fs.existsSync(authFile);
  let { state, saveCreds } = await useMultiFileAuthState(authFile);
  let msgRetryCounterCache = new NodeCache();

  const config = {
    logger: Pino({ level: "fatal" }).child({ level: "fatal" }),
    printQRInTerminal: false,
    mobile: false,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        Pino({ level: "fatal" }).child({ level: "fatal" }),
      ),
    },
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  };
  conn = simple.makeWASocket(config);
  let ev = conn.ev;

  if (!conn.authState.creds.registered) {
    setTimeout(async () => {
      let phoneNumber = m.sender.split("@")[0];
      let code = await conn.requestPairingCode(phoneNumber);
      let hasilcode = code?.match(/.{1,4}/g)?.join("-") || code;
      let key = await ak.reply(
        m.chat,
        "*[ System Guide ]* Kamu telah mendapatkan notifikasi dari perangkat tuatan, salin kode dibawah, tekan tombol notifikasi, kemudian tempel kode tersebut maka kamu akan menjadi bot sementara",
        m,
      );
      await ak.reply(m.chat, hasilcode, key);
    }, 3000);
  }

  async function connectionUpdate(update) {
    const { connection, lastDisconnect } = update;
    console.log(update);
    if (connection == "connecting") {
      console.log(connection);
    } else if (connection == "open") {
      ak.reply(m.chat, `*[ System Notice ]* Success Comment To WhatsApp`);
      global.ak.push(conn);
    } else if (connection === "close") {
      let statusCode = new Boom(lastDisconnect?.error)?.output.statusCode;
      if (statusCode === DisconnectReason.badSession) {
        console.log("Bad Session File, Please Delete Session and Scan Again");
        ak.logout();
        ak.reply(m.chat, '*[ System Notice ]" Deleting sessions...');
      } else if (statusCode === DisconnectReason.connectionClosed) {
        console.log("Connection closed, reconnecting....");
        console.log(reloadHandler(true));
      } else if (statusCode === DisconnectReason.connectionLost) {
        console.log("Connection Lost from Server, reconnecting...");
        console.log(reloadHandler(true));
      } else if (statusCode === DisconnectReason.connectionReplaced) {
        console.log(
          "Connection Replaced, Another New Session Opened, Please Close Current Session First",
        );
        ak.logout();
      } else if (statusCode === DisconnectReason.loggedOut) {
        console.log("Device Logged Out, Please Scan Again And Run.");
        ak.logout();
      } else if (statusCode === DisconnectReason.restartRequired) {
        console.log("Restart Required, Restarting...");
        console.log(reloadHandler(true));
        ak.reply(m.chat, "*[ System Notice ]* merestart");
      } else if (statusCode === DisconnectReason.timedOut) {
        console.log("Connection TimedOut, Reconnecting...");
        console.log(reloadHandler(true));
      } else {
        ak.end("Unknown DisconnectReason: " + statusCode + "|" + connection);
      }
    }
  }
  reloadHandler = function (restatConn) {
    let Handler = require("../handler");
    let handler = require("../handler");
    if (Object.keys(Handler || {}).length) handler = Handler;
    if (restatConn) {
      try {
        conn.ws.close();
      } catch {}
      conn = {
        ...conn,
        ...simple.makeWASocket(config),
      };
    }
    if (!isInit) {
      conn.ev.off("messages.upsert", conn.handler);
      conn.ev.off("group-participants.update", conn.onParticipantsUpdate);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }

    conn.welcome = "Hai, @user!\nSelamat datang di grup *@subject*\n\n@desc";
    conn.bye = "Selamat tinggal @user!";
    conn.spromote = "@user sekarang admin!";
    conn.sdemote = "@user sekarang bukan admin!";
    conn.handler = handler.handler.bind(conn);
    conn.onParticipantsUpdate = handler.participantsUpdate.bind(conn);
    conn.connectionUpdate = connectionUpdate.bind(conn);
    conn.credsUpdate = saveCreds.bind(conn);

    conn.ev.on("messages.upsert", conn.handler);
    conn.ev.on("group-participants.update", conn.onParticipantsUpdate);
    conn.ev.on("connection.update", conn.connectionUpdate);
    conn.ev.on("creds.update", conn.credsUpdate);
    isInit = false;
    return true;
  };
  reloadHandler();
};
handler.help = ["jadibot"].map((a) => a + " *[bot clone akiraa]*");
handler.tags = ["jadibot"];
handler.command = ["jadibot"];
handler.limit = true;
handler.private = true;
module.exports = handler;
