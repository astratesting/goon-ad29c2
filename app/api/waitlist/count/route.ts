import { NextResponse } from 'next/server';
import { getWaitlistCount } from '@/lib/waitlist';

export async function GET() {
  try {
    const count = await getWaitlistCount();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Waitlist count error:', error);
    return NextResponse.json({ count: 0 });
  }
}
