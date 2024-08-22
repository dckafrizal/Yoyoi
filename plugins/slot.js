let handler = async (m, { args, usedPrefix, command }) => {
    let thumb = 'https://telegra.ph/file/0b5006d3bbe4a904036c7.jpg';
    let fa = `
penggunaan:
${usedPrefix + command} angka e-wallet
contoh:
${usedPrefix + command} 100 dana

artinya kamu bertaruh 100 saldo dari dana.

*JACKPOT:* taruhan digandakan
*kalah:* taruhan diambil`.trim();
    if (!args[0] || !args[1]) throw fa;
    if (isNaN(args[0])) throw fa;
    let taruhan = parseInt(args[0]);
    let ewalletType = args[1].toLowerCase();

    if (!['dana', 'gopay', 'ovo'].includes(ewalletType)) {
        throw '🚩 Silakan tentukan e-wallet yang valid (dana/gopay/ovo)';
    }

    let users = global.db.data.users[m.sender];
    if (!users[ewalletType]) users[ewalletType] = 0;

    let time = users.lastslot + 10000;
    if (new Date() - users.lastslot < 10000) throw `tunggu selama ${msToTime(time - new Date())}`;
    if (taruhan < 1) throw 'Minimal 1 saldo!';
    if (users[ewalletType] < taruhan) {
        throw `Saldo ${ewalletType.toUpperCase()} kamu tidak cukup!`;
    }

    let bet = ["🏆", "🥇", "💵"];
    let a = Math.floor(Math.random() * bet.length);
    let b = Math.floor(Math.random() * bet.length);
    let c = Math.floor(Math.random() * bet.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = bet[a];
        a++;
        if (a == bet.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = bet[b];
        b++;
        if (b == bet.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = bet[c];
        c++;
        if (c == bet.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = `JACKPOT! 🎳 *+${taruhan + taruhan} saldo ${ewalletType.toUpperCase()}*`;
        users[ewalletType] += taruhan;
    } else if (a == b || a == c || b == c) {
        end = '*TRY AGAIN!*';
    } else {
        end = `LOSE 😥 *-${taruhan} saldo ${ewalletType.toUpperCase()}*`;
        users[ewalletType] -= taruhan;
    }
    users.lastslot = new Date() * 1;

    let txt = `                      *[ 🎰 | SLOTS ]*

                       ${end}

                        ${x[0]} ${y[0]} ${z[0]}
                        ${x[1]} ${y[1]} ${z[1]}
                        ${x[2]} ${y[2]} ${z[2]}`;
    return await conn.sendMessage(m.chat, {
        text: txt,
        contextInfo: {
            externalAdReply: {
                title: 'S L O T',
                thumbnailUrl: 'https://telegra.ph/file/ecdb2d2f27d916e89c4d7.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
}

handler.help = ['slot <angka> <ewallet>'];
handler.tags = ['game'];
handler.command = /^(slot?)$/i;

handler.game = true;

module.exports = handler;

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + " menit " + seconds + " detik";
}