/**
	* WM BY Naaazzzzz
	* TITENONO WE NEK DI HAPUS
	* wa.me/6282139672290
**/

const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require("@whiskeysockets/baileys");
const fs = require('fs');
const jimp = require('jimp');

const ammo = {
	1: {
    1: [true, false, false],
    2: [true, true, false, false, false],
    3: [true, true, true, false, false, false, false, false]
    }, 
    2: {
    1: [true, false], 
    2: [true, true, false, false], 
    3: [true, true, false, false, false], 
    4: [true, true, true, false, false, false, false, false]
    }, 
    3: {
    1: [true, false, false], 
    2: [true, true, false], 
    3: [true, true, false, false], 
    4: [true, true, true, false, false], 
    5: [true, true, true, false, false, false, false, false]
    }
};

let hpkonto = { 1: 2, 2: 4, 3: 6 }

const item = {
	1: {
		name: "Magnifying Glass", 
		desc: "to see whether the bullet is filled or empty"
		}, 
	2: {
		name: "Cutter", 
		desc: "gun deals 2 damage"
		}, 
	3: {
		name: "Handcuffs", 
		desc: "dealer skip next turn"
		}, 
	4: {
		name: "Cigarette", 
		desc: "heals 1 hp"
		}, 
	5: {
		 name: "Beer", 
		desc: "removes 1 bullets"
		}
};

