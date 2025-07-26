
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    
    const response = NextResponse.json({
      success: true,
      message: 'Đăng xuất thành công'
    });

    
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0 
    });

    return response;

  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.json(
      { 
        success: false, 
        message: 'Đăng xuất thất bại' 
      },
      { status: 500 }
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