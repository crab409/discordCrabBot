// 필요한 모듈 가져오기
const { Client, Events, GatewayIntentBits } = require("discord.js");
const { MongoClient } = require("mongodb");
const { getCommand } = require("./function/getCommand.js");
const { dailyCheck } = require("./function/dailyCheck.js");
const { checkPercent } = require("./function/checkPercent.js")
require("dotenv").config();

const token = process.env.TOKEN;
const mongoUrl = process.env.DB_URL;

// Discord 클라이언트 생성
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

// MongoDB 연결 설정
let db;
const mongoClient = new MongoClient(mongoUrl);

async function connectDB() {
    try {
        await mongoClient.connect();
        console.log("connected to MongoDB.mainDataBase");
        db = mongoClient.db("mainDataBase");
    } catch (error) {
        console.error("db: fucked", error);
    }
}

// 봇이 준비되었을 때 실행
client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

// 메시지 이벤트 핸들러
client.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith("!")) {
        let commandNumber = getCommand(message.content);
        
        if (commandNumber == -1) {
            message.channel.send("잘못된 입력이 감지되었습니다! 다시 입력해 주세요.")
        } else if (commandNumber == 0) {
            console.log(`>> command 00(daily check) inputed!\tuser id: ${message.author.id}`)
            await dailyCheck(db, message);
        } else if (commandNumber == 1) {
            console.log(`>> command 01(visualize recode self) inputed\tuser id: ${message.author.id}`)
            await checkPercent(db, message.author.id, message.channel);
        } else if (commandNumber == 2) {
            console.log(`>> command 02(visualize recode other one) inputed\tuser id: ${message.author.id}\ttaget id: ${message.mentions.users.first().id}`)
            await checkPercent(db, message.mentions.users.first().id, message.channel);
        } else if (commandNumber == 3) {
            console.log(`>> command 03(Source code provided) inputed\tuser id ${message.author.id}`);
            message.channel.send("제 본 모습을 제공해드릴께요!\nhttps://github.com/crab409/discordCrabBot");
        }
    }
});

// MongoDB 연결 후 Discord 봇 로그인
async function startBot() {
    await connectDB();  // DB 연결 시도 (실패해도 계속 진행)
    client.login(token);
}

startBot();