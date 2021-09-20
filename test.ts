import assert from "assert";
import pptr from "puppeteer";
const gotoUrl = "http://localhost:8888/";

(async () => {
  const browser = await pptr.launch({
    headless: false,
    slowMo: 250,
  });
  const page = await browser.newPage();
  await page.goto(gotoUrl);

  await testStateChange(page);
  await testIgnore(page);
  await testLate(page);

  // to about page
  await page.click(".to-about-page-btn");

  await testAboutState(page);

  // back
  await page.click(".back-btn");
  // to about page
  await page.click(".to-about-page-btn");

  await testAboutStateCache(page);

  // back
  await page.click(".back-btn");
  // to about page
  await page.click(".to-about-page-btn");

  await testAboutStateCache2(page);
  
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
