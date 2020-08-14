import 'normalize.css';
import './../less/index.less';
import './../less/media.less';
import { Fullpage } from '@fe_korey/fullpage';
import { hasClass, addClass, toggleClass, removeClass, isMobile, clickHandler } from './utils.js';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

/**
 * 设置 Header
 * @param  {Number}   index
 */
function setHeader(index) {
  const title = $('.header .title-content');
  const nav = $('.header .nav');
  const navList = $$('.header li');
  const curNavItemDom = $$('.header .nav-item')[index];
  removeClass(navList[+title.dataset.pageIndex], '-cur-index');
  addClass(navList[index], '-cur-index');
  title.style.display = index === 0 && !isMobile ? 'none' : 'block';
  title.textContent = curNavItemDom.querySelector('.-title').textContent;
  title.dataset.pageIndex = index;
  removeClass(title, '-rotate');
  removeClass(nav, 'show-nav');
}
/**
 * 初始化 Header
 */
function initHeader() {
  setHeader(0);
  const title = $('.header .title-content');
  const nav = $('.header .nav');
  clickHandler(title, () => {
    if (!isMobile) {
      return;
    }
    toggleClass(title, '-rotate');
    toggleClass(nav, 'show-nav');
  });
  clickHandler(nav, (e) => {
    if (e.target.nodeName !== 'SPAN') {
      return;
    }
    if (hasClass(e.target.parentElement, '-cur-index')) {
      return;
    }
    const index = +e.target.parentElement.dataset.index;
    setHeader(index);
    fp.directToPage(index);
  });
}
/**
 * 初始化 Exp
 */
function initExp() {
  const expSlider = $$('.experience .slider-container');
  const expUl = $('.experience .shout-cut ul');
  let expSliderIndex = 0;

  expSlider[1].style.display = expSlider[2].style.display = 'none';

  addClass(expUl.children[0], '-selected');

  clickHandler(expUl, (e) => {
    if (e.target.nodeName !== 'LI') {
      return;
    }
    if (hasClass(e.target, '-selected')) {
      return;
    }
    const index = +e.target.dataset.index;
    expSlider[expSliderIndex].style.opacity = '0';
    expSlider[expSliderIndex].addEventListener('webkitTransitionEnd', () => {
      expSlider[expSliderIndex].style.display = 'none';
      expSlider[expSliderIndex].style.opacity = '1';
      expSlider[index].style.display = 'block';
      removeClass(expUl.children[expSliderIndex], '-selected');
      addClass(expUl.children[index], '-selected');
      expSliderIndex = index;
    });
  });
}
/**
 * 初始化 Work
 */
function initWork() {
  let curIndex = 0;
  const children = $('.work-list').children;
  const workSwitch = $('.work .switch');
  const left = $('.work .left');
  const right = $('.work .right');

  const setWorkStyle = (index) => {
    left.style.filter = index === 0 ? 'brightness(70%)' : '';
    right.style.filter = index === children.length - 1 ? 'brightness(70%)' : '';
    for (let i = index; i < children.length; i++) {
      children[i].style.transform = `translateX(${0.8 * (i - index)}rem) translateZ(${-1.5 * (i - index)}rem) scale(${1 - (i - index) * 0.05}, ${1 - (i - index) * 0.05})`;
    }
  };

  clickHandler(workSwitch, (e) => {
    if (e.target.nodeName !== 'I') {
      return;
    }
    if (e.target.className === 'left' && curIndex !== 0) {
      --curIndex;
    } else if (e.target.className === 'right' && curIndex !== children.length - 1) {
      ++curIndex;
      children[curIndex - 1].style.transform = `translateX(-19rem)`;
    }
    setWorkStyle(curIndex);
  });
  setWorkStyle(curIndex);
}

const fp = new Fullpage({
  root: '#fullpage',
  hasArrow: true,
  speedTime: 0.5,
  slideCallback(index) {
    setHeader(index);
  }
});

window.onload = () => {
  initHeader();
  initExp();
  initWork();
  $('#app').style.display = 'block';
};
