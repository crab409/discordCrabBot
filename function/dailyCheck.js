const { getDate } = require("./getDate");



const signUp = async (db, message) => {
    console.log(`Registering ${message.author.username} to DB...`);
    const data = {
        discordId: message.author.id,
        recode: "",
        total: 0,
        password: "",
        userName: message.author.username
    };
    await db.collection("recode").insertOne(data);
    console.log("Done!");
};



const isChecked = (recode) => {
    const today = getDate();
    recode = recode.split('\n').reverse();
    return recode.length > 0 && recode[0] === today;
};



const dailyCheck = async (db, message) => {
    let data = await db.collection("recode").findOne({ discordId: message.author.id });

    if (data == null) { 
        console.log(`${message.author.username} is an ID that is not registered in the DB.`);
        await signUp(db, message);
        data = await db.collection("recode").findOne({ discordId: message.author.id });
    }

    let recode = data.recode;
    if (isChecked(recode)) {
        message.channel.send("출석 체크는 하루에 한 번만 할 수 있어요!");
        console.log("It's already checked!\n");

    } else {
        recode = recode + '\n' + getDate();
        let total = data.total + 1;
        await db.collection("recode").updateOne({ discordId: message.author.id }, {
            $set: { recode: recode, total: total}
        });
        message.channel.send(`\`\`\`asciidoc\n\`${total}\'번째 \`출석\'이 완료 되었어요!\`\`\``);
        console.log("Checked!\n");
    }
};



exports.dailyCheck = dailyCheck;