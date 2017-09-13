export const getMaxId = (ranges) => {
    return Object.keys(ranges).reduce((output, key) => {
        const item = ranges[key] || {};
        return Math.max(item.id || 0, output);
    }, 0)
}

export const rangeToText = (range) => {
    return range.end ? `${range.start}-${range.end}` : `${range.start}`;
}

export const rangesToText = (ranges) => {
    return Object.keys(ranges).reduce((output, key) => {

        const range = ranges[key];
        output.push(rangeToText(range));

        return output;
    }, []).join(', ');
}


/*
 {
 phone: {r1: {id: 1, start: '8:00', end: '10:00'}, r2: {id: 2, start: '18:00', end: '20:00'}},
 whatsapp: {r1: {id: 1, start: '8:00', end: '10:00'}},
 email: {r1: {id: 1, start: '8:00'}},
 facebook: {r1: {id: 1, start: '20:00'}},
 }
 */

export const hoursToList = (a_hours) => {
    // future: Object.keys(a_hours)
    // for better sorting
    return ['phone', 'whatsapp', 'email', 'facebook'].reduce((output, channel) => {
        const ranges = a_hours[channel],
            text = rangesToText(ranges || {});

        output.push({
            channel,
            text
        });

        return output;
    }, [])
}

export const rangesToList = (ranges) => {
    return Object.keys(ranges).reduce((output, key) => {
        const range = ranges[key],
            text = rangeToText(range);

        output.push({
            id: range.id,
            text
        });

        return output;
    }, [])
}

export const timeStringToDate = (time) => {
    const now = new Date();

   try {
       const timeParts = time.split(':'),
           hours = parseInt(timeParts[0]),
           minutes = parseInt(timeParts[1]);

       now.setMinutes(minutes);
       now.setHours(hours);
       now.setSeconds(0);
       now.setMilliseconds(0);

       return now;

   } catch (e) {
       return now;
   }
}

const leadingZero = (number) => {
    return number >= 10 ? number : '0' + number;
}

export const dateToTimeString = (date) => {
   return date.getHours() + ':' + leadingZero(date.getMinutes());
}

export const lowerOrEqualTimeString = (timeString1, timeString2) => {
    const date1 = timeStringToDate(timeString1),
        date2 = timeStringToDate(timeString2);

    return date1 <= date2 ? dateToTimeString(date1) : dateToTimeString(date2);
}

export const higherOrEqualTimeString = (timeString1, timeString2) => {
    const date1 = timeStringToDate(timeString1),
        date2 = timeStringToDate(timeString2);

    return date1 >=  date2 ? dateToTimeString(date1) : dateToTimeString(date2);
}

export const getRanges = (state) => {

    const {appState, uiState} = state,
        {currentPlan, currentChannel} = uiState,
        {plans} = appState,
        ranges = plans[currentPlan][currentChannel];

        return ranges;
}

export const getRange = (state) => {

    const {uiState} = state,
        {currentRangeId} = uiState,
        ranges = getRanges(state);

        return ranges[`r${currentRangeId}`];
}

export const newValueForChannel = (channel) => {

    switch (channel) {
        case 'phone':
        case 'whatsapp':
           return {start:'8:00', end:'10:00'};

        case 'email':
        case 'facebook':
            return {start:'8:00'};
    }
}

export const nextId = (state) => {
    const ranges = getRanges(state) || {};
    return getMaxId(ranges) + 1;
}