const handler = async (m, { conn, text, usedPrefix, command, args }) => {
    if (m.isGroup) throw `Permainan ini hanya bisa dimainkan di private chat!`;

    try {
        const cmd = args[0];
        conn.br = conn.br || {};
        conn.br[m.chat] = conn.br[m.chat] || {};
        let br = conn.br[m.chat];

        const zippo = {
            start: async () => {
                const difficulties = ["easy", "normal", "hard"];
                if (!args[1] || !difficulties.includes(args[1])) {
                    return new Button()
                        .setBody("Select The Difficulty!")
                        .addSelection("Click Here!")
                        .makeSections("Difficulty")
                        .makeRow("", "Easy", "Select Easy", ".br start easy")
                        .makeRow("", "Normal", "Select Normal", ".br start normal")
                        .makeRow("", "Hard", "Select Hard", ".br start hard")
                        .run(m.chat, conn, m);
                }
                if(conn.br.hasOwnProperty(m.chat)) delete conn.br[m.chat]
                br = {
                    on: true, mode: args[1], turn: true,
                    ammo: ammo[1][1].sort(() => Math.random() - 0.5),
                    dmg: 1,
                    ronde: 1, subronde: 1,
                    hp: hpkonto[1], hpm: hpkonto[1],
                    hc: false, hcm: false, 
                    slot: [], slotm: [], 
                    delay: { easy: 5000, normal: 3000, hard: 1500 }[args[1]]
                };
                await conn.sendMessage(m.chat, { text: '`Ronde pertama di mulai!`' }, { quoted: m }) 
                await showTheAmmo(m, conn, 3, br);
                await sleep(br.delay);
                return showShootOptions(m, conn, br);
            },
            tembak: async () => {
    if (!br.on || !br.turn) return `Tunggu dealer!`;

    async function dor(sinten, siapa) {
        let chance = { easy: Math.random() < 0.5, normal: Math.random() < 0.5 ? br.ammo[0] : !br.ammo[0] ? Math.random() < 0.3 : Math.random < 0.5, hard: Math.random() < 0.9 ? br.ammo[0] : !br.ammo[0] ? Math.random() < 0.3 : Math.random < 0.5 }[br.mode] ? 'you':'me';
        
        if (!sinten) {
        	if(br.hcm) {
    	await conn.sendMessage(m.chat, { text: `Dealer melewati gilirannya` }, { quoted: m });
    br.hcm = false;
    br.turn = true;
    return await showShootOptions(m, conn, br);
    }
        	await conn.sendMessage(m.chat, { text: "Menunggu dealer..." }, { quoted: m });
            await sleep(3000);
        }
    
    if(!sinten) {
    	let using = []
    let zippoaseli = Math.floor(Math.random() * 5) + 1
    for(let i = 0; i < zippoaseli; i++) {
    if(br.mode === 'easy') {
    	if(br.slotm.includes('1') && !using.includes('1') && Math.random() < 0.4) using.push('1')
    if(br.slotm.includes('2') && !using.includes('2') && Math.random() < 0.3) using.push('2')
    if(br.slotm.includes('3') && !using.includes('3') && Math.random() < 0.4) using.push('3')
    if(br.slotm.includes('4') && (br.hpm > hpkonto[br.ronde] && Math.random() < 0.4) || (br.hpm <= 2 && Math.random() < 0.7)) using.push('4') 
    if(br.slotm.includes('5') && Math.random() < 0.5) using.push('5') 
    //end easy
    } else if(br.mode === 'normal') {
    	if(br.slotm.includes('1') && !using.includes('1') && (siapa === 'me') && (Math.random() * 15) > br.ammo.length) using.push('1') 
    if(br.slotm.includes('2') && !using.includes('2') && siapa === 'you' && ((siapa === 'you' && Math.random() < 0.8) || using.includes('1'))) using.push('2') 
    if(br.slotm.includes('3') && !using.includes('3') && ((siapa === 'you' && Math.random() < 0.7) || Math.random() < 0.5)) using.push('3')
    if(br.slotm.includes('4') && (((br.hpm + using.filter(v => v == 4).length) < br.hp && Math.random() < 0.7) || ((br.hpm + using.filter(v => v == 4).length) <= 2 && Math.random() < 0.7) || ((br.hpm + using.filter(v => v == 4).length) == 1))) using.push('4') 
    if(br.slotm.includes('5') && !using.includes('1') && (siapa === 'me' && Math.random() < 0.7) || Math.random < 0.5) using.push('5') 
    //end normal
    } else if(br.mode === 'hard') {
    if(br.slotm.includes('1') && !using.includes('1') && (siapa === 'me') && (Math.random() * 15) > br.ammo.length) using.push('1') 
    if(br.slotm.includes('2') && !using.includes('2') && siapa === 'you' && ((br.ammo[0] && using.includes('1')) || Math.random() < 0.8)) using.push('2') 
    if(br.slotm.includes('3') && !using.includes('3') && ((siapa === 'you' && Math.random() < 0.8) || Math.random() < 0.6)) using.push('3')
    if(br.slotm.includes('4') && (((br.hpm + using.filter(v => v == 4).length) < br.hp && Math.random() < 0.8) || ((br.hpm + using.filter(v => v == 4).length) <= 3 && Math.random() < 0.8) || ((br.hpm + using.filter(v => v == 4).length) == 1))) using.push('4') 
    if(br.slotm.includes('5') && !using.includes('1') && (siapa === 'me' && Math.random() < 0.8) || Math.random < 0.6) using.push('5') 
    //end hard
    } else {}
    //end for
    }
    
    for(let id of using) {
    	if(!br.slotm.includes(id)) continue
       await conn.sendMessage(m.chat, { text: `Sang dealer menggunakan \`${item[id].name}\`` }) 
       await sleep(1000) 
       if(id == 1) siapa = br.ammo[0] ? 'you':'me'
       if(id == 2) {
       br.dmg = 2;
       }
       if(id == 3) {
       	br.hc = true
       await conn.sendMessage(m.chat, { text: `Kamu akan melewati giliran berikutnya!` }) 
       }
      if(id == 4) {
      	let anu = (br.hpm == hpkonto[br.ronde]) ? false : br.hpm++
           await conn.sendMessage(m.chat, { text: `Sang dealer menyembuhkan +${anu ? "1" : "0"} darah, darah dealer sekarang adalah ${br.hpm}/${hpkonto[br.ronde]}` }) 
      }
      if(id == 5) {
      	let isinya = br.ammo.shift() 
      await conn.sendMessage(m.chat, { text: `Sang dealer mengeluarkan 1 peluru ${isinya ? "terisi":"kosong"}` }) 
       if(!br.ammo.length) await reload(m, conn, br) 
     }
     delete br.slotm[br.slotm.indexOf(id)]
       br.slotm = br.slotm.filter(v => v) 
       await sleep(2000) 
   }
    	//end sinten
    }
    
    if(!sinten && br.mode !== 'easy') {
        let zipporor = br.ammo.filter(v => v) 
        let zippororr = br.ammo.filter(v => !v) 
        if(!zipporor && zippororr) {
        	siapa = Math.random() < 0.9 ? 'me' : siapa;
        } 
        if(zipporor && !zippororr) {
        	siapa = Math.random() < 0.9 ? 'you' : siapa;
        }
    }
    
        const isi = br.ammo.shift();
        const txt = `${sinten ? "Kamu" : "Sang dealer"} menembak ${sinten ? (siapa === "me" ? "dirimu sendiri" : "sang dealer") : (siapa === "me" ? "dirinya sendiri" : "kamu")}, dan ${isi ? "pelurunya terisi" : "pelurunya kosong"}`;

        let zippokun = await conn.sendMessage(m.chat, { text: txt });

        if (isi) {
        	let panjenengan = sinten ? (siapa === 'me' ? 'hp' : 'hpm') : (siapa === 'me' ? 'hpm':'hp') 
            await hpAnimation(m, conn, br[panjenengan], txt, zippokun, br.dmg);
            let demej = (br.dmg > br[panjenengan]) ? br[panjenengan] : br.dmg
            br[panjenengan] -= demej
        }
        br.dmg = 1;
        
        if(br.ammo.length > 2 && br.mode !== 'easy') {
        	if(br.ammo[0]) chance = 'you'
        else chance = 'me'
        }
        
        if (!br.hpm) {
            br.ronde = br.ronde + 1;
            br.hpm = hpkonto[br.ronde];
            br.hp = hpkonto[br.ronde];
            br.subronde = 0;
            br.ammo = [];
            if(br.ronde <= Object.keys(ammo).length) await conn.sendMessage(m.chat, { text: `\`Ronde ke ${br.ronde} dimulai!\`` }, { quoted: m }) 
        }
        
        if(br.ronde > Object.keys(ammo).length) {
        delete conn.br[m.chat]
        return await conn.sendMessage(m.chat, { text: "Kamu menang!" }, { quoted: m }) 
        }
        
        if(!br.hp) {
        delete conn.br[m.chat]
        return await conn.sendMessage(m.chat, { text: "Kamu kalah" }, { quoted: m }) 
        }

        if (!br.ammo.length) {
            await reload(m, conn, br);
        }

        if (!isi && !sinten && siapa === 'me') {
        	conn.br[m.chat] = br;
            return await dor(false, chance);
        }
        
        if(!sinten && br.hc) {
    	await conn.sendMessage(m.chat, { text: `Kamu melewati giliranmu` }, { quoted: m });
    br.hc = false;
    br.turn = false;
    return await dor(false, chance);
    }

        if (!isi && sinten && siapa === 'me') {
            return await showShootOptions(m, conn, br);
        }

        await sleep(2000);

        if (!sinten) {
            br.turn = true;
            return await showShootOptions(m, conn, br);
        } else {
            br.turn = false;
            return await dor(false, chance);
        }
    }

    return await dor(true, args[1]);
			}, 
           use: async() => {
           if (!br.on || !br.turn) return `Tunggu dealer!`;
           let id = args[1] 
           let isi = br.ammo[0]
           if(!br.slot.includes(id)) return
           delete br.slot[br.slot.indexOf(id)]
           br.slot = br.slot.filter(v => v) 
           if(id == 1) {
           	let zippokun = await conn.sendMessage(m.chat, { text: `Peluru tersebut adalah peluru ${isi ? 'terisi':'kosong'}` }, { quoted: m }) 
           await sleep(3000) 
           conn.sendMessage(m.chat, { delete: zippokun.key }) 
           } else if(id == 2) {
           	br.dmg = 2;
           await conn.sendMessage(m.chat, { text: `Damage senjata sekarang menjadi 2` }, { quoted: m }) 
           } else if(id == 3) {
           	br.hcm = true
           await conn.sendMessage(m.chat, { text: `Dealer akan melewati giliran berikutnya` }, { quoted: m }) 
           } else if(id == 4) {
           let anu = (br.hp == hpkonto[br.ronde]) ? false : br.hp++
           await conn.sendMessage(m.chat, { text: `Menyembuhkan +${anu ? "1" : "0"} darah, darahmu sekarang adalah ${br.hp}/${hpkonto[br.ronde]}` }, { quoted: m }) 
           } else if(id == 5) {
           	let isinya = br.ammo.shift() 
           await conn.sendMessage(m.chat, { text: `Kamu mengeluarkan 1 peluru ${isinya ? "terisi":"kosong"}` }, { quoted: m }) 
           if(!br.ammo.length) await reload(m, conn, br) 
           } else {}
           return showShootOptions(m, conn, br)
           }, 
           info: async() => {
           	let zippo = new Button() 
           .setBody(`Darah Kamu: ${br.hp}/${hpkonto[br.ronde]}\nItem:\n${br.slot.map((v, i) => `${i+1}. ${item[v].name}`).join("\n")}\n\nDarah Dealer: ${br.hpm}/${hpkonto[br.ronde]}\nItem:\n${br.slotm.map((v, i) => `${i+1}. ${item[v].name}`).join("\n")}`)
        .addSelection("Select Here!")
        .makeSections("Select")
        .makeRow("", "Tembak Diri Sendiri", "Menembak diri sendiri", ".br tembak me")
        .makeRow("", "Tembak Dealer", "Tembak Sang Dealer", ".br tembak dealer")
        return zippo.run(m.chat, conn, m) 
           }
        };

        if (!zippo[cmd]) {
            return new Button()
                .setBody("Do you want to start?")
                .addReply("Start!", `${usedPrefix}${command} start`)
                .run(m.chat, conn, m);
        }
        await zippo[cmd]();
        conn.br[m.chat] = br;
    } catch (e) {
        m.reply(require('util').format(e));
    }
};

