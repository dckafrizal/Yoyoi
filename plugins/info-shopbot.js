let handler = async (m, { conn }) => {
let caption = `*[ SHOP BOT BY CHRISTY-BOT ]*

List paket:
- Premium 
- Moderator 
- Sewa bot

• List Premium✅:
•10,000rp; = 7 hari
•40,000rp; = 30 hari
•60,000r; = permanent

keuntungan:
-akses Banyak fitur bot✅
-dapat memasukkan bot ke dalam group✅

• List moderator: 
•40,000; = 7 hari 
•70,000; = 30 hari
•90,000; = permanent

keuntungan:
- akses fitur moderator ✅
- ban✅
- unban✅
- add limit✅
- add exp✅
- add money✅
- add to Group✅

•sewa bot:
-7,000rp; = 7 hari
-30,000rp; = 30 hari
 
note: Bot akan keluar dari group jika masa sewa telah habis‼️



Ingin membeli? Chat ⤵️
${global.owner.map(a => "wa.me/" + a).join('\n')}
Selain itu *Clone* !!

• Payment:
➡️ Dana, Gopay, Ovo

Shop bot By ritz"`

conn.sendButton(m.chat,[["ORDER NOW",".owner"]], m, { 
footer: caption
})

       }
       
handler.help = ["shopbot"].map(a => a + " *[Info shop bot]*")
handler.tags = ["main","info"]
handler.command = ["shopbot"]
module.exports = handler