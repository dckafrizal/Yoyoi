let handler = async (m, { conn }) => {
    const cooldownTime = 86400000; // 24 hours in milliseconds
    const lastNguli = global.db.data.users[m.sender].lastnguli;
    const now = new Date();
    const timeSinceLastNguli = now - lastNguli;

    if (timeSinceLastNguli > cooldownTime) {
        global.db.data.users[m.sender].limit += 10;
        global.db.data.users[m.sender].lastnguli = now.getTime();
        m.reply('🎉 Selamat kamu mendapatkan +10 limit!');
    } else {
        const remainingTime = cooldownTime - timeSinceLastNguli;
        const hours = Math.floor(remainingTime / 3600000);
        const minutes = Math.floor((remainingTime % 3600000) / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        m.reply(`⏳ Anda sudah mengklaim upah nguli hari ini. Silakan coba lagi dalam ${hours} jam, ${minutes} menit, dan ${seconds} detik.`);
    }
};

handler.help = ['nguli'];
handler.tags = ['rpg'];
handler.command = /^(nguli)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;

module.exports = handler;