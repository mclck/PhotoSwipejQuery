'use strict';

let PhotoSwipe = require('./photoswipe');
let PhotoSwipeTemplate = require('./photoswipetemplate');
let PhotoSwipeUI = require('../helpers/photoswipe-ui-default')

const PhotoSwipeFromDOM = (($) => {
    const NAME = 'PhotoSwipeFromDOM';
    const DATA_KEY = 'pswp';
    const JQUERY_NO_CONFLICT = $.fn[NAME];
    const ROOT_CONTAINER = $('body');

    class PhotoSwipeFromDOM extends PhotoSwipe {
        constructor(PhotoSwipeElement, PhotoSwipeUI_Default, items, options) {
            super(PhotoSwipeElement, PhotoSwipeUI_Default, items, options);
        }

        makeThumbNails() {
            this._thumbsContainer = $(this.template).find('.pswp__thumbs');
            $.each(this.items, (index, item) => {
                !item.index && (item.index = index);
                let $thumb = $(
                    `<a href="javascript:void(0)" class="pswp__thumb" data-pswp-thumb-index="${index}">
                        <img src="${item.thumb}"/>
                    </a>`
                );
                $thumb.on('click', (event) => {
                    event.stopPropagation();
                    event.preventDefault();
                    this.goTo(+event.currentTarget.dataset.pswpThumbIndex);
                });
                this._thumbsContainer.append($thumb);
                $thumb.addClass('is-active').hide().fadeIn();
                this.listen('close', () => {
                    $thumb.fadeOut(() => {
                        $thumb.remove();
                    });
                });
            });
        }

        static _jQueryInterface(params) {
            const $container = $(this);
            $container.each((index, element) => {
                let items = [];
                let thumbNails = $(element).find('a');
                let Template = new PhotoSwipeTemplate();
                let options = {};
                thumbNails.each((index, thumbnail) => {
                    console.log('WoWO');
                    thumbnail.dataset.pswpIndex = index;
                    let image = new Image();
                    image.onload = (event) => {
                        items.push({
                            src: thumbnail.href,
                            thumb: thumbnail.dataset.thumb.length ? thumbnail.dataset.thumb : thumbnail.href,
                            w: event.path[0].width,
                            h: event.path[0].height,
                            index: index,
                        });
                    }
                    image.src = thumbnail.href;
                });
                params.items && (items = items.concat(params.items));
                thumbNails.on('click', (event) => {
                    event.preventDefault();
                    /* let image = $(event.currentTarget).find('img');
                    image.length && (options = {
                        getThumbBoundsFn: () => {
                            let rect = image[0].getBoundingClientRect();
                            return {
                                x: rect.left,
                                y: rect.top + window.pageYOffset || document.documentElement.scrollTop,
                                w: rect.width
                            };
                        }
                    }); */
                    options = $.extend({}, options, params.options, {
                        index: +event.currentTarget.dataset.pswpIndex,
                    });
                    Template.each((index, template) => {
                        let pswp = Template.data(DATA_KEY);
                        pswp = new PhotoSwipeFromDOM(template, PhotoSwipeUI, items, options);
                        Template.data(DATA_KEY, pswp);
                        pswp.init();
                        pswp.makeThumbNails();
                    })
                });
                ROOT_CONTAINER.append(Template);
            });
        }

    }

    $.fn[NAME] = PhotoSwipeFromDOM._jQueryInterface;
    $.fn[NAME].Constructor = PhotoSwipeFromDOM;
    $.fn[NAME].noConflict = function () {
        $.fn[NAME] = JQUERY_NO_CONFLICT;
        return PhotoSwipeFromDOM._jQueryInterface;
    }

    return PhotoSwipeFromDOM;
})(jQuery);

module.exports = PhotoSwipeFromDOM;