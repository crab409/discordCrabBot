const { getDate } = require("./getDate");

const getYearPercent = (recode) => {
    let today = getDate().split(':')[0].split('-');
    let numOfDays = 0;
    
    for(let i=1; i<today[1]; i++) {
        if (i<8) {
            if (i % 2 != 0) {
                numOfDays += 31
            } else if (i == 2) {
                // 윤년일때
            } else {
                numOfDays += 30
            }
        } else {
            if (i % 2 == 0) {
                numOfDays += 31
            } else {
                numOfDays += 30
            }
        }
    }
    numOfDays += parseInt(today[2])
    return (recode.length-1)/numOfDays * 100
}



const checkPercent = async (db, message) => {
    data = await db.collection("recode").findOne({discordId: message.author.id});
    recode = data.recode.split('\n').reverse();
    console.log(getYearPercent(recode))
}

exports.checkPercent = checkPercent;