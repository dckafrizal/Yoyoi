const fetch = require('node-fetch');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

const handler = async (m, { command, usedPrefix, conn, args }) => {
    // Define wait message
    const waitMessage = 'Please wait...';
    
    await m.reply(waitMessage);
    let res = await YesNo();
    let stiker = await createSticker(false, res.image, `${global.sh} Mengatakan `, (res.answer).toUpperCase(), 30);
        
    try {
        await m.reply(stiker);
    } catch (e) {
        console.error(e);
        await m.reply('An error occurred while sending the sticker.');
    }
};

handler.help = ["yesno"];
handler.tags = ["fun"];
handler.command = /^(yesno)$/i;

module.exports = handler;

async function YesNo() {
    try {
        const response = await fetch('https://yesno.wtf/api');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching from YesNo API:', error);
        return null;
    }
}

async function createSticker(img, url, packName, authorName, quality) {
    try {
        let stickerMetadata = {
            type: StickerTypes.FULL,
            pack: packName,
            author: authorName,
            quality
        };
        return (new Sticker(img ? img : url, stickerMetadata)).toBuffer();
    } catch (error) {
        console.error('Error creating sticker:', error);
        throw error;
    }
}