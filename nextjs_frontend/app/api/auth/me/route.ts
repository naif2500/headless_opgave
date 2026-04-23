// app/api/auth/me/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode'; // Make sure you have this installed

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  try {
    const decoded = jwtDecode(token);
    // Adjust 'username' to match whatever key holds your username in the JWT
    const username = decoded.username || decoded.sub; 
    
    return NextResponse.json({ username });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}