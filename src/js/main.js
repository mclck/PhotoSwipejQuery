'use strict';

require('./components/photoswipefromdom')

let items = [{
        src: 'https://t4.ftcdn.net/jpg/01/78/23/95/500_F_178239568_7U2hZQu1RkdKnzChuhdEsMeXmuYBKKNI.jpg',
        thumb: 'https://t4.ftcdn.net/jpg/01/78/23/95/500_F_178239568_7U2hZQu1RkdKnzChuhdEsMeXmuYBKKNI.jpg',
        w: 500,
        h: 500
    }],
    options = {
        history: true,
        focus: true,
        bgOpacity: .2,
        fullscreenEl: false,
        zoomEl: false,
        shareEl: false,
        counterEl: false,
        arrowEl: true,
        showHideOpacity: true,
        barsSize: {
            top: 10,
            bottom: 120
        }
    };

$(window).on('load', () => {
    $('#gallery').PhotoSwipeFromDOM({
        items,
        options
    });
    items = {},
        options = {};
    $('#gallery2').PhotoSwipeFromDOM({});
});