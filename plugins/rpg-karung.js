const handler = async (m, { conn, usedPrefix }) => {
    const botol = global.db.data.users[m.sender].botol;
    const kardus = global.db.data.users[m.sender].kardus;
    const kaleng = global.db.data.users[m.sender].kaleng;
    const gelas = global.db.data.users[m.sender].gelas;
    const plastik = global.db.data.users[m.sender].plastik;

    const ndy = `🎒 *Isi Karung Mu*
    
🧴 _*Botol*_ = ${botol}
📦 _*Kardus*_ = ${kardus}
🥫 _*Kaleng*_ = ${kaleng}
 `;
    await m.reply(ndy);
};

handler.help = ['Karung'];
handler.tags = ['rpg'];
handler.command = /^(karung)$/i;
handler.register = true;
handler.group = true;
handler.rpg = true;
module.exports = handler;