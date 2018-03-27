const mailer = require('./mailer');
const puppeteer = require('puppeteer');
const format = require('date-fns/format');

function main() {
  setTimeout(async () => {
    try {
      const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox']});
      console.log('打开浏览器');
      const page = await browser.newPage();
      console.log('打开浏览器完成');
      await page.goto('https://detail.tmall.com/item.htm?spm=a230r.1.14.1.30d41c31oZkUwF&id=563311188106&cm_id=140105335569ed55e27b&abbucket=20');
      console.log('打开网页完成');
      const price = 1 || await page.$eval('.tm-promo-price .tm-price', el => el.innerHTML);
      console.log(`当前的时间是 ${format(new Date(), 'HH:mm:ss')}, 当前价格是${price}`)
      const m = +format(new Date(), 'mm');
      if (m === 59 || parseInt(price, 10) <= 300) {
        mailer(price);
      }
      await browser.close();
      main();
    } catch (error) {
      console.log('出错了', error.message);
      process.exit(1);
    }
  }, 1000 * 5);
}

main();
