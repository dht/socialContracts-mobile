export const getMaxId = (ranges) => {
    return Object.keys(ranges).reduce((output, key) => {
        const item = ranges[key] || {};
        return Math.max(item.id || 0, output);
    }, 0)
}

export const rangeToText = (range) => {
    return range.end ? `${range.start}-${range.end}` : `${range.start}`;
}

export const rangesToText = (ranges = []) => {
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

export const hoursToList = (a_hours = {}) => {
    // future: Object.keys(a_hours)
    // for better sorting
    return ['phone', 'whatsapp', 'email', 'facebook'].reduce((output, channel) => {
        const ranges = a_hours[channel] || {},
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
        {plans = {}} = appState,
        ranges = (plans[currentPlan] || {})[currentChannel];

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

// {start: '10:00', end: '18:00'}
export const rangeToRangeArray = (range) => {
    let output = [];

    output.push(timeStringToNumber(range.start));

    if (range.end) {
        output.push(timeStringToNumber(range.end));
    }

    return output;
}


const leadingZero = (number) => {
    return number >= 10 ? number : '0' + number;
}

export const timeStringToNumber = (time) => {
    let output;

    try {
        const timeParts = time.split(':'),
            hours = parseInt(timeParts[0]),
            minutes = parseInt(timeParts[1]);

        output = hours + (minutes / 60);

    } catch (e) {

    }

    return output;
}

export const numberToTimeString = (time, hours24 = false) => {
    let output = '';

    try {
        const hours = Math.floor(time),
            minutes = leadingZero(Math.floor((time - hours) * 60)),
            isPM = hours >= 12;

        if (hours24) {
            output = hours + ':' + minutes;
        } else {
            output = (hours > 12 ? hours - 12 : hours) + ':' + minutes + (isPM ? 'pm' : 'am');
        }
    } catch (e) {

    }

    return output;
}

// {r1: {start: '10:00', end: '18:00'}, r2: {start: '19:00', end: '20:00'}}
export const rangesToRangesArray = (ranges = []) => {
    return Object.keys(ranges).map(key => {
        return rangeToRangeArray(ranges[key]);
    });
}

const deltaForChecking = 0.25;

// -1 = past, 0 = now, 1 = future
export const timePositionOfRangeArray = (rangeArray, currentTimeNumber) => {
    const start = rangeArray[0],
        end = rangeArray.length >= 2 ?rangeArray[1] :  start + deltaForChecking;

    if (currentTimeNumber > end) {
        return -1;
    }

    if (currentTimeNumber >= start && currentTimeNumber <= end) {
        return 0;
    }

    if (currentTimeNumber < start) {
        return 1;
    }
}