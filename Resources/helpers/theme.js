var platformWidth = Ti.Platform.displayCaps.platformWidth,
    platformHeight = Ti.Platform.displayCaps.platformHeight,
    dpi = Ti.Platform.displayCaps.dpi;

module.exports = {
    platformHeight: platformHeight,
    platformWidth:platformWidth,
    dpi: dpi,
    styles: {
        stretch: {
            top:0,bottom:0,left:0,right:0
        },
        Window: {
            navBarHidden:true,
            softInputMode:(Ti.UI.Android) ? Ti.UI.Android.SOFT_INPUT_ADJUST_RESIZE : ''
        },
        hasChildrenRow: {
            rightImage: '/images/arrow_right.png',
            height: 90
        },
        header: {
            view: {
                top: 0,
                left: 0,
                right: 0,
                height: 90,
                backgroundColor: '#4086FF'
            },
            label: {
                color: '#fff',
                font: {fontSize: '20dp', fontWeight: 'bold'}
            }
        },
        popup: {
            header: {
                view: {
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 90,
                    backgroundColor: '#000'
                },
                label: {
                    left: 10,
                    color: '#fff',
                    font: {fontSize: '20dp'}
                }
            }
        },
        textfield: {
            borderRadius: 5,
            height: 90,
            left: 10,
            right: 10
        }
    },
    animation: {}
};