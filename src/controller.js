import {
    request
} from './helpers';

export default class Controller {
    /**
     * @param  {!View} view A View instance
     */
    constructor(view) {
        this.view = view;

        view.bindSlidesPrev(this.moveSlides.bind(this));
        view.bindSlidesNext(this.moveSlides.bind(this));
        view.bindSlidesDots(this.currentSlide.bind(this));
        view.bindSideSlidesPrev(this.moveSideSlides.bind(this));
        view.bindSideSlidesNext(this.moveSideSlides.bind(this));

        this.slideIndex = 0;
        this.direction = -20;
    }

    setView() {
        this.initSlide('http://home.dotol.xyz/php/test_api.php');
        this.initBanchan('http://crong.codesquad.kr:8080/woowa/best');
        this.initSideBanchan('http://crong.codesquad.kr:8080/woowa/side');
        this.view.bindPreventDefault();
    }

    async initSlide(url) {
        try {
            this.slideImgs = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.slidesEnd = this.slideImgs.length - 1;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    moveSlides(n) {
        this.view.removeCurrentDisplay(this.slideIndex);
        this.slideIndex += n;
        if (this.slideIndex > this.slidesEnd) this.slideIndex = 0;
        if (this.slideIndex < 0) this.slideIndex = this.slidesEnd;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    moveSideSlides(direction) {
        this.direction += direction;
        this.view.showSideSlides(this.direction);
    }

    currentSlide(n) {
        this.view.removeCurrentDisplay(this.slideIndex);
        this.slideIndex = n;
        this.view.showSlides(this.slideIndex, this.slideImgs[this.slideIndex]);
    }

    async initBanchan(url) {
        try {
            this.banchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.view.renderBanchan(this.banchan);
        this.view.bindFoodTab(this.banchan);
    }

    resetSideSlides(thresholdLeft, thresholdRight) {
        if (this.direction === thresholdLeft || this.direction === thresholdRight) {
            this.view.renderResetSideSlides(this.direction = -20);
        }
    }

    async initSideBanchan(url) {
        try {
            this.sideBanchan = await request(url);
        } catch (e) {
            console.error(e);
        }
        this.view.renderSideBanchan(this.sideBanchan);
        this.view.renderResetSideSlides(this.direction);
        this.view.bindSideSlides(this.resetSideSlides.bind(this, -40, 0));
    }

}