let handler = async (m, { conn, command, text }) => {
    // Initialize menubot if it doesn't exist
    conn.menubot = conn.menubot || { id: 1 };
    
    // Define menu options
    const menus = {
        1: 'Normal',
        2: 'Simple',
        3: 'Payment',
        4: 'Gif',
        5: 'Document',
    };

    // If text is provided, attempt to set the menu
    if (text) {
        let menuIndex = parseInt(text);
        // Check if the provided menu index is valid
        if (isNaN(menuIndex) || !menus[menuIndex]) {
            // Invalid menu index, send the menu options
            conn.reply(
                m.chat, 
                '```Silakan pilih menu dari daftar berikut:\n```' + 
                Object.entries(menus).map(([id, theme]) => `\n${id}. Menu ${theme}`).join('') + 
                `\n\nSelanjutnya gunakan perintah: *.setmenu* <1|2|3|4|5>\n\n> Christy MD By Ritz`, 
                m
            );
            return;
        }
        // Valid menu index, update the menu
        conn.menubot.id = menuIndex;
        conn.reply(m.chat, '```Menu berhasil diubah menjadi:```' + ` *${menus[menuIndex]}*`, m);
    } else {
        // No text provided, send the menu options
        conn.reply(
            m.chat, 
            '```Silakan pilih menu dari daftar berikut:\n```' + 
            Object.entries(menus).map(([id, theme]) => `\n${id}. Menu ${theme}`).join('') + 
            `\n\nSelanjutnya gunakan perintah: *.setmenu* <1|2|3|4|5>\n\n> Christy MD By Ritz`, 
            m
        );
    }
};

handler.help = ['setmenu *<type>*'];
handler.tags = ['owner'];
handler.command = /^(setmenu)$/i;
handler.owner = true;

module.exports = handler;
