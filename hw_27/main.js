const SLIDER_WIDTH = 900;
const PLAY_TIMEOUT_SEC = 3;
const SWIPE_THRESHOLD = 80;

const imageList = ["img/image1.jpg", "img/image2.jpg", "img/image3.jpg", "img/image4.jpg"]


const slider = document.querySelector('.slider');
const leftArrow = document.querySelector('.slider-nav.slider-left');
const rightArrow = document.querySelector('.slider-nav.slider-right');
const sliderLine = document.querySelector('.slider-line');
const dotsContainer = document.querySelector('.slider-dots');


let currentSlide = 0;
let intervalTimer;
let dots = [];

let startX = 0;
let currentTranslate = 0;
let isSwiping = false;

init();


function init() {
  createImages();
  createDots();
  setActiveDot(0);

  initEvents();
}

function initEvents() {
  leftArrow.addEventListener('click', leftClickHandler);
  rightArrow.addEventListener('click', rightClickHandler);

  document.body.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      leftClickHandler()
    } else if (event.key === 'ArrowRight') {
      rightClickHandler()
    }
  })

  intervalTimer = setInterval(rightClickHandler, PLAY_TIMEOUT_SEC * 1000);
  document.getElementById('playButton').addEventListener('click', playHandler)
  document.getElementById('pauseButton').addEventListener('click', pauseHandler)

  sliderLine.addEventListener('touchstart', touchStartHandler, { passive: true });
  sliderLine.addEventListener('touchmove', touchMoveHandler, { passive: true });
  sliderLine.addEventListener('touchend', touchEndHandler);
}

function createImages() {
  let generatedHtml = '';
  imageList.forEach(imgStr => {
    generatedHtml = generatedHtml + `<img src="${imgStr}" alt="${imgStr}">`
  })

  generatedHtml = generatedHtml + `<img src="${imageList[0]}" alt="${imageList[0]}">`
  sliderLine.innerHTML = generatedHtml;
}

function createDots() {
  dotsContainer.innerHTML = '';
  dots = [];

  imageList.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    dot.addEventListener('click', () => {
      currentSlide = index;
      moveToSlide(currentSlide);
      setActiveDot(index);
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });
}


function leftClickHandler() {
  currentSlide = currentSlide - 1;
  if (currentSlide < 0) {
    currentSlide = imageList.length;
    silentlyMoveToSlide(currentSlide);
    currentSlide = imageList.length - 1;
  }

  moveToSlide(currentSlide);
}

function rightClickHandler() {
  currentSlide = currentSlide + 1;
  if (currentSlide >= imageList.length) {
    moveToSlide(currentSlide);

    setTimeout(() => {
      currentSlide = 0;
      silentlyMoveToSlide(currentSlide)
    }, 500);
  } else {
    moveToSlide(currentSlide);
  }

}

function pauseHandler() {
  if (intervalTimer) {
    clearInterval(intervalTimer);
    intervalTimer = null;
  }
}

function playHandler() {
  if (!intervalTimer) {
    intervalTimer = setInterval(rightClickHandler, PLAY_TIMEOUT_SEC * 1000);
  }
}

function touchStartHandler(event) {
  startX = event.touches[0].clientX;
  isSwiping = true;
  pauseHandler();

  sliderLine.classList.remove('slow-switch');
  currentTranslate = -currentSlide * SLIDER_WIDTH;
}

function touchMoveHandler(e) {
  if (!isSwiping) {
    return;
  }

  const currentX = e.touches[0].clientX;
  const diff = currentX - startX;

  sliderLine.style.transform =
    `translateX(${this.currentTranslate + diff}px)`;
}

function touchEndHandler(e) {
  if (!this.isSwiping) {
    return;
  }

  this.isSwiping = false;
  this.sliderLine.classList.add('slow-switch');

  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (Math.abs(diff) > SWIPE_THRESHOLD) {
    if (diff < 0) {
      this.rightClickHandler();
    } else {
      this.leftClickHandler();
    }
  } else {
    this.moveToSlide(currentSlide);
  }
}


function moveToSlide(slide) {
  this.sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
  setActiveDot(slide % imageList.length);
}

function silentlyMoveToSlide(slide) {
  sliderLine.classList.remove('slow-switch');
  sliderLine.style.transform = `translate(${slide * -SLIDER_WIDTH}px)`;
  sliderLine.offsetHeight;
  sliderLine.classList.add('slow-switch');
}


function setActiveDot(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}