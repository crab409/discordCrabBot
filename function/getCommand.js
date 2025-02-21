const getCommand = (content) => {
    content = content.split(" ")
    let operation = content[0]
    let operand = content.slice(1)

    if ((operation == "!출석") || (operation == "!출첵")) {
        if (operand.length != 0) return -1;
        return 0;

    } else if (("!기록") || ("!기록열람") || ("!기록보기")) {
        if (operand.length > 1) return -1;
        if (operand.length == 0) return 1;
        if (operand.length == 1) return 2; 
    }
}

exports.getCommand = getCommand;