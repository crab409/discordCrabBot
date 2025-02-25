const { getDate } = require("./getDate");

const getYearPercent = (recode) => {
    let today = getDate().split(':')[0].split('-');
    let numOfDays = 0;
    
    for(let i=1; i<today[1]; i++) {
        if (i<8) {
            if (i % 2 != 0) {
                numOfDays += 31;
            } else if (i == 2) {
                if (((i%4==0)&&(i%100!=0))||((i%4!=0)&&(i%100==0))||(i%400)) {
                    numOfDays += 29;
                } else {
                    numOfDays += 28;
                }
            } else {
                numOfDays += 30;
            }
        } else {
            if (i % 2 == 0) {
                numOfDays += 31;
            } else {
                numOfDays += 30;
            }
        }
    }
    numOfDays += parseInt(today[2]);
    return (recode.length-1)/numOfDays * 100;
}



const getMonthPercent = (recode) => {
    let today = getDate().split(':')[0].split('-');
    let numOfDays = today[2];
    let days = 0;

    for (let i=0; i<(recode.length-1); i++) {
        let data = recode[i].split(':')[0].split('-');
        if ((today[0]!=data[0]) || (today[1]!=data[1])) return days/numOfDays*100;
        days++;
    }
}



const getWeekPercent = (recode) => {
    let today = new Date();
    let numOfDays = today.getDay() + 1;
    let nowWeek = getDate().split(':')[1];
    let days = 0;

    for(let i=0; i<(recode.length-1); i++) {
        let data = recode[i].split(":")[1];
        if (data != nowWeek) return days/numOfDays*100;
        days++;
    }
}



const checkPercent = async (db, discordId, channel) => {
    let data = await db.collection("recode").findOne({discordId: discordId});
    if (data == null) {
        console.log(`${discordId} is an ID that is not registered in the DB.\nreturn None\n`);
        channel.send(`죄송해요! DataBase에 <@${discordId}>님의 데이터가 존재하지 않아요!\n이전에 출첵을 한적이 있는지 확인해주시고, 계속 문제가 발생하면 개발자에게 연락 주세요!`);
        return;
    }
    let recode = data.recode.split('\n').reverse();
    let yearPer = await getYearPercent(recode);
    let monthPer = await getMonthPercent(recode);
    let weekPer = await getWeekPercent(recode);

    text = `<@${discordId}>님의 출석률을 표시해드릴께요! \n\`\`\`ansi\n연간 출석률 => [0;34m${yearPer}%[0m\n월간 출석률 => [0;34m${monthPer}%[0m\n주간 출석률 => [0;34m${weekPer}%[0m\n\`\`\``
    channel.send(text);
    console.log("Message sent successfully.\n")
}

exports.checkPercent = checkPercent;
exports.getYearPercent = getYearPercent;
exports.getMonthPercent = getMonthPercent;
exports.getWeekPercent = getWeekPercent;