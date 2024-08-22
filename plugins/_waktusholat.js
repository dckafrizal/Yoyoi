const axios = require('axios');
const Jimp = require('jimp');
const fs = require('fs');

async function before(m, { conn, participants }) {
    conn.autosholat = conn.autosholat ? conn.autosholat : {};

    let lokasi = 'DKI JAKARTA DAN SEKITARNYA';

    let id = m.chat;
    if (!conn.autosholat[id]) {
        let jdwl = await jadwalsholat(lokasi);
        conn.autosholat[id] = {
            send: false,
            jdwl
        }
    } else if (!fs.existsSync('./src/jdw.png')) {
        let jdw = await jadwalsholat(lokasi);

        await image(jdw.shubuh, jdw.dhuhur, jdw.ashar, jdw.maghrib, jdw.isya, lokasi);

    } else {
        let result = conn.autosholat[id].jdwl;
        let participantIds = participants.map(a => a.id)
        const date = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const timeNow = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        for (const [sholat, waktu] of Object.entries(result)) {
            if (timeNow === waktu) {
                await conn.sendMessage(m.chat, {
                    audio: {
                        url: 'https://media.vocaroo.com/mp3/1ofLT2YUJAjQ'
                    },
                    mimetype: 'audio/mp4',
                    ptt: true,
                    contextInfo: {
                    mentionedJid: participantIds,
                        externalAdReply: {
                            showAdAttribution: true,
                            mediaType: 1,
                            mediaUrl: '',
                            title: `Selamat menunaikan Ibadah Sholat ${sholat}`,
                            body: `🕑 ${waktu}`,
                            sourceUrl: '',
                            thumbnail: await fs.promises.readFile('./src/jdw.png'),
                            renderLargerThumbnail: true
                        }
                    }
                }, {
                    quoted: m,
                    mentions: participants.map(a => a.id)
                });

                setTimeout(() => {
                    delete conn.autosholat[id];
                }, 1000);
                await fs.promises.unlink('./src/jdw.png');
            }
        }
    }
}

exports.before = before;
exports.disabled = false;

async function jadwalsholat(kota) {
    try {
        const { data } = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${kota}&country=Indonesia&method=8`);

        const result = {
            shubuh: data.data.timings.Fajr,
            dhuhur: data.data.timings.Dhuhr,
            ashar: data.data.timings.Asr,
            maghrib: data.data.timings.Maghrib,
            isya: data.data.timings.Isha
        };
        return result;
    } catch (e) {
        return 'eror 404';
    }
}

async function image(sh, dh, as, ma, is, lok) {
    const image = await Jimp.read('https://telegra.ph/file/8e791e4a13e80881584dc.jpg');
    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const wil = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);

    image.print(font, 550, 223, sh);
    image.print(font, 550, 321, dh);
    image.print(font, 550, 392, as);
    image.print(font, 550, 481, ma);
    image.print(font, 550, 571, is);
    image.print(wil, 870, 391, lok);

    await image.writeAsync('./src/jdw.png');
}