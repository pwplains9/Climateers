// не трогать этот импорт, он нужен для работы css
// можно добавить несколько файлов, они будут работать независимо друг от друга
import '@styles/vendor.scss';
import '@styles/main.scss';

import '@scripts/utils/helpers';
import '@scripts/modules/social';
import actualYear from '@scripts/modules/actualYear';
import vhFix from '@scripts/vendor/vh-fix';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';
import gsap from 'gsap';
import {Draggable} from 'gsap/Draggable';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import scroller from "../components/scroller/scroller";
import helpers from "./utils/helpers";
import router from "../components/router/router";
import header from "../components/header/header";
import './vendor/jquery.validate.min'
import lazyLoading from "./modules/lazyLoading";

gsap.registerPlugin(Draggable, ScrollTrigger);

window.LocomotiveScroll = LocomotiveScroll;
window._debounce = debounce;
window._throttle = throttle;
window.gsap = gsap;
window.Draggable = Draggable;
window.ScrollTrigger = ScrollTrigger;
let resizeWidth = null;
let isLoaded = false;

const resize = () => {
    if (helpers.isDevices() && resizeWidth && resizeWidth === innerWidth) {
        return;
    }

    vhFix.resize();

    if (isLoaded) {
        const lastPosition = scroller.getPosition();

        document.body.classList.add('is-resizing');

        scroller.setPosition(0, {
            callback() {
                setTimeout(() => {
                    scroller.setPosition(lastPosition, {
                        callback() {
                            document.body.classList.remove('is-resizing');
                        },
                    });
                }, 100);
            },
        });
    }

    resizeWidth = innerWidth;
};

const init = () => {
    actualYear.init();
    vhFix.init();

    header.init();


    let index = $('.intro')

    let title = index.find('.title-1');
    let $header = $('.header');
    let title2 = index.find('.title-2');
    let text = index.find('.text');
    let hero = index.find('.intro-right');
    let arrow = index.find('.intro-arrow');
    let time = 0.3;

    gsap.timeline().from(title, time, {
        autoAlpha: 0,
        x: -50,

        onStart: () => {
            title.removeClass('is-hide')
        }

    }).from(title2, time, {
        autoAlpha: 0,
        x: -50,
        onStart: () => {
            title2.removeClass('is-hide')
        }

    }).from(text, time, {
        autoAlpha: 0,
        x: -50,
        onStart: () => {
            text.removeClass('is-hide')
        }

    }).from(hero, time, {
        autoAlpha: 0,
        x: 50,
        onStart: () => {
            hero.removeClass('is-hide')
        }

    }).from([arrow, $header], time, {
        autoAlpha: 0,
        x: -50,
        onStart: () => {
            title.removeClass('is-hide')
        }

    })



    setTimeout(() => {
        scroller.init()
        lazyLoading.init();

        // let block = $('.section');
        //
        // block.each((index, item) => {
        //     let shadow = $(item).find('.insert');
        //     let image = $(item).find('.insert-image img')
        //     let text = $(item).find('.insert-text')
        //
        //     let tl = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: $(`[data-section='${index}']`),
        //             scroller: scroller.getElement(),
        //             start: "40% 0",
        //             scrub: 1,
        //             onEnter: () => {
        //                 console.log('emter')
        //             }
        //         }
        //     });
        //
        //     tl.from(shadow, {
        //         x: -50,
        //         autoAlpha: 0,
        //     }).from(image, {
        //         x: -50,
        //         autoAlpha: 0,
        //     }).from(text, {
        //         x: -50,
        //         autoAlpha: 0,
        //     })
        // })


    }, 1000)

    resizeWidth = innerWidth;

    window.addEventListener('resize', _debounce(resize, 500));
};

init();


