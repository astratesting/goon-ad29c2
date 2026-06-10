import { getSupabaseAdmin } from './supabaseAdmin';
import { createHash } from 'crypto';

const SALT = process.env.WAITLIST_IP_SALT || 'goon-default-salt';

export function hashIp(ip: string): string {
  return createHash('sha256').update(`${ip}:${SALT}`).digest('hex');
}

export async function insertWaitlist(
  email: string,
  ip: string,
  referrer?: string,
  userAgent?: string
) {
  const supabaseAdmin = getSupabaseAdmin();
  const ipHash = hashIp(ip);

  const { data, error } = await supabaseAdmin
    .from('waitlist')
    .insert({
      email: email.toLowerCase().trim(),
      ip_hash: ipHash,
      referrer: referrer?.slice(0, 200) || null,
      user_agent: userAgent?.slice(0, 200) || null,
    })
    .select('position')
    .single();

  if (error) {
    if (error.code === '23505') {
      // Unique violation — email already exists
      const { data: existing } = await supabaseAdmin
        .from('waitlist')
        .select('position')
        .eq('email', email.toLowerCase().trim())
        .single();

      return {
        ok: true,
        position: existing?.position ?? 0,
        alreadyExists: true,
      };
    }
    throw error;
  }

  return { ok: true, position: data.position, alreadyExists: false };
}

export async function getWaitlistCount(): Promise<number> {
  const supabaseAdmin = getSupabaseAdmin();
  const { count, error } = await supabaseAdmin
    .from('waitlist')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count ?? 0;
}
