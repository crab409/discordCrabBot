const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
};



const getDate = () => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let week = getWeek(new Date()); 
    return `${year}-${month}-${date}:${week}`;
};



exports.getDate = getDate;