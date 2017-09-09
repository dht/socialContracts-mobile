export const defaultAppState = {
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
            phone: {r1: {id: 1, start: '8:30', end: '18:00'}},
            whatsapp: {r1: {id: 1, start: '8:30', end: '18:00'}},
            email: {r1: {id: 1, start: '8:00'}},
            facebook: {r1: {id: 1, start: '20:00'}},
        },
        weekend: {
            phone: {},
            whatsapp: {},
            email: {},
            facebook: {},
        }
    },
    plansByDate: {
    }
}