handler.command = ["br", "buckshotroullete", "buckshot"];
handler.help = "buckshot";
handler.tags = "game";

module.exports = handler;

async function reload(m, conn, br) {
	if (br.subronde < Object.keys(ammo[br.ronde]).length) br.subronde = br.subronde + 1;
                    if(br.ronde > 1) {
                    	let ack = ran(Object.keys(item)).slice(0, 4);
                    if(br.ronde == 2) ack= ack.slice(0, 2) 
                    	if((8 - br.slot.length) < ack.length) ack = ack.slice(0, (8 - br.slot.length))
                    if(br.slot.length < 8) conn.sendMessage(m.chat, { text: `Kamu mendapatkan:\n${ack.map((v, i) => `${i+1}. ${item[v].name}`).join("\n")}` }, { quoted: m })
                    br.slot = [...br.slot, ...ack]
                    ack = ran(Object.keys(item)).slice(0, 4);
                    if(br.ronde == 2) ack= ack.slice(0, 2) 
                    	if((8 - br.slotm.length) < ack.length) ack = ack.slice(0, (8 - br.slotm.length))
                    br.slotm = [...br.slotm, ...ack]
                    }
	br.ammo = ammo[br.ronde][br.subronde].sort(() => Math.random() - 0.5); 
	if(!br.ammo.length) {
await sleep(1000) 
delete br.ammo
br.ammo = [true, true, true, false, false, false, false, false].sort(() => Math.random() - 0.5)
}
	await sleep(500) 
                    await showTheAmmo(m, conn, 3, br)
                    await sleep(br.delay);
                    return br;
	}

