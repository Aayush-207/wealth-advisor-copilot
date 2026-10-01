"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Chat', href: '/', icon: 'forum' },
    { name: 'History', href: '/history', icon: 'history' },
    { name: 'Library', href: '/documents', icon: 'menu_book' },
    { name: 'Approvals', href: '/admin', icon: 'verified_user' },
    { name: 'Escalations', href: '/escalations', icon: 'warning' }
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-surface-container-lowest/80 backdrop-blur-2xl z-50 flex flex-col justify-between p-space-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] shrink-0">
      <div className="flex flex-col gap-space-lg">
        <div className="flex items-center gap-space-sm px-space-sm pt-space-xs">
          <img alt="Wealth Copilot Emblem" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W9Pluiv1XSuEQU_skjlo80vkLWJK1-v7BblXMdXf8rLw5kWPeoOjksyJMfWHI-DzaiBace47fMXMc9L-BjB77OkRRtw-txcgxGLmyxdrSBi6pYufdMSbdJtX4dintv-__a9OJQ4atPerEZRmkGbgRpBwNDewsCrdtGB64TbGA4Z2X0saN_E8mbPM2aesexNH6ldwAj8I5FITrlwwbyGEcc_fZNZCTLxdkvEX3bTPuNhcUw1ItRMoB5vBi1"/>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface font-bold">Wealth Copilot</span>
            <span className="font-label-xs text-label-xs text-primary tracking-widest uppercase">Private Wealth Enclave</span>
          </div>
        </div>

        <nav className="flex flex-col gap-space-xs">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={isActive 
                  ? "flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all bg-surface-container text-primary font-medium shadow-[0_1px_8px_rgba(0,0,0,0.04)]" 
                  : "flex items-center justify-between px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"}
              >
                <div className="flex items-center gap-space-md">
                  <span className="material-symbols-outlined text-base">{item.icon}</span>
                  <span className="font-body-md text-body-md">{item.name}</span>
                </div>
                {item.name === 'Escalations' && (
                  <span className="font-label-xs text-label-xs bg-secondary-container/40 text-secondary px-2 py-0.5 rounded-full font-semibold">2</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="bg-surface-container/70 rounded-xl p-space-md flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-space-sm">
          <div className="relative">
            <img alt="Sarah Williams" className="w-9 h-9 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1UUu22fWgFQ2q3c1VK9KEaYStSTuR10oSYOvp4Vk86q67XfZYqFAVO2PjZrG7DpMBg--hwJd9_XznyqhADR6q-zX9r3J8pDqVNGTvvhFH1FTfB-jBEwXdS8Tzq2LKMxJ9EGwiQw3YcRvISVFInWpXklwTuS1yR-fTNVbUl1lXt1duEd09_dphzcxIbU3X9pQic5307SPT8und9UNCAmwWp-0OAx3GSHxCW-BOnuIJGcBbHORhu7ziu8lLk"/>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface-container"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-body-sm text-body-sm font-semibold text-on-surface">Sarah Williams</span>
            <span className="font-label-xs text-label-xs text-on-surface-variant">Relationship Manager</span>
          </div>
        </div>
        <button className="text-on-surface-variant hover:text-on-surface transition-colors p-1">
          <span className="material-symbols-outlined text-base">tune</span>
        </button>
      </div>
    </aside>
  );
}
