export const getMaxId = (ranges) => {
    return Object.keys(ranges).reduce((output, key) => {
        const item = ranges[key] || {};
        return Math.max(item.id || 0, output);
    }, 0)
}

export const rangeToText = (range) => {
        return range.end ? `${range.start} - ${range.end}` : `${range.start}`;
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
    return Object.keys(a_hours).reduce((output, channel) => {
        const ranges = a_hours[channel],
            text = rangesToText(ranges);

        output.push({
            channel,
            text
        });

        return output;
    }, [])
}