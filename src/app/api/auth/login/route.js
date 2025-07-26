import { NextResponse } from 'next/server';
import { authenticateUser, generateToken } from '../../../../lib/auth';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Email và mật khẩu là bắt buộc' 
        },
        { status: 400 }
      );
    }

    const user = await authenticateUser(email, password);
    
    const token = generateToken(user);

    const response = NextResponse.json({
      success: true,
      message: 'Đăng nhập thành công',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
          permissions: user.permissions
        },
        token: token
      }
    });

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);

    return NextResponse.json(
      { 
        success: false, 
        message: error.message || 'Đăng nhập thất bại' 
      },
      { status: 401 }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}