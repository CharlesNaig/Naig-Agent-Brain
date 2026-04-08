// app/(dashboard)/layout.tsx — Discord Bot Dashboard Layout Template
'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Settings,
  Shield,
  Music,
  Coins,
  MessageSquare,
  BarChart3,
} from 'lucide-react';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Overview',    icon: LayoutDashboard },
  { href: '/dashboard/commands', label: 'Commands', icon: MessageSquare },
  { href: '/dashboard/moderation', label: 'Moderation', icon: Shield },
  { href: '/dashboard/economy', label: 'Economy', icon: Coins },
  { href: '/dashboard/music', label: 'Music', icon: Music },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#1e1f22] text-[#dbdee1]">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-[#2b2d31] bg-[#2b2d31] flex flex-col">
        {/* Brand */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-[#1e1f22]">
          <div className="w-8 h-8 rounded-full bg-[#5865f2] flex items-center justify-center text-white font-bold text-sm">
            B
          </div>
          <span className="font-semibold text-white truncate">Bot Dashboard</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-2 space-y-0.5 overflow-y-auto">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-[#404249] text-white'
                  : 'text-[#b5bac1] hover:bg-[#35373c] hover:text-white'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" aria-hidden />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
