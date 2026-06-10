import { NextRequest, NextResponse } from 'next/server';
import { insertWaitlist } from '@/lib/waitlist';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const { allowed } = checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json(
        { ok: false, error: 'Rate limit exceeded. Try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { ok: false, error: 'Email is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid email format.' },
        { status: 400 }
      );
    }

    const referrer = request.headers.get('referer') || undefined;
    const userAgent = request.headers.get('user-agent') || undefined;

    const result = await insertWaitlist(email, ip, referrer, userAgent);

    return NextResponse.json({
      ok: true,
      position: result.position,
      alreadyExists: result.alreadyExists,
    });
  } catch (error: unknown) {
    console.error('Waitlist error:', error);
    return NextResponse.json(
      { ok: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
}
