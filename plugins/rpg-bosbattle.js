const { MessageType } = require('@whiskeysockets/baileys');

// Fungsi untuk mengubah waktu menjadi format jam:menit:detik
function clockString(ms) {
  let h = Math.floor(ms / 3600000);
  let m = Math.floor(ms / 60000) % 60;
  let s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
}

// Fungsi untuk memilih secara acak dari daftar
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Daftar nama-nama bos dari anime isekai beserta kekuatannya
const animeIsekaiBosses = [
  { name: 'Demon Lord Vermudol', power: 500 },
  { name: 'Giant Spider Queen', power: 600 },
  { name: 'White Whale', power: 650 },
  { name: 'Shadow of the Colossus', power: 700 },
  { name: 'Dragon King Veldora', power: 800 },
  { name: 'Witch of Envy Satella', power: 900 },
  { name: 'Demon King Darios', power: 1000 },
  { name: 'Majin Boo', power: 1100 },
  { name: 'Beast of Calamity Rimuru', power: 1200 },
  { name: 'Darkness Knight Gulzak', power: 1300 },
  { name: 'Beast King Gazel', power: 1400 },
  { name: 'Dragon of Destruction Carrion', power: 1500 },
  { name: 'Overlord Ainz Ooal Gown', power: 1600 },
  { name: 'Royal Knight Alice', power: 1700 },
  { name: 'Beelzebub Lord of the Flies', power: 1800 },
  { name: 'Beast of Wrath Gaia', power: 1900 },
  { name: 'Winged Serpent Quetzalcoatl', power: 2000 },
  { name: 'Ice Wolf Lest', power: 2100 },
  { name: 'Demon King Leon Cromwell', power: 2200 },
  { name: 'Storm Dragon Velgrynd', power: 2300 }
];

// Inisialisasi data pertarungan bos
let currentBossIndex = 0; // Indeks bos saat ini yang akan dilawan oleh pengguna

let handler = async (m, { conn, text }) => {
  try {
    let user = global.db.data.users[m.sender];
    let title = "The King Of Bos Battle";

    // Cek apakah pengguna sudah memiliki title "The King Of Bos Battle"
    if (user.raretitle && user.raretitle.includes(title)) {
      conn.reply(m.chat, `Anda sudah melawan seluruh bos dan Anda sudah menjadi ${title}`, m);
      return;
    }

    // Cek apakah pengguna memiliki cukup kesehatan untuk bertarung
    if (user.health <= 0) {
      conn.reply(m.chat, '😵 Nyawa Anda habis. Anda perlu memulihkan nyawa Anda terlebih dahulu.', m);
      return;
    }

    // Cek apakah pengguna sudah bertarung dalam 1 jam terakhir
    if (new Date() - user.lastbossbattle < 3600000) {
      conn.reply(m.chat, '⏰ Anda hanya dapat bertarung dengan bos sekali dalam 1 jam.', m);
      return;
    }

    // Ambil bos berikutnya dari antrian
    let currentBoss = animeIsekaiBosses[currentBossIndex];

    // Inisialisasi nyawa bos jika belum ada
    if (currentBoss.health === undefined) {
      currentBoss.health = currentBoss.power;
    }

    // Berikan pesan peringatan jika kesehatan pengguna lebih rendah dari kesehatan bos
    if (user.health < currentBoss.power) {
      let healthNeeded = currentBoss.power - user.health;
      conn.reply(m.chat, `⚠️ Health kamu ${user.health}, health bos ${currentBoss.power}. Health kamu masih kurang ${healthNeeded} lagi untuk melawan bos.`, m);
      return;
    }

    // Lakukan persiapan pertarungan
    user.lastbossbattle = new Date();

    // Menghitung serangan pengguna
    let sword = user.sword || 0;
    let userAttack = Math.floor(Math.random() * (1000 - sword)) + 1; // Serangan acak antara 1 hingga (1000 - sword)

    // Menghitung serangan bos
    let bossAttack = currentBoss.power;

    // Kurangi durability sword dan armor sesuai dengan kekuatan bos
    let durabilityLoss = Math.floor(currentBoss.power / 200); // Misalnya, setiap 200 power bos akan mengurangi durability sword dan armor sebesar 1
    user.sworddurability -= durabilityLoss;
    user.armordurability -= durabilityLoss;

    // Menghitung kerugian kesehatan pengguna berdasarkan kekuatan bos
    let healthLoss = Math.floor((bossAttack / 100) * (1000 + currentBoss.power - sword)); // Rumus kerugian kesehatan pengguna

    // Kurangi nyawa pengguna sesuai dengan serangan bos
    user.health -= healthLoss;

    // Kurangi nyawa bos sesuai dengan serangan pengguna
    currentBoss.health -= userAttack;

    // Pesan hasil pertarungan
    let message = `⚔️ Hasil pertarungan dengan bos ${currentBoss.name} 🐲:\n\n`;
    message += `❤️ Nyawa pengguna: ${user.health} / 10000\n`;
    message += `❤️ Nyawa bos: ${currentBoss.health}/${currentBoss.power}\n`;

    // Hitung reward dan tambahkan ke pengguna jika bos telah dikalahkan
    if (currentBoss.health <= 0) {
      let expReward = Math.floor(Math.random() * 100) + 50; // Reward exp acak antara 50 hingga 149
      let moneyReward = Math.floor(Math.random() * 1000) + 500; // Reward money acak antara 500 hingga 1499

      user.exp += expReward;
      user.money += moneyReward;

      message += `\n🎉 Anda menang dalam pertarungan! Bos ${currentBoss.name} telah dikalahkan.\n`;
      message += `💰 Anda mendapatkan +${moneyReward} Money\n`;
      message += `🌟 Anda mendapatkan +${expReward} Exp\n`;

      // Reset nyawa bos untuk pertarungan selanjutnya
      currentBoss.health = currentBoss.power;

      // Pindah ke bos berikutnya jika masih ada
      currentBossIndex++;
      if (currentBossIndex >= animeIsekaiBosses.length) {
        message += '\n🏆 Anda telah mengalahkan semua bos!';

        // Berikan title "The King Of Bos Battle"
        if (!user.raretitle.includes(title)) {
          user.raretitle.push(title);
          message += `\n\n🎖️ Selamat! Anda mendapatkan title: "${title}".\nKamu telah membunuh seluruh bos yang ada.`;
        }

        currentBossIndex = 0; // Reset indeks bos ke 0 untuk memulai kembali dari yang terlemah
      } else {
        let nextBoss = animeIsekaiBosses[currentBossIndex];
        message += `\n🆚 Persiapan pertarungan dengan bos berikutnya: ${nextBoss.name}`;
      }
    } else {
      message += `\n⚔️ Serangan pengguna: ${userAttack}\n`;
      message += `⚔️ Serangan bos: ${bossAttack}\n\n`;
      message += `🛡️ Pertarungan berlanjut...`;
    }

    // Batasi penggunaan perintah ini sekali dalam 1 jam
    let cooldown = 3600000; // 1 jam dalam milidetik
    user.bosbattle = new Date() * 1 + cooldown;

    conn.reply(m.chat, message, m);
  } catch (e) {
    console.log(e);
    conn.reply(m.chat, 'Error', m);
  }
}

handler.help = ['bosbattle'];
handler.tags = ['rpg'];
handler.command = /^bosbattle$/i;
handler.group = true;

module.exports = handler;