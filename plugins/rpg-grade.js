let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender];
    
    // Check if the user is a demon
    if (user.demon) {
        await conn.reply(m.chat, "Kamu adalah iblis dan kamu tidak ada hak untuk memiliki pangkat kehormatan dalam korps pembasmi iblis.", m);
        return;
    }

    // Check if the user is in the korps group
    if (!user.korps) {
        await conn.reply(m.chat, "Kamu belum bergabung dengan korps. Gunakan perintah *setslayer* untuk bergabung.", m);
        return;
    }

    let demonKills = user.demonkill;
    let rank, message;

    // Check if the user's demon kills are below 10
    if (demonKills < 10) {
        await conn.reply(m.chat, "Kamu belum memiliki pangkat apapun dalam korps pembasmi iblis. Tingkatkan jumlah pembunuhanmu untuk mendapatkan pangkat.", m);
        return;
    }

    if (demonKills < 20) {
        rank = 'Mizunoto';
        message = `Kamu membutuhkan ${20 - demonKills} kill lagi untuk mencapai Mizunoe.`;
    } else if (demonKills < 30) {
        rank = 'Mizunoe';
        message = `Kamu membutuhkan ${30 - demonKills} kill lagi untuk mencapai Kanoe.`;
    } else if (demonKills < 40) {
        rank = 'Kanoe';
        message = `Kamu membutuhkan ${40 - demonKills} kill lagi untuk mencapai Kanoto.`;
    } else if (demonKills < 50) {
        rank = 'Kanoto';
        message = `Kamu membutuhkan ${50 - demonKills} kill lagi untuk mencapai Tsuchinoto.`;
    } else if (demonKills < 60) {
        rank = 'Tsuchinoto';
        message = `Kamu membutuhkan ${60 - demonKills} kill lagi untuk mencapai Tsuchinoe.`;
    } else if (demonKills < 70) {
        rank = 'Tsuchinoe';
        message = `Kamu membutuhkan ${70 - demonKills} kill lagi untuk mencapai Hinoto.`;
    } else if (demonKills < 80) {
        rank = 'Hinoto';
        message = `Kamu membutuhkan ${80 - demonKills} kill lagi untuk mencapai Hinoe.`;
    } else if (demonKills < 90) {
        rank = 'Hinoe';
        message = `Kamu membutuhkan ${90 - demonKills} kill lagi untuk mencapai Kinoto.`;
    } else if (demonKills < 100) {
        rank = 'Kinoto';
        message = `Kamu membutuhkan ${100 - demonKills} kill lagi untuk mencapai Kinoe.`;
    } else {
        rank = 'Hashira';
        message = `Selamat! Kamu telah mencapai peringkat tertinggi: Hashira.`;
    }

    user.rank = rank; // Assuming there's a rank property to update
    await conn.reply(m.chat, `*Kamu adalah:* ${rank}\n\n${message}`, m, {
        contextInfo: {
            externalAdReply: {
                mediaType: 1,
                title: 'AXELLDX',
                thumbnailUrl: 'https://telegra.ph/file/bc1269c7d27a50e99d5b3.jpg',
                renderLargerThumbnail: true,
                sourceUrl: ''
            }
        }
    });
};

handler.help = ['korpsgrade', 'gradekorps'];
handler.tags = ['info'];
handler.command = /^(korpsgrade|gradekorps)$/i;
handler.register = true;

module.exports = handler;