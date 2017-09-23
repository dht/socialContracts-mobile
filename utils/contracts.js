import {rangesToRangesArray, timePositionOfRangeArray, numberToTimeString} from './ranges';
import {strings, setLanguage} from '../constants/languages';

let str = strings();
let fixed_date;

export const setFixedDate = (date) => {
    fixed_date = date;
}

const now = () => {
    if (fixed_date) {
        return new Date(fixed_date.getTime());
    } else {
        return new Date();
    }
}

const getNow = (timeDeltaInHours = 0) => {
    const _now = now();
    _now.setHours(_now.getHours() + timeDeltaInHours);
    return {
        date: _now,
        day: _now.getDay(),
        time: _now.getHours() + (_now.getMinutes() / 60)
    };
}

export const weekdayMap = (doesWeekStartsOnMonday) => {
    return doesWeekStartsOnMonday ? [0, 1, 1, 1, 1, 1, 0] : [1, 1, 1, 1, 1, 0, 0];
}

export const getPlanForDate = (contract, daysDelta) => {
    const now = getNow(0),
        date = now.date;

    date.setDate(date.getDate() + daysDelta);

    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    if (contract.plansByDate &&
        contract.plansByDate[`y${year}`] &&
        contract.plansByDate[`y${year}`][`m${month}`] &&
        contract.plansByDate[`y${year}`][`m${month}`][`d${day}`]
    ) {
        return contract.plansByDate[`y${year}`][`m${month}`][`d${day}`];
    }
}

export const getPlanForDay = (contract, daysDelta) => {
    const weekdays = weekdayMap(false),
        now = getNow(0);

    const isWeekday = weekdays[(now.day + daysDelta) % 7],
        period = isWeekday ? 'weekday' : 'weekend',
        plan = (contract['plans']||{})[period],
        planByDate = getPlanForDate(contract, daysDelta);

    return planByDate ? planByDate : plan;
}

// {d0: [[8.5, 18]], d1: [[10.5, 11], [17.5, 20]], d2: [[10.5, 11], [17.5, 20]], d3: [[8.5, 18]]}
export const channelToAR = (contract, days, channel) => {
    let output = {};

    for (let day = 0; day <= days; day++) {
        const plan = getPlanForDay(contract, day) || {},
            ranges = plan[channel];

        output[`d${day}`] = rangesToRangesArray(ranges);
    }

    return output;
}

export const contractToAR = (contract, days) => {
    return {
        phone: channelToAR(contract, days, 'phone'),
        whatsapp: channelToAR(contract, days, 'whatsapp'),
        email: channelToAR(contract, days, 'email'),
        facebook: channelToAR(contract, days, 'facebook'),
    }
}

const sortRangesArrays = (rangesArrays) => {
    rangesArrays.sort(function (a, b) {
        if (a[0] === b[0]) {
            return 0;
        } else if (a[0] > b[0]) {
            return 1;
        } else {
            return -1;
        }
    })
}

// [[10.5, 11], [17.5, 20]]
export const findTodayRelevantRange = (rangesArraysPerDay, currentTimeNumber) => {
    let output = null;
    let rangesArrays = rangesArraysPerDay['d0'];

    sortRangesArrays(rangesArrays);

    rangesArrays.forEach(rangeArray => {
        const pastPresentFuture = timePositionOfRangeArray(rangeArray, currentTimeNumber);

        if (pastPresentFuture >= 0 && !output) {
            output = {
                d0: rangeArray
            };
        }
    });

    return output;
}

// [[10.5, 11], [17.5, 20]]
export const findFirstRelevantRange = (rangesArraysPerDay) => {

    let day = 1,
        found = false,
        output;

    while (day < 14 && !found && rangesArraysPerDay) {
        const d = `d${day}`,
            rangesArrays = rangesArraysPerDay[d] || [],
            exists = rangesArrays.length > 0;

        sortRangesArrays(rangesArrays);

        if (exists) {
            found = true;
            output = {
                [d]: rangesArrays[0]
            }
        }

        day++;
    }

    return output;
}

// {d0: [[8.5, 18]], d1: [[10.5, 11], [17.5, 20]], d2: [[10.5, 11], [17.5, 20]], d3: [[8.5, 18]]}
export const findNextRelevantRange = (rangesArraysPerDay, currentTimeNumber) => {
    let output = findTodayRelevantRange(rangesArraysPerDay, currentTimeNumber);

    if (!output) {
        output = findFirstRelevantRange(rangesArraysPerDay, currentTimeNumber)
    }

    return output;
}

export const contractToNow = (contract, time) => {
    const now = time ? {time: time} : getNow(0),
        AR = contractToAR(contract, 7);

    return {
        phone: findNextRelevantRange(AR.phone, now.time),
        whatsapp: findNextRelevantRange(AR.whatsapp, now.time),
        email: findNextRelevantRange(AR.email, now.time),
        facebook: findNextRelevantRange(AR.facebook, now.time),
    }
}

export const dayToText = (daysDelta) => {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const now = getNow(0),
        date = now.date,
        futureDay = (now.day + daysDelta) % 7;

    date.setDate(date.getDate() + daysDelta);

    if (daysDelta === 0) {
        return str['today'];
    } else if (daysDelta === 1) {
        return str['tomorrow'];
    } else if (daysDelta < 6) {
        return str[days[futureDay]];
    } else {
        const month = date.getMonth() + 1,
            day = date.getDate();

        return `${day}/${month}`;
    }
}

export const rangeArrayToText = (currentTimeNumber, nextAvailability = {}, isRange, language, hours24) => {

    setLanguage(language);
    str = strings();

    const isEmpty = Object.keys(nextAvailability).length === 0;

    if (isEmpty) {
        return str['not_available'];
    }

    const dayKey = Object.keys(nextAvailability)[0],
        rangeArray = nextAvailability[dayKey],
        day = parseInt(dayKey.replace('d', ''), 10),
        pastPresentFuture = day === 0 ? timePositionOfRangeArray(rangeArray, currentTimeNumber) : 1;

    if (pastPresentFuture === 0) {
        return str['available_now'];
    }

    if (pastPresentFuture === 1) {
        let output = [];
        if (!isRange) {
            output.push(str['will_check']);
        }

        output.push(dayToText(day));
        output.push(str['at']);
        output.push(numberToTimeString(rangeArray[0], hours24));
        return output.join(' ');
    }

    return str['not_available'];
}

export const contractToText = (contract, language = 'en', hours24 = true, time) => {
    const now = time ? {time: time} : getNow(0);
    const nextRelevantRange = contractToNow(contract, now.time);

    return {
        phone: rangeArrayToText(now.time, nextRelevantRange.phone, true, language, hours24),
        whatsapp: rangeArrayToText(now.time, nextRelevantRange.whatsapp, true, language, hours24),
        email: rangeArrayToText(now.time, nextRelevantRange.email, false, language, hours24),
        facebook: rangeArrayToText(now.time, nextRelevantRange.facebook, false, language, hours24),
    }
}

