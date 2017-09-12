export const listHeaders = {
    emptyTimeRanges: 'No time ranges - no availability',
    emptyTimes: 'No check times - no availability',
    ranges: 'I will be available during those time ranges:',
    times: 'I will check my [X] at:'
}

export const instructions = {
    addTimeRange: 'Add a time range for [X] availability:',
    changeTimeRange: 'change the time range for [X] availability:',
    addTime: 'Add a time for checking your [X]:',
    changeTime: 'change the time for checking your [X]:',
}

export const verbs = {
    addTimeRange: 'Add a range',
    addTime: 'Add a time',
}

export const listHeaderForChannel = (channel, isEmpty) => {
    let output;

    switch (channel) {
        case 'phone':
        case 'whatsapp':
            output = isEmpty ? listHeaders.emptyTimeRanges : listHeaders.ranges;
            break;
        case 'email':
        case 'facebook':
            output =isEmpty ? listHeaders.emptyTimes : listHeaders.times;
            break;
    }

    return output.replace('[X]', channel);
}

export const instructionsForChannel = (channel, isAdd) => {
    let output;

    switch (channel) {
        case 'phone':
        case 'whatsapp':
            output =  isAdd ? instructions.addTimeRange: instructions.changeTimeRange;
            break;

        case 'email':
        case 'facebook':
            output = isAdd ? instructions.addTime : instructions.changeTime;
            break;
    }

    return output.replace('[X]', channel);
}

export const addVerbTextForChannel = (channel) => {
    let output;

    switch (channel) {
        case 'phone':
        case 'whatsapp':
            output =  verbs.addTimeRange;
            break;

        case 'email':
        case 'facebook':
            output =  verbs.addTime;
            break;
    }

    return output;
}