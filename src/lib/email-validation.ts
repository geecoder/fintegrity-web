// Blocklist of free/personal email providers — used to require a company
// (work) email address on lead-gen forms like Book a Demo.
const PERSONAL_EMAIL_DOMAINS = new Set([
  'gmail.com', 'googlemail.com',
  'yahoo.com', 'yahoo.co.uk', 'yahoo.fr', 'yahoo.de', 'ymail.com', 'rocketmail.com',
  'hotmail.com', 'hotmail.co.uk', 'outlook.com', 'live.com', 'msn.com',
  'aol.com',
  'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'pm.me',
  'gmx.com', 'gmx.de', 'gmx.net',
  'mail.com', 'inbox.com', 'fastmail.com',
  'zoho.com',
  'yandex.com', 'yandex.ru',
  'qq.com', '163.com', '126.com', 'naver.com',
])

export function isPersonalEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split('@')[1]
  if (!domain) return false
  return PERSONAL_EMAIL_DOMAINS.has(domain)
}

export const PERSONAL_EMAIL_ERROR =
  "Please use your company/work email address — personal providers like Gmail, Yahoo, or Outlook aren't accepted."
