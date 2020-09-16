import 'normalize.css';
import './../less/index.less';
import './../less/media.less';
import res from './data.js';
import { hasClass, addClass, removeClass } from './utils.js';
import MVVM from '@fe_korey/mvvm';
import { Fullpage } from '@fe_korey/fullpage';

let fp;
const model = {
  isPc: false,
  isShowNav: false,
  isEng: false,
  pageIndex: 0,
  expCur: {},
  selectExpIndex: 0,
  workIndex: 0
};

new MVVM({
  view: document.getElementById('app'),
  model: { ...res.cn, ...model },
  methods: {
    titleHandler() {
      this.isShowNav = !this.isShowNav;
    },
    directToPage(index) {
      this.pageIndex = index;
      fp.directToPage(index);
      this.isShowNav = false;
    },
    switchLang(index) {
      const language = index === 1 ? 'en' : 'cn';
      this.isEng = index === 1;

      Object.keys(res.en).forEach((i) => {
        this[i] = res[language][i];
      });

      this.expCur = res[language].exp.expList[this.selectExpIndex];
      this.setWorkDraw((this.workIndex = 0));
    },
    switchExp($event, index) {
      if (hasClass($event.target, '-selected')) {
        return;
      }
      $event.stopPropagation();
      const sliderDom = document.getElementsByClassName('slider-container')[0];
      if (hasClass(sliderDom, '-active')) {
        return;
      }
      addClass(sliderDom, '-active');
      setTimeout(() => {
        const language = this.isEng ? 'en' : 'cn';
        this.expCur = res[language].exp.expList[index];
        this.selectExpIndex = index;
        setTimeout(() => {
          removeClass(sliderDom, '-active');
        }, 200);
      }, 200);
    },
    switchWork($event) {
      if ($event.target.nodeName !== 'I') {
        return;
      }

      const tag = $event.target.className;
      const workDom = document.getElementsByClassName('work-list')[0];
      const children = workDom.children;

      if (tag === 'left' && this.workIndex !== 0) {
        --this.workIndex;
      } else if (tag === 'right' && this.workIndex !== children.length - 1) {
        ++this.workIndex;
        children[this.workIndex - 1].style.transform = `translateX(-8.1rem)`;
      }
      this.setWorkDraw(this.workIndex);
    },
    setWorkDraw(index) {
      const workDom = document.getElementsByClassName('work-list')[0];
      const children = workDom.children;
      for (let i = index; i < children.length; i++) {
        children[i].style.transform = `translateX(${0.8 * (i - index)}rem) translateZ(${-1.5 * (i - index)}rem) scale(${1 - (i - index) * 0.05}, ${1 - (i - index) * 0.05})`;
      }
    }
  },
  mounted() {
    initFullpage(this);
    this.expCur = res.cn.exp.expList[0];
    this.setWorkDraw(0);

    if ((this.isPc = document.documentElement.getBoundingClientRect().width > 600)) {
      setExpTouch3D();
      consoleTip();
    }
    document.querySelector('#app').style.display = 'block';
  }
});

/**
 * 初始化 fullpage
 *
 * @param {object} scope
 */
function initFullpage(scope) {
  fp = new Fullpage({
    root: '#fullpage',
    hasArrow: true,
    speedTime: 0.5,
    slideCallback(index) {
      scope.pageIndex = index;
    }
  });
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
 * consoleTip
 *
 */
function consoleTip() {
  console.info('·Hi! 朋友，感谢您愿意调试简历代码。');
  console.info('·本简历采用 %cmini MVVM (https://www.npmjs.com/package/@fe_korey/mvvm )，Fullpage(https://github.com/zhaoky/fullpage )，webpack开发构建。', 'color:red');
  console.info('·本源码及其mvvm版已开源在(https://github.com/zhaoky/flqin )，欢迎交流探讨。任何问题请提issue，%c喜欢的话请点个star吧！^_^', 'color:#da3c8c');
}
