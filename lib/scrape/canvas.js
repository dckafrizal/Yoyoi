const { createCanvas, loadImage, registerFont } = require('canvas');
const axios = require('axios');
const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs')

async function profile() {
const user = global.db.data.users[m.sender]
const ppUrl = await conn.profilePictureUrl(m.sender, 'image').catch((_) => "https://cdn.jsdelivr.net/gh/SazumiVicky/MakeMeow-Storage@main/avatar_contact.png");
const bg = await loadImage('https://telegra.ph/file/720d51abbba0a2c7d5c7d.jpg');
const profilePic = await loadImage(ppUrl);

// Register font
registerFont(path.join('src/maxim.ttf'), { family: 'Maxim' });

// Create canvas
const canvas = createCanvas(bg.width, bg.height);
const ctx = canvas.getContext('2d');

// Draw background
ctx.drawImage(bg, 0, 0, bg.width, bg.height);

// Draw profile picture (centered and circular)
const centerX = canvas.width / 1.37;
const centerY = canvas.height / 2;
const radius = canvas.width / 5.4; // Diameter = 1/6 of width (19:6 aspect ratio)

ctx.save();
ctx.beginPath();
ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
ctx.clip();
ctx.drawImage(profilePic, centerX - radius, centerY - radius, radius * 2, radius * 2);
ctx.restore();

// nama di bar
const leftText = '© dcodekemii'
ctx.font = '20px "Maxim"';
ctx.fillStyle = '#FFFFFF';
ctx.fillText(leftText, centerX - radius - 285, centerY + 88);

// Text Username 
const belowText = user.name
ctx.font = '27px "Maxim"';
ctx.fillStyle = '#FFBE2D';
ctx.textAlign = 'left';
ctx.fillText(belowText, centerX - radius - 220, centerY - 1);

ctx.font = '27px "Maxim"';
ctx.fillStyle = '#FFBE2D'; // Yellow text color
ctx.textAlign = 'left';
ctx.fillText(' Rp ' + user.saldo, centerX - radius - 220, centerY + 25);

  return profile.toBuffer();
}
module.exports = {
  profile,
};

let chalk = require("chalk");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright("Update 'config.js'"));
  delete require.cache[file];
  require(file);
});