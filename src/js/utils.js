/**
 * 获取节点属性值
 * @param   {HTMLElement}  node
 * @param   {String}   name
 * @return  {String}
 */
export function getAttr(node, name) {
  return node.getAttribute(name) || '';
}
/**
 * 设置节点属性
 * @param  {HTMLElement}  node
 * @param  {String}   name
 * @param  {any}   value
 */
export function setAttr(node, name, value) {
  // 设为 null/undefined 和 false 移除该属性
  if (value == null || value === false) {
    removeAttr(node, name);
    return;
  }

  if (value === true) {
    node[name] = value;

    // 有些浏览器/情况下用 node[name] = true 是无法添加自定义属性的，此时设置一个空字符串
    if (!hasAttr(node, name)) {
      node.setAttribute(name, '');
    }
  } else if (value !== getAttr(node, name)) {
    node.setAttribute(name, value);
  }
}
/**
 * 删除节点属性值
 *
 * @param {HTMLElement} node
 * @param {String} name
 */
export function removeAttr(node, name) {
  node.removeAttribute(name);
}
/**
 * 节点是否存在 classname
 * @param   {HTMLElement}  node
 * @param   {String}   classname
 * @return  {Boolean}
 */
export function hasClass(node, classname) {
  let current;
  const list = node.classList;
  if (list) {
    return list.contains(classname);
  } else {
    current = ' ' + getAttr(node, 'class') + ' ';
    return current.indexOf(' ' + classname + ' ') > -1;
  }
}
/**
 * 节点添加 classname
 * @param  {HTMLElement}  node
 * @param  {String}   classname
 */
export function addClass(node, classname) {
  let current;
  const list = node.classList;

  if (!classname || hasClass(node, classname)) {
    return;
  }

  if (list) {
    list.add(classname);
  } else {
    current = ' ' + getAttr(node, 'class') + ' ';

    if (current.indexOf(' ' + classname + ' ') === -1) {
      setAttr(node, 'class', (current + classname).trim());
    }
  }
}
/**
 * 节点删除 classname
 * @param  {HTMLElement}  node
 * @param  {String}   classname
 */
export function removeClass(node, classname) {
  let current;
  let target;
  const list = node.classList;
  if (!classname || !hasClass(node, classname)) {
    return;
  }
  if (list) {
    list.remove(classname);
  } else {
    target = ' ' + classname + ' ';
    current = ' ' + getAttr(node, 'class') + ' ';

    while (current.indexOf(target) > -1) {
      current = current.replace(target, ' ');
    }

    setAttr(node, 'class', current.trim());
  }
  if (!node.className) {
    removeAttr(node, 'class');
  }
}

/**
 * 节点切换 classname
 * @param  {HTMLElement}  node
 * @param  {String}   classname
 */
export function toggleClass(node, classname) {
  if (hasClass(node, classname)) {
    removeClass(node, classname);
  } else {
    addClass(node, classname);
  }
}

/**
 * 判断是否是移动端
 */
export const isMobile = (() => {
  const width = Math.min(screen.width, document.documentElement.getBoundingClientRect().width);
  return width < 600;
})();

/**
 * 点击事件处理
 * @param  {HTMLElement}  node
 * @param  {Function}   fn
 */
export function clickHandler(node, fn) {
  node.addEventListener(isMobile ? 'touchstart' : 'click', (e) => {
    fn(e);
  });
}
