'use strict';

require('./components/photoswipefromdom')

let PhotoSwipeUI_Default = require('./helpers/photoswipe-ui-default'),
    items = [{
            src: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_b.jpg',
            thumb: 'https://farm2.staticflickr.com/1043/5186867718_06b2e9e551_m.jpg',
            w: 1024,
            h: 1024
        },
        {
            src: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_b.jpg',
            thumb: 'https://farm7.staticflickr.com/6175/6176698785_7dee72237e_m.jpg',
            w: 1024,
            h: 1024
        }
    ],
    options = {
        showHideOpacity: true,
        history: true,
        focus: true,
        bgOpacity: .2,
        captionEl: true,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        counterEl: false,
        arrowEl: true,
        preloaderEl: true,
    };

$(window).on('load', () => {
    $('#gallery').PhotoSwipeFromDOM(PhotoSwipeUI_Default, {
        items,
        options
    });
    items = {},
        options = {};
    $('#gallery2').PhotoSwipeFromDOM(PhotoSwipeUI_Default, {});
});