const sgMail = require('@sendgrid/mail');
require('dotenv').config({ path: './config.env' });

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.fromEmail = 'hello@skillthrive';
    this.fromName = 'Skillthrive';
  }

  async sendMagicLink() {
    const mailOptions = {
      to: this.to,
      from: {
        email: this.fromEmail,
        name: this.fromName,
      },
      templateId: 'd-7ed7ccdfe98b43bd9273f79f107061d8',
      dynamic_template_data: {
        url: this.url,
      },
    };

    try {
      await sgMail.send(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
};
