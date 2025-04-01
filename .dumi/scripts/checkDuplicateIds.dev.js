/**
 * ** 通常来说只会在开发环境下才会看到这个脚本 **
 * 检查页面中的重复 id, 正常情况下，页面中的 id 应该是唯一的
 * __DUMI_DUPLICATE_IDS__.ids 为页面中有效的 id 集合
 * __DUMI_DUPLICATE_IDS__.once() 检查一次
 * or
 * url 中添加 `debug=skip-dumi-ids` 参数可跳过控制台烦人的提示。
 */
(() => {
  globalThis.__DUMI_DUPLICATE_IDS__ ??= {};

  const RE = /^[A-Z]+[\w\-:.]*$/i;
  const prefix = '[dumi/scripts/checkDuplicateIds] ';

  function main(p = prefix) {
    const validIds = new Map();
    const els = document.querySelectorAll('body *[id]');

    Array.from(els).forEach((el) => {
      const elID = el.id;

      if (validIds.has(elID)) {
        console.log(`${p}%cDuplicate id: \`${elID}\``, 'color: red;font-size: 12px;', el);
      } else if (!RE.test(elID)) {
        console.log(`${p}%cInvalid id: \`${elID}\``, 'color: red;font-size: 12px;', el);
      } else if (elID.length > 32 && !elID.includes('-demo-') /** demo 的 id 不管 */) {
        // 请参考 https://github.com/ant-design/ant-design/pull/53316 进行修改
        console.log(`${p}%cToo long id: \`${elID}\``, 'color: yellow;font-size: 12px;', el);
      } else {
        validIds.set(elID, el);
      }
    });

    globalThis.__DUMI_DUPLICATE_IDS__.ids = validIds;
  }

  let _timer = null;
  const ob = new MutationObserver(() => {
    if (_timer) clearTimeout(_timer);
    _timer = setTimeout(main, 1000);
  });

  const stop = () => ob.disconnect();

  const start = () => {
    stop();
    ob.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  };

  Object.assign(globalThis.__DUMI_DUPLICATE_IDS__, {
    start,
    stop,
    once: () => main(''),
  });

  const url = new URL(location.href);
  const isDisable =
    url.searchParams.has('debug') && url.searchParams.get('debug').includes('skip-dumi-ids');

  !isDisable && start();
})();
