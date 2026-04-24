const SLIDER_WIDTH = 900;
const PLAY_TIMEOUT_SEC = 3;
const SWIPE_THRESHOLD = 80;

export class CoolSlider {
    imageList = [];

    currentSlide = 0;
    intervalTimer = null;
    dots = [];

    startX = 0;
    currentTranslate = 0;
    isSwiping = false;

    constructor(imageList) {
        if (!Array.isArray(imageList) || imageList.length === 0) {
            throw new Error("CoolSLider imageList must be an array");
            
        }
        this.imageList = imageList;
        this.getElementsFromPage();

        this.init();
    }

    init() {
        this.createImagesElements();
        this.createDots();
        this.setActiveDot(0);

        this.initEvents();
    }

    initEvents() {
        this.leftArrow.addEventListener('click', this.leftClickHandler);
        this.rightArrow.addEventListener('click', this.rightClickHandler);

        document.body.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft') {
            this.leftClickHandler()
            } else if (event.key === 'ArrowRight') {
            this.rightClickHandler()
            }
        })

        this.intervalTimer = setInterval(rightClickHandler, PLAY_TIMEOUT_SEC * 1000);
        document.getElementById('playButton').addEventListener('click', playHandler)
        document.getElementById('pauseButton').addEventListener('click', pauseHandler)

        this.sliderLine.addEventListener('touchstart', touchStartHandler, { passive: true });
        this.sliderLine.addEventListener('touchmove', touchMoveHandler, { passive: true });
        this.sliderLine.addEventListener('touchend', touchEndHandler);
    }

    getElementsFromPage() {
        this.slider = document.querySelector('.slider');
        this.leftArrow = document.querySelector('.slider-nav.slider-left');
        this.rightArrow = document.querySelector('.slider-nav.slider-right');
        this.sliderLine = document.querySelector('.slider-line');
        this.dotsContainer = document.querySelector('.slider-dots');
    }

    createImagesElements() {
        let generatedHtml = '';
        this.imageList.forEach(imgStr => {
            generatedHtml = generatedHtml + `<img src="${imgStr}" alt="${imgStr}">`;
        })

        generatedHtml = generatedHtml + `<img src="${this.imageList[0]}" alt="${this.imageList[0]}">`;
        this.sliderLine.innerHTML = generatedHtml;
    }

    createDots() {
        this.dotsContainer.innerHTML = '';
        this.dots = [];

        this.imageList.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            dot.addEventListener('click', () => {
                this.currentSlide = index;
                this.moveToSlide(this.currentSlide);
                this.setActiveDot(index);
            });
            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    setActiveDot(index) {
        this.dots.forEach(dot => dot.classList.remove('active'));
        this.dots[index].classList.add('active');
    }

    touchStartHandler(event) {
        this.startX = event.touches[0].clientX;
        this.isSwiping = true;
        this.pauseHandler();

        this.sliderLine.classList.remove('slow-switch');
        this.currentTranslate = -this.currentSlide * SLIDER_WIDTH;
    }

    touchMoveHandler(e) {
        if (!this.isSwiping) {
            return;
        }

        const currentX = e.touches[0].clientX;
        const diff = currentX - this.startX;

        this.sliderLine.style.transform =
            `translateX(${currentTranslate + diff}px)`;
    }

    touchEndHandler(e) {
        if (!this.isSwiping) {
            return;
        }

        this.isSwiping = false;
        this.sliderLine.classList.add('slow-switch');

        const endX = e.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > SWIPE_THRESHOLD) {
            if (diff < 0) {
            rightClickHandler();
            } else {
            leftClickHandler();
            }
        } else {
            this.moveToSlide(this.currentSlide);
        }
    }

    moveToSlide(slide) {
        this.sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
        this.setActiveDot(slide % imageList.length);
    }

    silentlyMoveToSlide(slide) {
        this.sliderLine.classList.remove('slow-switch');
        this.sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
        this.sliderLine.offsetHeight;
        this.sliderLine.classList.add('slow-switch');
    }
}