async function showTheAmmo(m, conn, count, br) {
	let berisi = br.ammo.filter(v => v).length;
	let konto = br.ammo.filter(v => !v).length;
    let zippokun = await conn.sendMessage(m.chat, { text: `Wait ${count}s` }, { quoted: m });
    for (let i = count; i >= 1; i--) {
    	try {
        await conn.sendMessage(m.chat, { text: `Wait ${i}s`, edit: zippokun.key });
        await sleep(1000);
        } catch(e) {}
    }
    await conn.sendMessage(m.chat, { text: `Terdapat ${berisi} peluru terisi, dan ${konto} peluru kosong`, edit: zippokun.key });
    await sleep(br.delay)
    await conn.sendMessage(m.chat, { delete: zippokun.key })
    return br;
}

function showShootOptions(m, conn, br) {
    let zippo =  new Button()
        .setBody("Kamu ingin menembak dirimu sendiri, atau dealer?\n\n"+`Darah Kamu: ${br.hp}/${hpkonto[br.ronde]}\nItem:\n${br.slot.length ? br.slot.map((v, i) => `${i+1}. ${item[v].name}`).join("\n") : '- No items'}\n\nDarah Dealer: ${br.hpm}/${hpkonto[br.ronde]}\nItem:\n${br.slotm.length ? br.slotm.map((v, i) => `${i+1}. ${item[v].name}`).join("\n") : '- No items'}`)
        .addSelection("Select Here!")
        .makeSections("Select")
        .makeRow("", "Tembak Diri Sendiri", "Menembak diri sendiri", ".br tembak me")
        .makeRow("", "Tembak Dealer", "Tembak Sang Dealer", ".br tembak dealer")
        .addSelection('Use Item')
        .makeSections('Your Items')
        for(let i = 0; i < 8; i++) {
        zippo.makeRow("", (item[br.slot[i]] && item[br.slot[i]].name) || "No Items", (item[br.slot[i]] && item[br.slot[i]].desc) || '', '.br use '+(br.slot[i] || 'No'))
        }
        
        return zippo.run(m.chat, conn, m);
}

