import assert from "assert";
import os from "os";
import pptr from "puppeteer";
const gotoUrl = "http://localhost:8888/";

(async () => {
  const browser = await pptr.launch({
    headless: os.platform() === "linux",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    // 不能小于 10
    slowMo: 20,
  });
  const page = await browser.newPage();
  await page.goto(gotoUrl);

  await testStateChange(page);
  await testIgnore(page);
  await testLate(page);

  await page.click(".to-about-page-btn");
  await testAboutState(page);

  await page.goBack();
  await page.click(".to-about-page-btn");

  await testAboutStateCache(page);

  await page.goBack();
  await page.click(".to-about-page-btn");

  await testAboutStateCache2(page);

  await page.goBack();
  await page.click(".to-todos-page-btn");

  await testAddTodo(page);

  await page.goBack();
  await page.click(".to-todos-page-btn");

  await testDelTodos(page);

  await page.goBack();
  await page.click(".to-setmap-page-btn");

  await testMapSetData(page);

  await browser.close();
})();

/**
 * 点击后状态变更
 */
async function testStateChange(page: pptr.Page) {
  const btn = await page.waitForSelector(".add-btn", {
    visible: false,
  });
  assert(btn !== null);
  await btn.click();
  const textContent = await btn.evaluate((node) => {
    return node.textContent;
  });
  assert.ok(textContent == "1");
}

/**
 * 开启 autoIgnore 后，以下划线结尾的属性不会被监听
 * 点击后页面不会变更
 */
async function testIgnore(page: pptr.Page) {
  const btn = await page.waitForSelector(".ignore-btn", {
    visible: false,
  });
  assert(btn !== null);
  await btn.click();
  const textContent = await btn.evaluate((node) => {
    return node.textContent;
  });
  assert.ok(textContent == "0");
}

/**
 * 延迟初始化其他服务
 */
async function testLate(page: pptr.Page) {
  const btn = await page.waitForSelector(".late-btn", {
    visible: false,
  });
  assert(btn !== null);
  await btn.click();
  const textContent = await btn.evaluate((node) => {
    return node.textContent;
  });
  assert.ok(textContent == "1");
}

async function testAboutState(page: pptr.Page) {
  // 测试 AppService的全局状态
  let p = await page.$(".as-i");
  assert.ok(p !== null);
  let i = await p.evaluate((node) => node.textContent);
  assert.ok(i == "1");

  p = await page.$(".as2-i");
  assert.ok(p !== null);
  i = await p.evaluate((node) => node.textContent);
  assert.ok(i == "1");

  await page.click(".as-i");

  const btn = await page.waitForSelector(".ps-btn", {
    visible: false,
  });
  assert(btn !== null);
  await btn.click();
  const textContent = await btn.evaluate((node) => {
    return node.textContent;
  });
  assert.ok(textContent == "1");
}

async function testAboutStateCache(page: pptr.Page) {
  // 测试 AppService的全局状态
  let p = await page.$(".as-i");
  assert.ok(p !== null);
  let i = await p.evaluate((node) => node.textContent);
  assert.ok(i == "2");

  p = await page.$(".as2-i");
  assert.ok(p !== null);
  i = await p.evaluate((node) => node.textContent);
  assert.ok(i == "1");

  const btn = await page.waitForSelector(".ps-btn", {
    visible: false,
  });
  assert(btn !== null);
  await btn.click();
  const textContent = await btn.evaluate((node) => {
    return node.textContent;
  });
  assert.ok(textContent == "2");
}

async function testAboutStateCache2(page: pptr.Page) {
  // 测试 AppService的全局状态
  let p = await page.$(".as-i");
  assert.ok(p !== null);
  let i = await p.evaluate((node) => node.textContent);
  assert.ok(i == "2");

  p = await page.$(".as2-i");
  assert.ok(p !== null);
  i = await p.evaluate((node) => node.textContent);
  assert.ok(i == "1");

  const btn = await page.waitForSelector(".ps-btn", {
    visible: false,
  });
  assert(btn !== null);
  await btn.click();
  const textContent = await btn.evaluate((node) => {
    return node.textContent;
  });
  assert.ok(textContent == "1");
}

async function testAddTodo(page: pptr.Page) {
  //======================== ADD =========================//
  await page.type(".input-todo", "起床", { delay: 100 });
  await page.click(".add-btn");

  let items = await page.$$(".list .item");
  assert.ok(items != null);
  assert.ok(items.length === 1);

  await page.type(".input-todo", "上班", { delay: 100 });
  await page.click(".add-btn");

  items = await page.$$(".list .item");
  assert.ok(items != null);
  assert.ok(items.length === 2);

  await page.type(".input-todo", "工作", { delay: 100 });
  await page.click(".add-btn");

  items = await page.$$(".list .item");
  assert.ok(items != null);
  assert.ok(items.length === 3);

  //======================== EDIT =========================//

  const last = items[2];
  await (await last.$(".edit-btn"))!.click();
  const itemInput = await last.$(".item-input");

  await itemInput?.focus();
  await page.keyboard.down("Control");
  await page.keyboard.press("A");
  await page.keyboard.press("Backspace");
  await page.keyboard.up("Control");

  await itemInput!.type("摸鱼", { delay: 100 });
  await (await last.$(".save-btn"))!.click();

  //======================== ADD =========================//
  await page.type(".input-todo", "下班", { delay: 100 });
  await page.click(".add-btn");
}

async function testDelTodos(page: pptr.Page) {
  //======================== DEL =========================//
  let items = await page.$$(".list .item");
  assert.ok(items.length === 4);
  for await (const it of items) {
    await (await it.$(".del-btn"))!.click();
  }
  items = await page.$$(".list .item");
  assert.ok(items.length === 0);
}

async function testMapSetData(page: pptr.Page) {
  // set
  let p = await page.$(".set-size");
  assert.ok(p !== null);
  assert.ok((await p.evaluate((node) => node.textContent)) == "4");

  await page.click(".set-add-btn");
  assert.ok((await p.evaluate((node) => node.textContent)) == "5");

  await page.click(".set-del-btn");
  assert.ok((await p.evaluate((node) => node.textContent)) == "4");

  await page.click(".set-change-obj-btn");
  assert.ok((await p.evaluate((node) => node.textContent)) == "4");

  p = await page.$(".set-obj");
  assert.ok(p !== null);
  assert.ok(
    (await p.evaluate((node) => node.textContent))?.includes(`{"name":"suou"}`)
  );

  p = await page.$(".set-size");
  assert.ok(p !== null);
  await page.click(".set-clear-btn");
  assert.ok((await p.evaluate((node) => node.textContent)) == "0");

  // map
  p = await page.$(".map-a");
  assert.ok(p !== null);
  assert.ok((await p.evaluate((node) => node.textContent)) == "1");

  await page.click(".map-change-a-btn");
  assert.ok((await p.evaluate((node) => node.textContent)) == "11");

  p = await page.$(".map-obj");
  assert.ok(p !== null);

  await page.click(".map-obj-change-btn");
  assert.ok(
    (await p.evaluate((node) => node.textContent))?.includes('{"name":"suou"}')
  );
}
