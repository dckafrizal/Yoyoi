let handler = async (m, { conn, usedPrefix, args }) => {
    let user = global.db.data.users[m.sender];

    if (!user) {
        // Inisialisasi data pengguna jika tidak ada dalam database
        user = global.db.data.users[m.sender] = { title: [], rank: [], raretitle: [] };
    }

    // Pastikan user.title, user.rank, dan user.raretitle adalah array
    user.title = user.title || [];
    user.rank = user.rank || [];
    user.raretitle = user.raretitle || [];

    let userTitles = user.title;
    let userRanks = user.rank;
    let userRareTitles = user.raretitle;

    if (Array.isArray(userTitles) && userTitles.length > 0) {
        let titles = userTitles.map((title, index) => {
            let rank = userRanks[index] ? `(${userRanks[index]})` : ""; // Dapatkan peringkat yang sesuai jika ada
            return `- ${rank} ${title}`;
        }).join('\n');

        let totalTitles = userTitles.length; // Hitung total judul

        let rareTitles = userRareTitles.map((rareTitle) => {
            return `- 🌟 ${rareTitle}`; // Awali judul langka dengan emoji bintang atau indikator apa pun yang Anda pilih
        }).join('\n');

        let totalRareTitles = userRareTitles.length; // Hitung total judul langka

        return conn.reply(m.chat, `乂 *M I S S I O N - T I T L E*\n\nIni adalah beberapa *Title* yang sudah kamu dapatkan saat menyelesaikan misi:\n${titles}\n\n*Total Title* : ${totalTitles} / 110\n\n乂 *R A R E - T I T L E*\n\nIni adalah beberapa *Rare Title* yang sudah kamu dapatkan melalui event :\n${rareTitles}\n\n*Total Rare Title* : ${totalRareTitles}`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'AXELLDX',
                    thumbnailUrl: 'https://telegra.ph/file/6c4ea0671314198102008.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });
    } else {
        return conn.reply(m.chat, 'Kamu belum memiliki judul apapun!', m);
    }
};

// Fungsi untuk menambahkan judul baru ke dalam database pengguna
const addTitleToUser = (userId, title, rank = null, isRare = false) => {
    let user = global.db.data.users[userId];

    if (!user) {
        user = global.db.data.users[userId] = { title: [], rank: [], raretitle: [] };
    }

    if (isRare) {
        if (!user.raretitle.includes(title)) {
            user.raretitle.push(title);
        }
    } else {
        if (!user.title.includes(title)) {
            user.title.push(title);
            user.rank.push(rank);
        }
    }
};

handler.help = ['mytitle', 'mytitles'];
handler.tags = ['rpg'];
handler.command = /^mytitle(s)?$/i;

module.exports = handler;