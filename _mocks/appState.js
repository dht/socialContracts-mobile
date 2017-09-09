export const testState = {
    type: 'DYNAMIC',
    availabilityString: {
        phone: '',
        whatsapp: '',
        email: '',
        facebook: '',
    },
    settings: {
        name: '',
        timezone: 'US',
        defaultLanguage: 'en',
        day: {start: '8:00', end: '18:00'}
    },
    plans: {
        weekday: {
            phone: {r1: {id: 1, start: '8:00', end: '10:00'}, r2: {id: 2, start: '18:00', end: '20:00'}},
            whatsapp: {r1: {id: 1, start: '8:00', end: '10:00'}},
            email: {r1: {id: 1, start: '8:00'}},
            facebook: {r1: {id: 1, start: '20:00'}},
        },
        weekend: {
            phone: {},
            whatsapp: {r1: {id: 1, start: '18:00', end: '20:00'}},
            email: {r1: {id: 1, start: '21:30'}},
            facebook: {},
        }
    },
    plansByDate: {
        y2017: {
            m9: {
                d9: {
                    phone: {
                        r1: {id: 1, start: '9:00', end: '9:30'},
                        r2: {id: 2, start: '12:45', end: '13:00'},
                        r3: {id: 3, start: '15:00', end: '17:00'}
                    },
                    whatsapp: {r1: {start: '9:00', end: '9:30'}},
                    email: {r1: {id: 1, start: '8:00'}, r2: {id: 2, start: '20:15'}},
                    facebook: {r1: {id: 1, start: '20:30'}},
                }
            }
        }
    }
}