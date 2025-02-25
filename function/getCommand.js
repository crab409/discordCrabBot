const getCommand = (content) => {
    content = content.split(" ")
    let operation = content[0]
    let operand = content.slice(1)

    if ((operation == "!출석") || (operation == "!출첵")) {
        if (operand.length != 0) return -1;
        return 0;
    }
    
    if (operation == "!출석률") {
        if (operand.length > 1) return -1;
        if (operand.length == 0) return 1;
        if (operand.length == 1) return 2; 
    } 

    if (operation == "!소스코드") {
        if (operand.length > 0) return -1;
        return 3;
    }
}

exports.getCommand = getCommand;