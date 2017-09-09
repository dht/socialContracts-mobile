import appState, {ActionTypes, initialState} from '../../reducers/appState/appState';
import {testState} from '../../_mocks/appState';

import clone from 'clone';

it('returns initial state for undefined', () => {
    expect(appState(undefined, {})).toEqual(initialState);
});

it('SET_NAME', () => {
    const action = {
        type: ActionTypes.SET_NAME,
        value: 'James'
    };

    expect(appState(testState, action))
        .toEqual({
            ...testState,
            settings: {
                ...testState.settings,
                name: 'James'
            }
        });
});

it('SET_TIMEZONE', () => {
    const action = {
        type: ActionTypes.SET_TIMEZONE,
        value: 'IL'
    };

    expect(appState(testState, action))
        .toEqual({
            ...testState,
            settings: {
                ...testState.settings,
                timezone: 'IL'
            }
        });
});

it('SET_DEFAULT_LANGUAGE', () => {
    const action = {
        type: ActionTypes.SET_DEFAULT_LANGUAGE,
        value: 'he'
    };

    expect(appState(testState, action))
        .toEqual({
            ...testState,
            settings: {
                ...testState.settings,
                defaultLanguage: 'he'
            }
        });
});

it('SET_DAY_RANGE', () => {
    const action = {
        type: ActionTypes.SET_DAY_RANGE,
        range: {
            start: '8:30'
        },
    };

    expect(appState(testState, action))
        .toEqual({
            ...testState,
            settings: {
                ...testState.settings,
                day: {start: '8:30', end: '18:00'}
            }
        });
});

it('ADD_RANGE', () => {
    const action = {
            type: ActionTypes.ADD_RANGE,
            period: 'weekday',
            channel: 'phone',
            range: {
                start: '10:30',
                end: '10:45',
            },
        },
        expectedResult = clone(testState);

    expectedResult.plans.weekday.phone = {
        r1: {id: 1, start: '8:00', end: '10:00'},
        r2: {id: 2, start: '18:00', end: '20:00'},
        r3: {id: 3, start: '10:30', end: '10:45'}
    }

    expect(appState(testState, action))
        .toEqual(expectedResult);
});

it('SET_RANGE', () => {
    const action = {
            type: ActionTypes.SET_RANGE,
            period: 'weekday',
            channel: 'phone',
            id: 2,
            range: {
                id: 2,
                end: '20:45',
            },
        },
        expectedResult = clone(testState);

    expectedResult.plans.weekday.phone = {
        r1: {id: 1, start: '8:00', end: '10:00'},
        r2: {id: 2, start: '18:00', end: '20:45'},
    }

    expect(appState(testState, action))
        .toEqual(expectedResult);
});

it('REMOVE_RANGE', () => {
    const action = {
            type: ActionTypes.REMOVE_RANGE,
            period: 'weekday',
            channel: 'phone',
            id: 2,
        },
        expectedResult = clone(testState);

    expectedResult.plans.weekday.phone = {
        r1: {id: 1, start: '8:00', end: '10:00'},
    }

    expect(appState(testState, action))
        .toEqual(expectedResult);
});

it('ADD_RANGE_FOR_DATE', () => {
    const action = {
            type: ActionTypes.ADD_RANGE_FOR_DATE,
            year: '2017',
            month: '9',
            day: '9',
            channel: 'phone',
            range: {
                start: '10:30',
                end: '10:45',
            },
        },
        expectedResult = clone(testState);

    expectedResult.plansByDate.y2017.m9.d9.phone = {
        r1: {id: 1, start: '9:00', end: '9:30'},
        r2: {id: 2, start: '12:45', end: '13:00'},
        r3: {id: 3, start: '15:00', end: '17:00'},
        r4: {id: 4, start: '10:30', end: '10:45'}
    }

    expect(appState(testState, action))
        .toEqual(expectedResult);
});

it('SET_RANGE_FOR_DATE', () => {
    const action = {
            type: ActionTypes.SET_RANGE_FOR_DATE,
            year: '2017',
            month: '9',
            day: '9',
            channel: 'phone',
            id: 2,
            range: {
                id: 2,
                end: '20:45',
            },
        },
        expectedResult = clone(testState);

    expectedResult.plansByDate.y2017.m9.d9.phone = {
        r1: {id: 1, start: '9:00', end: '9:30'},
        r2: {id: 2, start: '12:45', end: '20:45'},
        r3: {id: 3, start: '15:00', end: '17:00'},
    }

    expect(appState(testState, action))
        .toEqual(expectedResult);
});

it('REMOVE_RANGE_FOR_DATE', () => {
    const action = {
            type: ActionTypes.REMOVE_RANGE_FOR_DATE,
            year: '2017',
            month: '9',
            day: '9',
            channel: 'phone',
            id: 2,
        },
        expectedResult = clone(testState);

    expectedResult.plansByDate.y2017.m9.d9.phone = {
        r1: {id: 1, start: '9:00', end: '9:30'},
        r3: {id: 3, start: '15:00', end: '17:00'},
    }

    expect(appState(testState, action))
        .toEqual(expectedResult);
});