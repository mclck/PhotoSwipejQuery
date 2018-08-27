'use strict';

window.jQuery = window.$ = require('jquery');
let PhotoSwipeDefaultClass = require('photoswipe');
let PhotoSwipeTemplate = require('./photoswipetemplate');
let PhotoSwipeUI = require('../helpers/photoswipe-ui-default')

const PhotoSwipe = (($) => {

    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */

    const NAME = 'PhotoSwipe';
    const VERSION = '4.1.2';
    const DATA_KEY = 'pswp';
    const JQUERY_NO_CONFLICT = $.fn[NAME];

    class PhotoSwipe extends PhotoSwipeDefaultClass {
        constructor(PhotoSwipeElement, PhotoSwipeUI_Default, items, options) {
            super(PhotoSwipeElement, PhotoSwipeUI_Default, items, options);
        }

        static get VERSION() {
            return VERSION;
        }
        static _jQueryInterface(items = {}, options = {}) {
            return (() => {
                let data = PhotoSwipeTemplate.data(DATA_KEY)
                if (!data) {
                    $('body').append(PhotoSwipeTemplate);
                    data = new PhotoSwipe(PhotoSwipeTemplate[0], PhotoSwipeUI, items, options);
                    PhotoSwipeTemplate.data(DATA_KEY, data);
                }
            })();
        }
    }

    $.fn[NAME] = PhotoSwipe._jQueryInterface;
    $.fn[NAME].Constructor = PhotoSwipe;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return PhotoSwipe._jQueryInterface;
    }

    return PhotoSwipe;
})(jQuery);

module.exports = PhotoSwipe;