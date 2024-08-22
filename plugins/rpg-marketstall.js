let handler = async (m, { conn, command, args }) => {
    let type = (args[0] || '').toLowerCase();
    let quantity = parseInt(args[1]) || 1; // Ambil jumlah dari args[1], defaultnya 1
    let user = global.db.data.users[m.sender];

    // Ensure user object properties are defined
    user.nugget = user.nugget || 0;
    user.aqua = user.aqua || 0;
    user.rendang = user.rendang || 0;
    user.salads = user.salads || 0;
    user.steak = user.steak || 0;
    user.candy = user.candy || 0;
    user.ramen = user.ramen || 0;
    user.pizza = user.pizza || 0;
    user.vodka = user.vodka || 0;
    user.sushi = user.sushi || 0;
    user.bandage = user.bandage || 0;
    user.ganja = user.ganja || 0;
    user.roti = user.roti || 0;
    user.spagetti = user.spagetti || 0;
    user.croissant = user.croissant || 0;
    user.onigiri = user.onigiri || 0;
    user.hamburger = user.hamburger || 0;
    user.hotdog = user.hotdog || 0;
    user.cake = user.cake || 0;
    user.sandwich = user.sandwich || 0;
    user.escream = user.escream || 0;
    user.pudding = user.pudding || 0;
    user.juice = user.juice || 0;
    user.teh = user.teh || 0;
    user.popcorn = user.popcorn || 0;
    user.kopi = user.kopi || 0;
    user.boba = user.boba || 0;
    user.susu = user.susu || 0;
    user.soju = user.soju || 0;
    user.kopimatcha = user.kopimatcha || 0;
    user.kentang = user.kentang || 0;
    // Sisipkan properti lainnya di sini...

    // Pet prices
    const foodPrices = {
        nugget: 10000,
        aqua: 2000,
        rendang: 30000,
        salads: 50000,
        steak: 500000,
        candy: 10000,
        ramen: 25000,
        pizza: 50000,
        vodka: 30000,
        sushi: 35000,
        bandage: 60000,
        roti: 15000,
        spagetti: 10000,
        croissant: 50000,
        onigiri: 20000,
        hamburger: 30000,
        ganja: 500000,
        soda: 10000,
        hotdog: 25000,
        cake: 150000,
        sandwich: 350000,
        escream: 20000,
        pudding: 40000,
        juice: 25000,
        teh: 10000,
        popcorn: 15000,
        kopi: 5000,
        soju: 50000,
        kopimatcha: 30000,
        susu: 15000,
        boba: 20000,
        kentang: 20000,
        // Sisipkan harga barang lainnya di sini...
    };

    // Pet names mapping
    const food = {
        nugget: 'Nugget',
        rendang: 'Rendang',
        salads: 'Salads',
        steak: 'Steak',
        candy: 'Candy',
        ramen: 'Ramen',
        pizza: 'Pizza',
        vodka: 'Vodka',
        sushi: 'Sushi',
        bandage: 'Bandage',
        roti: 'Roti',
        aqua: 'Aqua',
        spagetti: 'Spagetti',
        croissant: 'Croissant',
        ganja: 'Ganja',
        onigiri: 'Onigiri',
        hamburger: 'Hamburger',
        hotdog: 'Hotdog',
        cake: 'Cake',
        sandwich: 'Sandwich',
        escream: 'Escream',
        pudding: 'Pudding',
        juice: 'Juice',
        teh: 'Teh',
        popcorn: 'Popcorn',
        kopi: 'Kopi',
        soju: 'Soju',
        susu: 'Susu',
        kopimatcha: 'Kopimatcha',
        boba: 'Boba',
        kentang: 'Kentang',
        // Sisipkan nama barang lainnya di sini...
    };

    const caption = `乂 *M A R K E T - 7 E L E V E N*\n
乂 *D R I N K*
*[ 🍷 ]* Vodka • Price : _${foodPrices.vodka}_
*[ 🥤 ]* Aqua • Price : _${foodPrices.aqua}_
*[ ☕ ]* Kopi • Price : _${foodPrices.kopi}_
*[ 🍺 ]* Soda • Price : _${foodPrices.soda}_
*[ 🥃 ]* Teh • Price : _${foodPrices.teh}_
*[ 🧃 ]* Juice • Price : _${foodPrices.juice}_
*[ 🍾 ]* Soju • Price : _${foodPrices.soju}_
*[ 🍵 ]* Kopi Matcha • Price : _${foodPrices.kopimatcha}_
*[ 🧋 ]* Boba • Price : _${foodPrices.boba}_
*[ 🥛 ]* Susu • Price : _${foodPrices.susu}_

乂 *F O O D*
*[ 🍞 ]* Roti • Price : _${foodPrices.roti}_
*[ 🍜 ]* Ramen • Price : _${foodPrices.ramen}_
*[ 🍣 ]* Sushi • Price : _${foodPrices.sushi}_
*[ 🥩 ]* Steak • Price : _${foodPrices.steak}_
*[ 🥘 ]* Rendang • Price : _${foodPrices.rendang}_
*[ 🍱 ]* Nugget • Price : _${foodPrices.nugget}_
*[ 🥗 ]* Salads • Price : _${foodPrices.salads}_
*[ 🍬 ]* Candy • Price : _${foodPrices.candy}_
*[ 🍕 ]* Pizza • Price : _${foodPrices.pizza}_
*[ 💉 ]* Bandage • Price : _${foodPrices.bandage}_
*[ 🍀 ]* Ganja • Price : _${foodPrices.ganja}_
*[ 🍝 ]* Spagetti • Price : _${foodPrices.spagetti}_
*[ 🍰 ]* Cake • Price : _${foodPrices.cake}_
*[ 🥐 ]* Croissant • Price : _${foodPrices.croissant}_
*[ 🍙 ]* Onigiri • Price : _${foodPrices.onigiri}_
*[ 🍔 ]* Hamburger • Price : _${foodPrices.hamburger}_
*[ 🌭 ]* Hotdog • Price : _${foodPrices.hotdog}_
*[ 🍨 ]* Escream • Price : _${foodPrices.escream}_
*[ 🍮 ]* Pudding • Price : _${foodPrices.pudding}_
*[ 🍿 ]* Popcorn • Price : _${foodPrices.popcorn}_
*[ 🍟 ]* Kentang • Price : _${foodPrices.kentang}_

• _Example_ :
.buyfood *[ food ]*
.buydrink *[ drink ]*
`.trim();

    try {
        if (/foodshop|buyfood|buydrink/i.test(command)) {
            if (!foodPrices[type]) {
                await conn.reply(m.chat, caption, m, {
                    contextInfo: {
                        externalAdReply: {
                            mediaType: 1,
                            title: 'AXELLDX',
                            thumbnailUrl: 'https://telegra.ph/file/5cbeb37c4278b29f4fded.jpg',
                            renderLargerThumbnail: true,
                            sourceUrl: ''
                        }
                    }
                });
                return;
            }

            const foodPrice = foodPrices[type] * quantity; // Harga total sesuai dengan jumlah yang dibeli
            if (user.money < foodPrice) return m.reply(`Uang anda kurang untuk membeli ${quantity} ${food[type]}`);

            user.money -= foodPrice;
            user[type] = (user[type] || 0) + quantity; // Tambahkan jumlah barang yang dibeli ke inventaris pengguna
            m.reply(`Anda baru saja membeli ${quantity} ${food[type]}`);
        } else {
            await conn.reply(m.chat, caption, m, {
                contextInfo: {
                    externalAdReply: {
                        mediaType: 1,
                        title: 'AXELLDX',
                        thumbnailUrl: 'https://telegra.ph/file/5cbeb37c4278b29f4fded.jpg',
                        renderLargerThumbnail: true,
                        sourceUrl: ''
                    }
                }
            });
        }
    } catch (err) {
        m.reply("Error\n\n\n" + err.stack);
    }
};

handler.help = ['marketstall', 'foodshop', '7eleven', 'buyfood *<food>*', 'buydrink *<drink>*'];
handler.tags = ['rpg'];
handler.command = /^(marketstall|foodshop|7eleven|buyfood|buydrink)/i;

module.exports = handler;