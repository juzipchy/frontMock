'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'mail.163.com',
    auth: {
        user: 'xiongmeiqiang123@163.com',
        pass: 'Lanshan1991518'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Fred Foo 👻" <xiongmeiqiang@xiaomi.com>', // sender address
    to: '805238497@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error,'teststatic');
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});