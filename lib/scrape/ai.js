const cheerio = require("cheerio")

function generateRandomUserAgent() {
    const androidVersions = ['4.0.3', '4.1.1', '4.2.2', '4.3', '4.4', '5.0.2', '5.1', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0'];
    const deviceModels = ['M2004J19C', 'S2020X3', 'Xiaomi4S', 'RedmiNote9', 'SamsungS21', 'GooglePixel5'];
    const buildVersions = ['RP1A.200720.011', 'RP1A.210505.003', 'RP1A.210812.016', 'QKQ1.200114.002', 'RQ2A.210505.003'];
    const selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)];
    const selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)];
    const chromeVersion = 'Chrome/' + (Math.floor(Math.random() * 80) + 1) + '.' + (Math.floor(Math.random() * 999) + 1) + '.' + (Math.floor(Math.random() * 9999) + 1);
    const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`;
    return userAgent;
}

function generateRandomIP() {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
}

async function talkai(type, message) {
    try {
        const headers = {
            'User-Agent': generateRandomUserAgent(),
            'Referer': 'https://talkai.info/id/chat/',
            'X-Forwarded-For': generateRandomIP(),
        };

        const data = {
            temperature: 1,
            frequency_penalty: 0,
            type: type,
            messagesHistory: [{
                    from: 'chatGPT',
                    content: 'Nama ku akiraa aku adalah maskot dari TalkAi sedang bisa membantu mu 😋👍' 
                },
                {
                    from: 'you',
                    content: message
                },
            ],
            message: message,
        };

        let response;

        try {
            response = await axios.post('https://talkai.info/id/chat/send/', data, {
                headers
            });
        } catch (sendError) {
            console.error('Error with "send" request. Falling back to "send2".', sendError);
            // If "send" fails, try "send2"
            response = await axios.post('https://talkai.info/id/chat/send2/', data, {
                headers
            });
        }

        return response.data;
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
    }
}
async function BalckBox(text) {
    return new Promise(async (resolve, reject) => {
        try {
            const danz = await axios.post('https://www.useblackbox.io/chat-request-v4', {
                text: text,
                allMessages: [{
                    user: text
                }],
                stream: '',
                clickedContinue: false
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Linux x86_64) Gecko/20130401 Firefox/71.3',
                }
            });
            resolve(danz.data)
        } catch (e) {
            reject(e)
        }
    })
}


module.exports = { 
talkai,
BalckBox
 }


let fs = require('fs')
let chalk = require('chalk')
let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update scrape"))
  delete require.cache[file]
  require(file)
})