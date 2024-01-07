<h2 align="center"><a href='https://korey.cc/resume' target='_blank'>✏️✏️front-end engineer resume</a></h2>
<p align="center">
  <a href='https://github.com/zhaoky/flqin'><img src='https://img.shields.io/github/last-commit/zhaoky/flqin' alt='GitHub last commit' /></a>
  <a href="https://www.npmjs.com/package/@fe_korey/resume"><img src="https://img.shields.io/npm/dm/@fe_korey/resume.svg" alt="Downloads"></a>
  <a href="https://github.com/zhaoky/flqin/actions"><img src="https://github.com/zhaoky/flqin/workflows/Action CI/badge.svg" alt="Actions Status"></a>
  <a href='https://www.npmjs.com/package/@fe_korey/resume'><img src='https://img.shields.io/npm/l/@fe_korey/resume' alt='NPM' /></a>
  <a href='https://www.npmjs.com/package/@fe_korey/resume'><img src='https://img.shields.io/npm/v/@fe_korey/resume' alt='npm (scoped)' /></a>
</p>

English | [中文](./README_CN.MD)

#### Baidu search: [web Front-end engineer resume](https://www.baidu.com/s?ie=UTF-8&wd=web%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E7%AE%80%E5%8E%86)

![web前端工程师简历截图](https://raw.githubusercontent.com/zhaoky/flqin/master/src/assets/web.jpg)

## UPDATES

flqin.com was moved to [korey.cc](https://korey.cc) and resume items were moved to [korey.cc/resume](https://korey.cc/resume).

## MISC

Many friends email me to learn how to make such a resume. In fact, you only need to fork the project, just follow README and try to run the project!

This project contains the technology stack:

- `html`
- `es6`
- `less`
- `eslint/stylelint/prettier`
- `webpack/babel/postcss`
- `husky/actions/lint-staged`

Small but complete. It is an introductory FE project with a complete functional structure that is worth learning for beginners.

In order to 'SEO' and beginner learning, a [pure static page](https://korey.cc/resume) and [a Chinese-English page](https://korey.cc/resume/mvvm) based on [MVVM](https://github.com/zhaoky/mvvm) developed by ourselves.

Please [click here](https://github.com/zhaoky/flqin/issues) if you have any questions or suggestions.Learn from each other and make progress together!

Please click star if you like, thank you! 💕💕

## Start

1. clone

```bash
git clone https://github.com/zhaoky/flqin.git
```

2. change directory

```bash
cd flqin
```

3. install dependencies

```bash
yarn
```

4. serve with hot reload

```bash
yarn run dev:seo // seo page
yarn run dev // mvvm page
```

Debug address： `http://0.0.0.0:8080/`

5. build for production with minification

```bash
yarn run build:seo // seo page
yarn run build // mvvm page
```

6. build for production with analyze

```bash
yarn run analyze:seo // seo page
yarn run analyze // mvvm page
```

7. check code and fix

```bash
yarn run lint // lint
yarn run fix // fix
```

## Technical support

### [@korey/MVVM](https://github.com/zhaoky/mvvm)

Because the MVVM framework is numerous and constantly updated, For the purpose of learning, and finally chose to implement an MVVM framework to serve this project, currently implements data-binding and view-refresh functionality, is constantly optimizing and updating.

### [@korey/Fullpage](https://github.com/zhaoky/fullpage)

A simple Fullpage framework, which currently implements full-screen page-turning with pull-up, scrolling, and anchor-pointing, is still being optimized and updated.

## License

[MIT](./LICENSE)
