'use strict';
const nodemailer = require('nodemailer');

const { account } = require('./config');

module.exports = (price) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
        user: account.user, // generated ethereal user
        pass: account.password // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"470326964" <470326964@qq.com>', // sender address
    to: '460870550@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: '价格很低了快去看', // plain text body
    html: `价格很低了快去看 价格是${price}` // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('发送失败', error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
};
