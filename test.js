const { getDate } = require("./function/getDate.js")

const getWeekPercent = () => {
    let today = new Date();
    let numOfDays = today.getDay() + 1;
    let nowWeek = getDate().split(':')[1];
    console.log(numOfDays)
}

getWeekPercent()