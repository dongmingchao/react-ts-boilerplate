it('Home', async () => {
  await page.goto('http://localhost:8080/');
  await expect(page).toClick('button', {text: '弹 框'});
  // await expect(page).toClick('button', {text: '确 认'});
  // await expect(page).toClick('button', {text: '取 消'});

  // await jestPuppeteer.debug();
}, 999999);

it('点击按钮，弹框出现', async () => {
  await page.goto('http://localhost:8080/');
  let modals = await page.$$('.ant-modal-title');
  expect(modals.length).toBe(0); // 刚进入的时候没有弹框
  await expect(page).toClick('button', {text: '弹 框'});
  modals = await page.$$('.ant-modal-title');
  expect(modals.length).toBe(1); // 出现弹框
  // 验证弹框标题
  await expect(page).toMatchElement('.ant-modal-title', {text: '一个弹框弹出来了'});
  // 验证弹框内容
  await expect(page).toMatchElement('.ant-modal-body', {text: '弹框的内容'});
})
