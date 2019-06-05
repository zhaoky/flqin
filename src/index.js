import 'normalize.css';
import './index.less';
import './media.less';
import res from './data';
import { MVVM } from '@fe_korey/mvvm';
import { Fullpage } from '@fe_korey/fullpage';

/**
 * 判断是否为PC
 *
 * @return {Boolean}
 */
function isPC() {
  const u = navigator.userAgent;
  const Agents = ['Android', 'iPhone', 'webOS', 'BlackBerry', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
  let flag = true;
  for (let i = 0; i < Agents.length; i++) {
    if (u.indexOf(Agents[i]) > 0) {
      flag = false;
      break;
    }
  }
  return flag;
}

const model = {
  selectedLang: 0,
  isShowNav: false,
  pageIndex: 0,
  expCur: res.cn.exp.expList[0],
  selectExpIndex: 0,
  workIndex: 0
};

const data = {
  view: document.getElementById('app'),
  model: { ...res.cn, ...model },
  methods: {
    titleHandler() {
      data.model.isShowNav = !data.model.isShowNav;
    },
    directToPage(index) {
      console.log(index);
      data.model.pageIndex = index;
      fp.directToPage(index);
      data.model.isShowNav = false;
    },
    switchLang(index) {
      data.model.selectedLang = index;
      if (index === 1) {
        data.model = { ...model, ...res.en };
      } else {
        data.model = { ...model, ...res.cn };
      }
    },
    switchExp($event, index) {
      $event.stopPropagation();
      const sliderDom = document.getElementsByClassName('slider-container')[0];
      sliderDom.style.opacity = '0';
      sliderDom.addEventListener('webkitTransitionEnd', transitionEndHandler);
      /**
       * transitionEndHandler
       *
       */
      function transitionEndHandler() {
        sliderDom.style.opacity = '1';
        data.model.expCur = res.cn.exp.expList[index];
        data.model.selectExpIndex = index;
        sliderDom.removeEventListener('webkitTransitionEnd', transitionEndHandler);
      }
    },
    switchWork($event) {
      const workDom = document.getElementsByClassName('work-list')[0];
      const children = workDom.children;
      const tag = $event.target.className;
      if (tag === 'left' && data.model.workIndex !== 0) {
        --data.model.workIndex;
      } else if (tag === 'right' && data.model.workIndex !== children.length - 1) {
        ++data.model.workIndex;
        children[data.model.workIndex - 1].style.transform = `translateX(-19rem)`;
      }
      for (let i = data.model.workIndex; i < children.length; i++) {
        children[i].style.transform = `translateX(${1.5 * (i - data.model.workIndex)}rem) translateZ(${-1.5 * (i - data.model.workIndex)}rem) scale(${1 - (i - data.model.workIndex) * 0.05}, ${1 -
          (i - data.model.workIndex) * 0.05})`;
      }
    }
  },
  mounted() {
    setWorkDraw();
    if (isPC()) {
      setExpTouch3D();
    }
  }
};
/**
 * setWorkDraw
 *
 */
function setWorkDraw() {
  const workDom = document.getElementsByClassName('work-list')[0];
  const children = workDom.children;
  for (let i = 0; i < children.length; i++) {
    children[i].style.transform = `translateX(${1.5 * i}rem) translateZ(${-1.5 * i}rem) scale(${1 - i * 0.05}, ${1 - i * 0.05})`;
  }
}
/**
 * setExpTouch3D
 *
 */
function setExpTouch3D() {
  const expDom = document.getElementsByClassName('slider')[0];
  const contentDom = expDom.parentNode;
  const bannerWidth = expDom.offsetWidth;
  const bannerHeight = expDom.offsetHeight;
  let offsetLeft = expDom.offsetLeft;
  let offsetTop = contentDom.offsetTop;
  expDom.addEventListener('mousemove', throttleGenerator(expMousemoveHandler, 20));
  expDom.addEventListener('mouseout', expMouseoutHandler);

  /**
   * 节流函数
   *
   * @export
   * @param {Function} fn
   * @param {Number} time
   * @return {Function}
   */
  function throttleGenerator(fn, time) {
    let date = new Date();
    return (...args) => {
      const nowDate = new Date();
      if (nowDate - date > time) {
        fn(...args);
        date = nowDate;
      }
    };
  }
  /**
   * expMousemoveHandler
   *
   * @param {*} e
   */
  function expMousemoveHandler(e) {
    const pageX = e.pageX;
    const pageY = e.pageY;
    const x = pageX - offsetLeft - bannerWidth / 2;
    const y = -(pageY - offsetTop - bannerHeight / 2);
    expDom.style.transform = `rotateY(${x / 50}deg) rotateX(${y / 25}deg)`;
  }
  /**
   * expMouseoutHandler
   *
   */
  function expMouseoutHandler() {
    expDom.style.transform = 'rotateY(0deg) rotateX(0deg)';
  }

  window.addEventListener('resize', () => {
    offsetLeft = expDom.offsetLeft;
    offsetTop = contentDom.offsetTop;
  });
}

new MVVM(data);

const fp = new Fullpage({
  root: '#fullpage',
  hasArrow: true,
  speedTime: 0.5,
  slideCallback(index) {
    data.model.pageIndex = index;
  }
});
