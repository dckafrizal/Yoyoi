let handler = async (m, { conn }) => {
  let user = global.db.data.users[m.sender];
  let lastClaimTime = user.lastDailyClaim || 0; // default to 0 if undefined
  let claimInterval = 5 * 24 * 60 * 60 * 1000; // 5 days in milliseconds
  let now = new Date().getTime();
  let nextClaimTime = lastClaimTime + claimInterval;
  let remainingTime = nextClaimTime - now;

  if (remainingTime <= 0) { // User can claim again
    user.money += 2000000;
    user.exp += 100000;
    user.lastDailyClaim = now; // Update the last claim time
    m.reply('Nih gaji lu +Rp2000000');
  } else {
    let daysRemaining = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
    let hoursRemaining = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    let minutesRemaining = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));
    let secondsRemaining = Math.floor((remainingTime % (60 * 1000)) / 1000);

    m.reply(`Lu udah ambil jatah hari ini.\n\nTunggu ${daysRemaining} hari, ${hoursRemaining} jam, ${minutesRemaining} menit, ${secondsRemaining} detik lagi!`);
  }
}

handler.help = ['gaji', 'gajian'];
handler.tags = ['rpg'];
handler.command = /^(gaji|gajian)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;

module.exports = handler;