// app/api/chat/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import https from 'https';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

export async function POST(request: NextRequest) {
  console.log(' 收到请求');

  try {
    const { message } = await request.json();
    console.log(' 用户消息:', message);

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: '消息内容不能为空' }, { status: 400 });
    }

    // 构造 payload（保持简洁）
    const payload = {
      model: 'deepseek-v4-pro',
      messages: [{ role: 'user', content: message }],
    };

    // -------- 核心：精细化配置 https.Agent --------
    const agent = new https.Agent({
      rejectUnauthorized: false,        // 开发环境忽略证书验证
      secureProtocol: 'TLSv1_2_method', // 强制 TLS 1.2（兼容性最好）
      ciphers: [
        'ECDHE-RSA-AES128-GCM-SHA256',
        'ECDHE-ECDSA-AES128-GCM-SHA256',
        'ECDHE-RSA-AES256-GCM-SHA384',
        'ECDHE-ECDSA-AES256-GCM-SHA384',
        'DHE-RSA-AES128-GCM-SHA256',
        'DHE-DSS-AES128-GCM-SHA256',
        'DHE-RSA-AES256-GCM-SHA384',
        'DHE-DSS-AES256-GCM-SHA384',
      ].join(':'), // 指定一组现代且广泛支持的加密套件
      minVersion: 'TLSv1.2',
      maxVersion: 'TLSv1.3',
      // 如果上面不行，可以尝试启用更宽松的加密套件列表（取消注释下一行，并注释掉上面的 ciphers）
      // ciphers: 'HIGH:!aNULL:!eNULL:!EXPORT:!DES:!MD5:!PSK:!SRP',
    });
    // -------- 配置结束 --------

    console.log('Agent 配置完成，强制 TLS 1.2，指定加密套件');

    // 发起请求
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify(payload),
      // 关键：传入自定义 agent
      agent: agent,
    });

    // 读取响应（先获取文本用于调试）
    const responseText = await response.text();
    console.log('响应状态:', response.status);
    console.log(' 响应内容:', responseText);

    if (!response.ok) {
      return NextResponse.json(
        { error: `DeepSeek 错误 (${response.status}): ${responseText}` },
        { status: response.status }
      );
    }

    const data = JSON.parse(responseText);
    const reply = data.choices?.[0]?.message?.content || '没有回复内容';
    console.log('AI 回复:', reply);

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error('错误详情:', error);
    return NextResponse.json(
      { error: '服务器错误：' + (error.message || '未知错误') },
      { status: 500 }
    );
  }
}