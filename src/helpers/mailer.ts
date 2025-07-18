import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import crypto from "crypto";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(token, 10);

    if (emailType === "VERIFY") {
      user.verifyToken = hashedToken;
      user.verifyTokenExpiry = Date.now() + 3600000;
    } else if (emailType === "RESET") {
      user.forgotPasswordToken = hashedToken;
      user.forgotPasswordTokenExpiry = Date.now() + 3600000;
    }

    await user.save();

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const linkPath =
      emailType === "VERIFY"
        ? `/verifyemail?token=${token}`
        : `/changepassword?token=${token}`;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.DOMAIN}${linkPath}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or paste this in your browser:<br> ${
        process.env.DOMAIN
      }${linkPath}</p>`,
    };

    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
