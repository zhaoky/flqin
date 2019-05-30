import 'normalize.css';
import './index.less';
import res from './data';
import { MVVM } from '@fe_korey/mvvm';
import { Fullpage } from '@fe_korey/fullpage';

const model = {
  selectedLang: 0,
  isShowNav: false,
  pageIndex: 0
};

const data = {
  view: document.getElementById('app'),
  model: { ...res.cn, ...model },
  methods: {
    titleHandler(e, index) {
      data.model.isShowNav = !data.model.isShowNav;
    },
    directToPage(index) {
      console.log(index);
      data.model.pageIndex = index;
      fp.directToPage(index);
    },
    switchLang(index) {
      data.model.selectedLang = index;
      if (index === 1) {
        data.model = { ...model, ...res.en };
      } else {
        data.model = { ...model, ...res.cn };
      }
    }
  }
};

new MVVM(data);

const fp = new Fullpage({
  root: '#fullpage',
  hasArrow: true,
  speedTime: 0.5,
  slideCallback(index) {
    data.model.pageIndex = index;
  }
});