async function hpAnimation(m, conn, hp, text, zippokun, minus) {
	let min = minus
	if(hp < minus) min = hp
    for (let i = 1; i <= 5; i++) {
    	try {
        await conn.sendMessage(m.chat, { text: `${text}\n\n -${minus} HP\n${"❤".repeat(hp - (i % 2 === 0 ? 0 : min))}`, edit: zippokun.key });
        await sleep(1000);
        } catch(e) {}
    }
}

function ran(arr) {
    const weights = arr.map(item => 1 / item.length);
    const weightSum = weights.reduce((sum, weight) => sum + weight, 0);
    function weightedRandom() {
        let rand = Math.random() * weightSum;
        for (let i = 0; i < arr.length; i++) {
            rand -= weights[i];
            if (rand <= 0) {
                return arr[i];
            }
        }
    }
    const shuffled = [];
    for (let i = 0; i < arr.length; i++) {
        shuffled.push(weightedRandom());
    }

    return shuffled;
}

class Button {
    constructor() {
        this._body = "";
        this._footer = "";
        this._beton = [];
        this._type = "text";
        this._data;
        this._contextInfo = {};
        this._currentSelectionIndex = -1;
        this._currentSectionIndex = -1;
    }

    setType(type) {
        this._type = type;
        return this;
    }

    setBody(body) {
        this._body = body;
        return this;
    }

    setFooter(footer) {
        this._footer = footer;
        return this;
    }

    makeRow(header = "", title = "", description = "", id = "") {
        if (this._currentSelectionIndex === -1 || this._currentSectionIndex === -1) {
            throw new Error("You need to create a selection and a section first");
        }
        const buttonParams = JSON.parse(this._beton[this._currentSelectionIndex].buttonParamsJson);
        buttonParams.sections[this._currentSectionIndex].rows.push({ header, title, description, id });
        this._beton[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
        return this;
    }

    makeSections(title = "") {
        if (this._currentSelectionIndex === -1) {
            throw new Error("You need to create a selection first");
        }
        const buttonParams = JSON.parse(this._beton[this._currentSelectionIndex].buttonParamsJson);
        buttonParams.sections.push({ title, rows: [] });
        this._currentSectionIndex = buttonParams.sections.length - 1;
        this._beton[this._currentSelectionIndex].buttonParamsJson = JSON.stringify(buttonParams);
        return this;
    }

    addSelection(title) {
        this._beton.push({ name: "single_select", buttonParamsJson: JSON.stringify({ title, sections: [] }) });
        this._currentSelectionIndex = this._beton.length - 1;
        this._currentSectionIndex = -1;
        return this;
    }

    addReply(display_text = "", id = "") {
        this._beton.push({ name: "quick_reply", buttonParamsJson: JSON.stringify({ display_text, id }) });
        return this;
    }

    async run(jid, conn, quoted = {}) {
        const message = {
            body: proto.Message.InteractiveMessage.Body.create({ text: this._body }),
            footer: proto.Message.InteractiveMessage.Footer.create({ text: this._footer }),
            header: proto.Message.InteractiveMessage.Header.create({ title: this._title, subtitle: this._subtitle, hasMediaAttachment: false })
        };

        const msg = generateWAMessageFromContent(jid, {
            viewOnceMessage: {
                message: {
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        ...message,
                        contextInfo: this._contextInfo,
                        nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                            buttons: this._beton
                        })
                    })
                }
            }
        }, { quoted });

        await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
        return msg;
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}