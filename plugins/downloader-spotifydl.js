const fetch = require('node-fetch');
const fs = require('fs');

let handler = async (m, { conn, text }) => {
  if (!text) {
    conn.reply(m.chat, '[❗] *Penggunaan:* .spotifydl <url>', m)
    return;
  }

  conn.sendMessage(m.chat, {
    react: {
      text: '⏳',
      key: m.key,
    }
  });
   
   conn.sendMessage(m.chat, { react: { text: '🚫', key: m.key }})
   let hasil = await spotify(text)
   conn.sendFile(m.chat, hasil, 'audio.mp3', '', m);
   await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key }})
};

handler.command = ['spotifydl'];
handler.tags = ['downloader'];
handler.help = ['spotifydl']
handler.group = false;
handler.register = true;

module.exports = handler;

async function spotify(url){
const res=await fetch('https://api.spotify-downloader.com/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'link='+url})
return res.json();
}

