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

  expSlider[1].style.visibility = expSlider[2].style.visibility = 'hidden';

  addClass(expUl.children[0], '-selected');

  clickHandler(expUl, (e) => {
    if (e.target.nodeName !== 'LI') {
      return;
    }
    if (hasClass(e.target, '-selected')) {
      return;
    }
    if (hasClass(expSlider[0], '-active')) {
      return;
    }
    expSlider.forEach((item) => {
      addClass(item, '-active');
    });
    setTimeout(() => {
      const index = +e.target.dataset.index;
      expSlider[expSliderIndex].style.visibility = 'hidden';
      expSlider[index].style.visibility = 'visible';
      setTimeout(() => {
        removeClass(expUl.children[expSliderIndex], '-selected');
        addClass(expUl.children[index], '-selected');
        expSlider.forEach((item) => {
          removeClass(item, '-active');
        });
        expSliderIndex = index;
      }, 200);
    }, 200);
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
      children[curIndex - 1].style.transform = `translateX(-8.1rem)`;
    }
    setWorkStyle(curIndex);
  });
  setWorkStyle(curIndex);
}
/**
 * consoleTip
 */
function consoleTip() {
  console.info('·Hi! 朋友，感谢您愿意调试简历代码。');
  console.info('·本简历采用%c原生JS，Fullpage(https://github.com/zhaoky/fullpage )，webpack开发构建。', 'color:red');
  console.info('·如果您对MVVM感兴趣，请查看%c本简历(https://flqin.com/spa )的mvvm版。 采用（https://github.com/zhaoky/mvvm ）实现。', 'color:red');
  console.info('·本源码及其mvvm版已开源在(https://github.com/zhaoky/flqin )，欢迎交流探讨。任何问题请提issue，%c喜欢的话请点个star吧！^_^', 'color:#da3c8c');
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
  consoleTip();
  $('#app').style.display = 'block';
  setTimeout(() => {
    removeClass($('.overview'), 'float');
  }, 0);
};
