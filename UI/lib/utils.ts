import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatTimeAgo(dateString?: string): string {
  if (!dateString) return '';
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(dateString);
}

export function isAdminUser(user?: { role?: string | number; email?: string } | null): boolean {
  if (!user || user.role === undefined || user.role === null) return false;
  const roleStr = String(user.role).trim().toLowerCase();
  
  // If role is 1 or 'user', it is a standard User
  if (roleStr === '1' || roleStr === 'user') {
    return false;
  }
  
  // If role is NOT 1 (e.g. 2 = Moderator, 3 = Admin, 4 = SuperAdmin), return true
  return true;
}



