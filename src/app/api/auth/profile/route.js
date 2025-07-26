
import { NextResponse } from 'next/server';
import { verifyToken, getUserById } from '../../../../lib/auth';

export async function GET(request) {
  try {
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Access denied. No token provided.' 
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    
    const decoded = verifyToken(token);
    
    
    const user = getUserById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'User not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        user: user
      }
    });

  } catch (error) {
    console.error('Profile error:', error);

    return NextResponse.json(
      { 
        success: false, 
        message: 'Invalid or expired token' 
      },
      { status: 401 }
    );
  }
}

export async function PUT(request) {
  try {
    
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Access denied. No token provided.' 
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    const body = await request.json();

    
    
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: {
          ...decoded,
          ...body,
          id: decoded.id 
        }
      }
    });

  } catch (error) {
    console.error('Profile update error:', error);

    return NextResponse.json(
      { 
        success: false, 
        message: 'Profile update failed' 
      },
      { status: 400 }
    );
  }
}