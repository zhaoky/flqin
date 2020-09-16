<h2 align="center"><a href='https://resume.flqin.com' target='_blank'>前端工程师简历</a></h2>
<p align="center">
  <a href='https://github.com/zhaoky/flqin'><img src='https://img.shields.io/github/last-commit/zhaoky/flqin' alt='GitHub last commit' /></a>
  <a href="https://www.npmjs.com/package/@fe_korey/resume"><img src="https://img.shields.io/npm/dm/@fe_korey/resume.svg" alt="Downloads"></a>
  <a href="https://github.com/zhaoky/flqin/actions"><img src="https://github.com/zhaoky/flqin/workflows/Action CI/badge.svg" alt="Actions Status"></a>
  <a href='https://www.npmjs.com/package/@fe_korey/resume'><img src='https://img.shields.io/npm/l/@fe_korey/resume' alt='NPM' /></a>
  <a href='https://www.npmjs.com/package/@fe_korey/resume'><img src='https://img.shields.io/npm/v/@fe_korey/resume' alt='npm (scoped)' /></a>
</p>

[English](./README.MD) | 中文

#### 百度搜索: [web 前端工程师简历](https://www.baidu.com/s?ie=UTF-8&wd=web%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E7%AE%80%E5%8E%86)

![web前端工程师简历截图](https://raw.githubusercontent.com/zhaoky/flqin/master/src/assets/web.jpg)

## MISC

很多前端的朋友给我发邮件学习怎么制作这样的简历，其实你只需要将本项目 fork，试着将项目跑起来就可以了！

因 `MVVM` 框架众多且在不断更新，并出于学习的目的，最终选择自己实现一个了[MVVM 框架](https://github.com/zhaoky/mvvm)服务于本项目。

出于 `SEO` 及初学者学习的考虑，本项目分别实现一个 [纯静态页](https://resume.flqin.com) 和一个基于[MVVM](<(https://github.com/zhaoky/mvvm)>)的 [中英双版页](https://flqin.com/resume)。

有任何疑问和建议请[点击此处](https://github.com/zhaoky/flqin/issues)，互相学习，共同进步！

喜欢请点个 star 吧！💕💕

## 项目启动流程

1. 克隆本项目

```bash
git clone https://github.com/zhaoky/flqin.git
```

2. 进入项目

```bash
cd flqin
```

3. 安装依赖

```bash
yarn
```

4. 启动 开发模式，用于实时调试

```bash
yarn run dev:seo // seo 版纯静态页
yarn run dev // mvvm 中英双版页
```

调试地址： `http://0.0.0.0:8080/`

5. 启动生成模式，打包产品级代码

```bash
yarn run build:seo // seo 版纯静态页
yarn run build // mvvm 中英双版页
```

6. 启动包分析模式，可以分析包大小

```bash
yarn run analyze:seo // seo 版纯静态页
yarn run analyze // mvvm 中英双版页
```

9. 检查代码及自动修复

```bash
yarn run lint // 检查
yarn run fix // 修复
```

## 项目支持

### [@korey/MVVM](https://github.com/zhaoky/mvvm)

一个简易的 `MVVM` 框架，目前实现了 `data-binding` 和 `view-refresh` 的功能，仍在不断优化更新，欢迎学习交流。

### [@korey/Fullpage](https://github.com/zhaoky/fullpage)

一个简易的 `Fullpage` 框架，目前实现了上拉下拉，滑轮滚动，锚点直达的全屏翻页功能，仍在不断优化更新，欢迎学习交流。

## License

[MIT](./LICENSE)
