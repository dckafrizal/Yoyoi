console.log("✅ Starting.....");
console.clear();
const http = require("http");
const os = require("os");
const port = 3000; //custom ports here, sample: (8080,3000,5000) and others
const express = require("express");
const Cfonts = require("cfonts");
const app = express();
Cfonts.say("CHRISTY MD", { font: "tiny" });
app.get("/", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  const data = {
    status: "true",
    message: "Christy is now running",
    author: "Ritz",
  };

  const result = {
    response: data,
  };
  res.send(JSON.stringify(result, null, 2));
});

app.listen(port, () => {
  //console.log(`Listening on port ${port}`);
});

cluster = require("cluster");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

let isRunning = false;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [path.join(__dirname, file), ...process.argv.slice(2)];
  const p = spawn(process.argv[0], args, {
    stdio: ["inherit", "inherit", "inherit", "ipc"],
  });

  p.on("message", (data) => {
    console.log(`[ Ritz ]${data}`);
    switch (data) {
      case "reset":
        p.kill();
        isRunning = false;
        start.apply(this, arguments);
        break;
      case "uptime":
        p.send(process.uptime());
        break;
    }
  });

  p.on("exit", (code) => {
    isRunning = false;
    console.error(`❌ sistem bot mati dengan kode: ${code}`);

    if (code === 0) return;

    fs.watchFile(args[0], () => {
      fs.unwatchFile(args[0]);
      start("main.js");
    });
  });

  p.on("error", (err) => {
    console.error("\x1b[31m%s\x1b[0m", `Error: ${err}`);
    p.kill();
    isRunning = false;
    start("main.js");
  });

  const pluginsFolder = path.join(__dirname, "plugins");

  fs.readdir(pluginsFolder, (err, files) => {
    if (err) {
      console.error(`Error reading plugins folder: ${err}`);
      return;
    }

    const chalk = require("chalk");
    let table = `${chalk.blue.bold("Christy MD By Ritz")}
${chalk.yellow.bold("-------------------------------------------------------------")}`;
    console.log(table);
  });

  setInterval(() => {}, 1000);
}

start("main.js");

process.on("unhandledRejection", () => {
  console.error(
    "\x1b[31m%s\x1b[0m",
    "Unhandled promise rejection. Script will restart...",
  );
  start("main.js");
});

process.on("exit", (code) => {
  console.error(`Exited with code: ${code}`);
  console.error("Script will restart...");
  start("main.js");
});
