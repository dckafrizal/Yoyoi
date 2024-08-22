(async () => {
  require("./config");
  const {
    default: makeWASocket,
    useMultiFileAuthState,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    makeWALegacySocket,
    DisconnectReason,
    fetchLatestBaileysVersion,
    PHONENUMBER_MCC,
    getAggregateVotesInPollMessage,
  } = require("@whiskeysockets/baileys");
  const WebSocket = require("ws");
  const path = require("path");
  const p = require("pino");
  const pino = require("pino");
  const Pino = require("pino");
  const { Boom } = require("@hapi/boom");
  const fs = require("fs");
  const chokidar = require("chokidar");
  const readline = require("readline");
  const NodeCache = require("node-cache");
  const yargs = require("yargs/yargs");
  const cp = require("child_process");
  const { promisify } = require("util");
  const exec = promisify(cp.exec).bind(cp);
  const _ = require("lodash");
  const syntaxerror = require("syntax-error");
  const os = require("os");
  const { randomBytes } = require("crypto");
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Makassar").format("HH:mm:ss");
  const chalk = require("chalk");
  const { color } = require("./lib/color");
  let simple = require("./lib/simple");
  var low;
  try {
    low = require("lowdb");
  } catch (e) {
    low = require("./lib/lowdb");
  }
  const { Low, JSONFile } = low;
  const randomID = (length) =>
    randomBytes(Math.ceil(length * 0.5))
      .toString("hex")
      .slice(0, length);

  API = (name, path = "/", query = {}, apikeyqueryname) =>
    (name in APIs ? APIs[name] : name) +
    path +
    (query || apikeyqueryname
      ? "?" +
        new URLSearchParams(
          Object.entries({
            ...query,
            ...(apikeyqueryname
              ? {
                  [apikeyqueryname]: APIKeys[name in APIs ? APIs[name] : name],
                }
              : {}),
          }),
        )
      : "");
  timestamp = {
    start: new Date(),
  };

  const PORT = process.env.PORT || 3000;

  global.opts = new Object(
    yargs(process.argv.slice(2)).exitProcess(false).parse(),
  );
  global.prefix = new RegExp(
    "^[" +
      (
        opts["prefix"] ||
        "â€ŽxzXZ/i!#$%+Â£Â¢â‚¬Â¥^Â°=Â¶âˆ†Ã—Ã·Ï€âˆšâœ“Â©Â®:;?&.\\-"
      ).replace(/[|\\{}()[\]^$+*?.\-\^]/g, "\\$&") +
      "]",
  );

  db = new Low(
    /https?:\/\//.test(opts["db"] || "")
      ? new cloudDBAdapter(opts["db"])
      : new JSONFile(`${opts._[0] ? opts._[0] + "_" : ""}database.json`),
  );

  DATABASE = db;
  loadDatabase = async function loadDatabase() {
    if (db.READ)
      return new Promise((resolve) =>
        setInterval(function () {
          !db.READ
            ? (clearInterval(this),
              resolve(db.data == null ? loadDatabase() : db.data))
            : null;
        }, 1 * 1000),
      );
    if (db.data !== null) return;
    db.READ = true;
    await db.read();
    db.READ = false;
    db.data = {
      users: {},
      chats: {},
      stats: {},
      msgs: {},
      sticker: {},
      settings: {},
      respon: {},
      ...(db.data || {}),
    };
    db.chain = _.chain(db.data);
  };
  loadDatabase();
  global.authFile = "sessions";
  const { state, saveState, saveCreds } = await useMultiFileAuthState(
    global.authFile,
  );
  const msgRetryCounterMap = (MessageRetryMap) => {};
  const msgRetryCounterCache = new NodeCache();
  let phoneNumber = global.numberbot;
  const { version } = await fetchLatestBaileysVersion();
  const pairingCode = !phoneNumber || process.argv.includes("--pairing");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const question = (texto) =>
    new Promise((resolver) => rl.question(texto, resolver));

  const connectionOptions = {
    printQRInTerminal: !pairingCode,
    syncFullHistory: true,
    markOnlineOnConnect: true,
    connectTimeoutMs: 60000,
    defaultQueryTimeoutMs: 0,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
    patchMessageBeforeSending: (message) => {
      const requiresPatch = !!(
        message.buttonsMessage ||
        message.templateMessage ||
        message.listMessage
      );
      if (requiresPatch) {
        message = {
          viewOnceMessage: {
            message: {
              messageContextInfo: {
                deviceListMetadataVersion: 2,
                deviceListMetadata: {},
              },
              ...message,
            },
          },
        };
      }

      return message;
    },
    version: (
      await (
        await fetch(
          "https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json",
        )
      ).json()
    ).version,
    browser: ["Ubuntu", "Chrome", "20.0.04"],
    logger: pino({ level: "fatal" }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(
        state.keys,
        pino().child({
          level: "silent",
          stream: "store",
        }),
      ),
    },
  };

  const getMessage = async (key) => {
    const messageData = await store.loadMessage(key.remoteJid, key.id);
    return messageData?.message || undefined;
  };

  global.conn = simple.makeWASocket(connectionOptions);

  if (pairingCode && !conn.authState.creds.registered) {
    const phoneNumber = await question(
      chalk.green.bold("=> Enter Your number here:\n"),
    );
    const code = await conn.requestPairingCode(phoneNumber);
    setTimeout(async () => {
      console.log(
        `${chalk.bold("=> Your Pairing code: ")} ${chalk.black(chalk.bgGreen(code))}`,
      );
    }, 3000);
  }

  conn.isInit = false;
  conn.logger.info(`🌀 Mohon tunggu sebentar...`);
  if (!opts["test"]) {
    if (db)
      setInterval(async () => {
        if (global.db.data) await db.write();
        if (opts["autocleartmp"] && (support || {}).find)
          (tmp = [os.tmpdir(), "tmp"]),
            tmp.forEach((filename) =>
              cp.spawn("find", [
                filename,
                "-amin",
                "3",
                "-type",
                "f",
                "-delete",
              ]),
            );
      }, 30 * 1000);
  }
  if (opts["server"]) require("./server")(conn, PORT);

  function clearTmp() {
    const tmp = [os.tmpdir(), path.join(__dirname, "./tmp")];
    const filename = [];
    tmp.forEach((dirname) =>
      fs
        .readdirSync(dirname)
        .forEach((file) => filename.push(path.join(dirname, file))),
    );
    filename.map(
      (file) => (
        (stats = fs.statSync(file)),
        stats.isFile() && Date.now() - stats.mtimeMs >= 1000 * 60 * 3
          ? fs.unlinkSync(file)
          : null
      ),
    );
  }

  setInterval(
    async () => {
      await exec("rm -rf ./tmp/*");
    },
    60 * 60 * 1000,
  );

  async function connectionUpdate(update) {
    const { connection, lastDisconnect, isNewLogin } = update;
    global.stopped = connection;
    if (isNewLogin) conn.isInit = true;
    const code =
      lastDisconnect?.error?.output?.statusCode ||
      lastDisconnect?.error?.output?.payload?.statusCode;
    if (
      code &&
      code !== DisconnectReason.loggedOut &&
      conn?.ws.socket == null
    ) {
      console.log(reloadHandler(true));
      global.timestamp.connect = new Date();
    }
    if (global.db.data == null) loadDatabase();
    if (update.qr != 0 && update.qr != undefined) {
      console.log(
        chalk.yellow(
          "🚩ㅤPindai kode QR ini, kode QR akan kedaluwarsa dalam 60 detik..",
        ),
      );
    }
    if (connection == "open") {
      console.log(
        chalk.yellow(
          "▣──────────────────────────────···\n│\n│❧ Suksess Terhubung Ke WhatsApp, Selamat Menggunakan Christy AI ^^  ✅\n│\n▣──────────────────────────────···",
        ),
      );
    }
    let reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
    if (connection === "close") {
      if (reason === DisconnectReason.badSession) {
        conn.logger.error(
          `[ ⚠ ] Sesi buruk, harap hapus folder ${global.authFile} dan pindai lagi.`,
        );
        //process.exit();
      } else if (reason === DisconnectReason.connectionClosed) {
        conn.logger.warn(`[ ⚠ ] Sambungan ditutup, menyambung kembali...`);
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.connectionLost) {
        conn.logger.warn(
          `[ ⚠ ] Kehilangan koneksi ke server, menghubungkan kembali...`,
        );
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.connectionReplaced) {
        conn.logger.error(
          `[ ⚠ ]  Koneksi diganti, sesi baru lainnya telah dibuka. Silakan keluar dari sesi saat ini terlebih dahulu.`,
        );
        //process.exit();
      } else if (reason === DisconnectReason.loggedOut) {
        conn.logger.error(
          `[ ⚠ ] Koneksi ditutup, harap hapus folder ${global.authFile} dan pindai lagi.`,
        );
        //process.exit();
      } else if (reason === DisconnectReason.restartRequired) {
        conn.logger.info(
          `[ ⚠ ] Waktu koneksi habis, menyambung kembali... perlu, restart server jika ada masalah`,
        );
        console.log(reloadHandler(true));
      } else if (reason === DisconnectReason.timedOut) {
        conn.logger.warn(`[ ⚠ ] Koneks terputus, menghubungkan ulang...`);
        console.log(reloadHandler(true));
      } else {
        conn.logger.warn(
          `[ ⚠ ] Koneksi Terputus ⚠️. ${reason || ""}: ${connection || ""}`,
        );
        console.log(reloadHandler(true));
      }
    }
    if (update.receivedPendingNotifications) {
      const deviceName = os.hostname();
      const message = `*[ Connection Open ]*
*•Name bot :* ${namebot}
*• Name Owner :* ${nameowner}
*• Owner Nunber :* wa.me/${nomorown}

*[ Server Network ]*
*• User :* ${process.env.USER || "Not Found"}
*• Node :* ${process.env.NODE_VERSION || "Not Found"}
*• Npm command :* ${process.env.npm_command || "Not Found"}
*• Command run :* ${process.env.CMD_RUN || "Not Found"}
*• Ip Address :* ${process.env.SERVER_IP || "Not Found"}
*• Ip Internal :* ${process.env.INTERNAL_IP || "Not Found"}`;

      await conn.sendMessage("6283187610223@s.whatsapp.net", {
        text: message,
      });
    }
  }
  process.on("uncaughtException", console.error);

  let isInit = true,
    handler = require("./handler");
  reloadHandler = function (restatConn) {
    let Handler = require("./handler");
    if (Object.keys(Handler || {}).length) handler = Handler;
    if (restatConn) {
      try {
        conn.ws.close();
      } catch {}
      conn = {
        ...conn,
        ...simple.makeWASocket(connectionOptions),
      };
    }
    if (!isInit) {
      conn.ev.off("messages.upsert", conn.handler);
      conn.ev.off("group-participants.update", conn.onParticipantsUpdate);
      conn.ev.off("connection.update", conn.connectionUpdate);
      conn.ev.off("creds.update", conn.credsUpdate);
    }

    conn.welcome =
      "Welcome to *@subject* @user\nSemoga betah Dan jangan lupa baca deskripsi\n@desc";
    conn.bye = "Goodbye @user,\nSemoga tenang di alam sana.";
    conn.spromote = "@user telah naik jabatan";
    conn.sdemote = "@user telah turun jabatan🗿";
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
  
  let pluginFolder = path.join(__dirname, "plugins");
  let pluginFilter = (filename) => /\.js$/.test(filename);
  plugins = {};
  for (let filename of fs.readdirSync(pluginFolder).filter(pluginFilter)) {
    try {
      plugins[filename] = require(path.join(pluginFolder, filename));
    } catch (e) {
      conn.logger.error(e);
      delete plugins[filename];
    }
  }
  console.log(Object.keys(plugins));
  reload = (_ev, filename) => {
    if (pluginFilter(filename)) {
      let dir = path.join(pluginFolder, filename);
      if (dir in require.cache) {
        delete require.cache[dir];
        if (fs.existsSync(dir))
          conn.logger.info(`re - require plugin '${filename}'`);
        else {
          conn.logger.warn(`deleted plugin '${filename}'`);
          return delete plugins[filename];
        }
      } else conn.logger.info(`requiring new plugin '${filename}'`);
      let err = syntaxerror(fs.readFileSync(dir), filename);
      if (err)
        conn.logger.error(`syntax error while loading '${filename}'\n${err}`);
      else
        try {
          plugins[filename] = require(dir);
        } catch (e) {
          conn.logger.error(`error require plugin '${filename}\n${e}'`);
        } finally {
          plugins = Object.fromEntries(
            Object.entries(plugins).sort(([a], [b]) => a.localeCompare(b)),
          );
        }
    }
  };
  Object.freeze(reload);
  fs.watch(path.join(__dirname, "plugins"), reload);
  reloadHandler();

  async function _quickTest() {
    let test = await Promise.all(
      [
        cp.spawn("ffmpeg"),
        cp.spawn("ffprobe"),
        cp.spawn("ffmpeg", [
          "-hide_banner",
          "-loglevel",
          "error",
          "-filter_complex",
          "color",
          "-frames:v",
          "1",
          "-f",
          "webp",
          "-",
        ]),
        cp.spawn("convert"),
        cp.spawn("magick"),
        cp.spawn("gm"),
        cp.spawn("find", ["--version"]),
      ].map((p) => {
        return Promise.race([
          new Promise((resolve) => {
            p.on("close", (code) => {
              resolve(code !== 127);
            });
          }),
          new Promise((resolve) => {
            p.on("error", (_) => resolve(false));
          }),
        ]);
      }),
    );
    let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test;
    console.log(test);
    let s = (support = {
      ffmpeg,
      ffprobe,
      ffmpegWebp,
      convert,
      magick,
      gm,
      find,
    });
    Object.freeze(support);

    if (!s.ffmpeg)
      conn.logger.warn(
        "Please install ffmpeg for sending videos (pkg install ffmpeg)",
      );
    if (s.ffmpeg && !s.ffmpegWebp)
      conn.logger.warn(
        "Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)",
      );
    if (!s.convert && !s.magick && !s.gm)
      conn.logger.warn(
        "Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)",
      );
  }

  _quickTest()
    .then(() => conn.logger.info("Quick Test Done"))
    .catch(console.error);

  console.log(color(time, "white"), color("Connecting...", "aqua"));
})();

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}
