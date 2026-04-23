// app/api/auth/logout/route.js
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// ADD THIS LINE: This prevents Next.js from caching the logout request
export const dynamic = 'force-dynamic';

export async function POST() {
  const cookieStore = await cookies();
  
  // Delete the cookie
  cookieStore.delete('auth_token');
  
  return NextResponse.json({ message: 'Logged out successfully' });
}