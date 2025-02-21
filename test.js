const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();
  
    return Math.ceil((currentDate + firstDay) / 7);
};

const CheckedCheck = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let week = getWeek(today)
    today = year + '-' + month + '-' + date + ':' + week
    return today
};

console.log(CheckedCheck())