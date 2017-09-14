export const formatTypes = {
    STATIC: 'static',
    DYNAMIC: 'dynamic',
}

export const planTypes = {
    WEEKDAY: 'weekday',
    WEEKEND: 'weekend',
}

export const channelTypes = {
    NONE: 'none',
    PHONE: 'phone',
    WHATSAPP: 'whatsapp',
    EMAIL: 'email',
    FACEBOOK: 'facebook',
}

export const defaultAppState = {
    type: formatTypes.DYNAMIC,
    availabilityString: {
        phone: '',
        whatsapp: '',
        email: '',
        facebook: '',
    },
    settings: {
        name: '',
        timezone: 'IL',
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
            phone: {r1: {id: 1, start: '8:30', end: '18:00'}},
            whatsapp: {r1: {id: 1, start: '8:30', end: '18:00'}},
            email: {r1: {id: 1, start: '8:00'}},
            facebook: {r1: {id: 1, start: '20:00'}},
        }
    },
    plansByDate: {
    }
}

export const emptyAppState = {
    type: formatTypes.DYNAMIC,
    availabilityString: {
        phone: '',
        whatsapp: '',
        email: '',
        facebook: '',
    },
    settings: {
        name: '',
        timezone: 'IL',
        defaultLanguage: 'en',
        day: {start: '8:00', end: '18:00'}
    },
    plans: {
        weekday: {
            phone: {},
            whatsapp: {},
            email: {},
            facebook: {},
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

