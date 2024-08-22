const reward = {
    money: 1000000,
    limit: 100,
    bank: 500000,
    potion: 50,
    diamond: { min: 1, max: 5 },
    iron: { min: 1, max: 10 },
    food: ["ramen", "pizza", "hotdog", "sandwich", "croissant"]
};

let handler = async (m, { conn, isPrems, command }) => {
    let user = global.db.data.users[m.sender];
    
    if (command === 'claim') {
        if (user.claimed) {
            return conn.reply(m.chat, `Anda sudah mengklaim bonus, Anda hanya bisa mengklaim sekali`, m);
        }

        // Assign rewards
        user.money += reward.money;
        user.limit += reward.limit;
        user.bank += reward.bank;
        user.potion += reward.potion;
        user.diamond += getRandomInt(reward.diamond.min, reward.diamond.max);
        user.iron += getRandomInt(reward.iron.min, reward.iron.max);
        user.food = user.food || {};
        let foodItem = reward.food[Math.floor(Math.random() * reward.food.length)];
        user.food[foodItem] = (user.food[foodItem] || 0) + getRandomInt(1, 5);

        user.claimed = true;

        conn.reply(m.chat, `Selamat kamu mendapatkan bonus:\n\n💰 +${reward.money} Money\n📈 +${reward.limit} Limit\n🏦 +${reward.bank} Bank\n🧪 +${reward.potion} Potion\n💎 +${getRandomInt(reward.diamond.min, reward.diamond.max)} Diamond\n⛏️ +${getRandomInt(reward.iron.min, reward.iron.max)} Iron\n🍜 +${getRandomInt(1, 5)} ${foodItem}`, m, {
            contextInfo: {
                externalAdReply: {
                    mediaType: 1,
                    title: 'AXELLDX',
                    thumbnailUrl: 'https://telegra.ph/file/dca64c5e547002aaadae1.jpg',
                    renderLargerThumbnail: true,
                    sourceUrl: ''
                }
            }
        });
    }
};

handler.help = ['claim'];
handler.tags = ['rpg'];
handler.command = /^(claim)$/i;
handler.owner = false;
handler.mods = false;
handler.premium = false;
handler.group = false;
handler.private = false;
handler.admin = false;
handler.botAdmin = false;
handler.fail = null;
handler.money = 0;
handler.exp = 0;
handler.limit = true;

module.exports = handler;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}