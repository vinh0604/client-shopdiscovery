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
        CONDITION_ARRAY: [
            {code: 0, value: L('not_specified')},
            {code: 1, value: L('new_label')},
            {code: 2, value: L('used')}
        ],
        ORIGIN_ARRAY: [
            {code: 0, value: L('not_specified')},
            {code: 1, value: L('genuine')},
            {code: 2, value: L('imported')}
        ],
        SORT_TYPE_ARRAY: [
            {code: 1, value: L('relevance')},
            {code: 2, value: L('price_low_sort')},
            {code: 3, value: L('price_high_sort')},
            {code: 4, value: L('distance_sort')},
            {code: 5, value: L('review_sort')}
        ],
        NOTIFICATION_ARRAY: [
            {code: 1, value: L('promotion')},
            {code: 2, value: L('new_product')},
            {code: 3, value: ''},
            {code: 4, value: ''},
            {code: 5, value: ''}
        ],
        DELIVERY_ARRAY: [
            {code: 1, value: L('deliver_shop')},
            {code: 2, value: L('deliver_home')}
        ],
        NOTIFICATION_TYPE: {
            PROMOTION: 1,
            NEW_PRODUCT: 2,
            PRICE_CHANGE: 3,
            ORDER_CANCEL: 4,
            ORDER_CONFIRM: 5
        },
        NOTIFY_TYPE: {
            1: L('promotion'),
            2: L('new_product'),
            3: L('transaction')
        },
        ORDER_STATUS: {
            NEW: 1,
            WAITED: 2,
            CONFIRMED: 3,
            FINISHED: 4,
            CANCELED: 5
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
        USER_PHOTO: '/images/user.png',
        SHOP_PHOTO: '/images/shop.png',
        NO_PHOTO: '/images/no_image.jpg'
    },
    TYPE: {
        SHOP: 'shop',
        SHOP_PRODUCT: 'shop_product'
    }
};

module.exports = CONSTANTS;