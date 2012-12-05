var CONSTANTS = {
    DATA: {
        GENDER: {
            0: L('female'),
            1: L('male'),
            2: L('other')
        },
        GENDER_ARRAY: [
            {code: 0, value: L('female')},
            {code: 1, value: L('male')},
            {code: 2, value: L('other')}
        ],
        NOTIFY_TYPE: {
            1: L('promotion'),
            2: L('new_product'),
            3: L('transaction')
        },
        CONDITION: {
            0: L('not_specified'),
            1: L('new_label'),
            2: L('used')
        },
        ORIGIN: {
            0: L('not_specified'),
            1: L('genuine'),
            2: L('imported')
        }
    },
    DEFAULT: {
        USER_PHOTO: '/images/user.png'
    }
};

module.exports = CONSTANTS;