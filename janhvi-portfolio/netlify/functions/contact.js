import nodemailer from 'nodemailer';

export const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const { name, email, subject, message } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `📧 New Inquiry: ${subject}`,
      text: `
        You have a new message from your portfolio:
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        Message: ${message}
        
        ---
        Sent from your janhvi-portfolio website.
      `,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f9f9f9; padding: 40px; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); border: 1px solid #eee;">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #333 0%, #000 100%); padding: 30px; text-align: center;">
              <h1 style="color: #fff; margin: 0; font-size: 24px; letter-spacing: 1px;">New Message</h1>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px;">
              <p style="font-size: 16px; margin-bottom: 30px; color: #666; line-height: 1.6;">
                You received a new inquiry from your portfolio website. Here are the details:
              </p>
              
              <div style="background-color: #fcfcfc; border-radius: 8px; padding: 25px; border-left: 4px solid #333;">
                <div style="margin-bottom: 20px;">
                  <span style="display: block; font-size: 11px; text-transform: uppercase; color: #999; font-weight: bold; letter-spacing: 1px; margin-bottom: 4px;">Project / Subject</span>
                  <span style="display: block; font-size: 18px; color: #333; font-weight: 500;">${subject}</span>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
                  <div>
                    <span style="display: block; font-size: 11px; text-transform: uppercase; color: #999; font-weight: bold; letter-spacing: 1px; margin-bottom: 4px;">Sender</span>
                    <span style="display: block; font-size: 15px; color: #333;">${name}</span>
                  </div>
                  <div>
                    <span style="display: block; font-size: 11px; text-transform: uppercase; color: #999; font-weight: bold; letter-spacing: 1px; margin-bottom: 4px;">Email</span>
                    <a href="mailto:${email}" style="color: #333; text-decoration: underline; font-size: 15px;">${email}</a>
                  </div>
                </div>
                
                <div style="border-top: 1px solid #efefef; pt: 20px; margin-top: 20px;">
                  <span style="display: block; font-size: 11px; text-transform: uppercase; color: #999; font-weight: bold; letter-spacing: 1px; margin-bottom: 10px; margin-top: 20px;">Message Contents</span>
                  <div style="font-size: 15px; color: #555; line-height: 1.7; white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #f0f0f0;">${message}</div>
                </div>
              </div>
              
              <div style="margin-top: 40px; text-align: center;">
                <a href="mailto:${email}" style="background-color: #333; color: #fff; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Sender</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="padding: 20px; background-color: #fafafa; text-align: center; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #aaa; margin: 0;">&copy; 2026 Janhvi portfolio. Site-generated notification.</p>
            </div>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: 'Failed to send email' }),
    };
  }
};
