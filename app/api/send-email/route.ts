import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const { name, email, company, subject, message } = await request.json()

    // 验证环境变量
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP 配置不完整")
      return NextResponse.json(
        { error: "服务器配置错误" },
        { status: 500 }
      )
    }

    // 创建邮件传输器
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465", // 465 端口使用 SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        // 不验证证书
        rejectUnauthorized: false
      }
    })

    // 验证 SMTP 连接
    try {
      await transporter.verify()
      console.log("SMTP 连接验证成功")
    } catch (error) {
      console.error("SMTP 连接验证失败:", error)
      return NextResponse.json(
        { error: "SMTP 服务器连接失败" },
        { status: 500 }
      )
    }

    // 邮件内容
    const mailOptions = {
      from: `"丰吉国际" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `新联系表单提交: ${subject}`,
      text: `
姓名: ${name}
邮箱: ${email}
公司: ${company}
主题: ${subject}
消息: ${message}
      `,
      html: `
<h2>新联系表单提交</h2>
<p><strong>姓名:</strong> ${name}</p>
<p><strong>邮箱:</strong> ${email}</p>
<p><strong>公司:</strong> ${company}</p>
<p><strong>主题:</strong> ${subject}</p>
<p><strong>消息:</strong></p>
<p>${message.replace(/\n/g, "<br>")}</p>
      `,
    }

    // 发送邮件
    const info = await transporter.sendMail(mailOptions)
    console.log("邮件发送成功:", info.messageId)

    return NextResponse.json({ 
      message: "邮件发送成功",
      messageId: info.messageId 
    })
  } catch (error) {
    console.error("邮件发送失败:", error)
    return NextResponse.json(
      { 
        error: "邮件发送失败",
        details: error instanceof Error ? error.message : "未知错误"
      },
      { status: 500 }
    )
  }
} 