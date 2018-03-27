const mailer = require('./mailer');
const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://detail.tmall.com/item.htm?spm=a230r.1.14.1.30d41c31oZkUwF&id=563311188106&cm_id=140105335569ed55e27b&abbucket=20');
    const price = await page.$eval('.tm-promo-price .tm-price', el => el.innerHTML);
    if (parseInt(price, 10) <= 300) {
      mailer(price);
    }
    await browser.close();
  } catch (error) {
    process.exit('出错了', error.message);
  }
})();
