import 'normalize.css';
import './index.less';
import './media.less';
import res from './data';
import { MVVM } from '@fe_korey/mvvm';
import { Fullpage } from '@fe_korey/fullpage';

const model = {
  selectedLang: 0,
  isShowNav: false,
  isPc: false,
  isEng: false,
  pageIndex: 0,
  expCur: {},
  selectExpIndex: 0,
  workIndex: 0
};
let fp;
const data = {
  view: document.getElementById('app'),
  model: { ...res.cn, ...model },
  methods: {
    titleHandler() {
      data.model.isShowNav = !data.model.isShowNav;
    },
    directToPage(index) {
      data.model.pageIndex = index;
      fp.directToPage(index);
      data.model.isShowNav = false;
    },
    switchLang(index) {
      data.model.selectedLang = index;
      data.model.isEng = index === 1;
      const dataNames = ['header', 'footer', 'overview', 'skill', 'exp', 'works', 'contact'];
      const language = index === 1 ? 'en' : 'cn';
      dataNames.forEach(i => {
        data.model[i] = res[language][i];
      });
      data.model.expCur = res[language].exp.expList[data.model.selectExpIndex];
      data.model.workIndex = 0;
      setWorkDraw();
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
        const language = !!data.model.isEng ? 'en' : 'cn';
        data.model.expCur = res[language].exp.expList[index];
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
    appInit();
    setWorkDraw();
    createFullpage();
    if (isPC()) {
      data.model.isPc = true;
      setExpTouch3D();
      consoleTip();
    }
  }
};
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
/**
 * appInit
 *
 */
function appInit() {
  const appDom = document.getElementById('app');
  appDom.style.display = 'block';
  data.model.expCur = res.cn.exp.expList[0];
}
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
    const bannerWidth = expDom.offsetWidth;
    const bannerHeight = expDom.offsetHeight;
    const offsetLeft = expDom.offsetLeft;
    const offsetTop = contentDom.offsetTop;
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
}
/**
 * createFullpage
 *
 */
function createFullpage() {
  fp = new Fullpage({
    root: '#fullpage',
    hasArrow: true,
    speedTime: 0.5,
    slideCallback(index) {
      data.model.pageIndex = index;
    }
  });
}
/**
 * consoleTip
 *
 */
function consoleTip() {
  console.log('Hi! 朋友，感谢您愿意调试简历代码。');
  console.log('本简历采用%c简易版MVVM (https://www.npmjs.com/package/@fe_korey/mvvm )及Fullpage (https://www.npmjs.com/package/@fe_korey/fullpage )，webpack开发构建。', 'color:red');
  console.log('源码已开源在（https://github.com/zhaoky/flqin )，任何问题请提issue,喜欢请点个star吧！');
  console.log('如果您有什么建议或者想学习前端，欢迎您加入我们,我们互相学习，共同进步^_^  %cQQ小群(http://t.cn/RtlQbTq)', 'color:red');
}

new MVVM(data);
