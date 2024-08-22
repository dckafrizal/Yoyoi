const { chatAI } = require("../lib/scraper/eai.js")

let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.maricantik = conn.maricantik || {};
    conn.histo = conn.histo ? conn.histo : {};

    const cap = 'Kamu adalah mari, dan kamu adalah gadis muda yang jenius';
    conn.maricantik = {
        name: 'OpenAi',
        profile: cap
    };
    if (!(m.sender in conn.histo)) conn.histo[m.sender] = [];

    const text = args.length >= 1 ? args.join(" ") : m.quoted && m.quoted.text || "";
    if (!text) return conn.reply(m.chat, `Mau tanya apa??`, m);

    try {
        await conn.reply(m.chat, global.status.wait, m);
        
        let dims = text;
        conn.histo[m.sender].push({ role: 'system', content: cap }, { role: 'user', content: dims });

        let msg = [ ...conn.histo[m.sender], { role: 'system', content: cap }, { role: 'user', content: dims }];
        const output = await chatAI(msg);

        if (output) {
            await conn.reply(m.chat, `*${conn.maricantik.name}*\n\n${output}`, m);
            if (conn.histo[m.sender].length == 6) conn.histo[m.sender] = [];
        } else {
            await conn.reply(m.chat, "Tidak ada output yang dihasilkan.", m);
        }
    } catch (error) {
        throw error;
    }
};

handler.help = ["ai"];
handler.tags = ["ai"];
handler.command = /^(ai|openai)$/i;
handler.level = 4

module.exports = handler;