const nodeMailer = require("nodemailer");
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const mailSender = async (res, receiver, subject, template) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "shahmanan170602@gmail.com",
        pass: "cjpbovwuclmlsduv",
      },
      from: "shahmanan170602@gmail.com",
    });

    const info = transporter.sendMail(
      {
        from: "shahmanan170602@gmail.com",
        to: receiver,
        subject: subject,
        text: template,
        html: template,
      },
      function (err, info) {
        if (err) {
          throw err;
        }
        console.log("response:", info.response, "message:", info.messageId);
        return res.status(250).json({
          success: true,
          message: `Email sent to ${receiver} succesfully`,
        });
      }
    );

    // const msg = {
    //   to: "aryanagrawal20023@gmail.com", // Change to your recipient
    //   from: "sihantons@gmail.com", // Change to your verified sender
    //   subject: 'Sending with SendGrid is Fun',
    //   text: 'and easy to do anywhere, even with Node.js',
    //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    // }
    // sgMail
    //   .send(msg)
    //   .then(() => {
    //     console.log('Email sent')
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  } catch (err) {
    console.log("Error in sending mail:", err);
  }
};

module.exports = mailSender;
