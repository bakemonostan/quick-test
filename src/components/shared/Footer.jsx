'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FooterMenuItems } from '@/contents/sidebar';

const FooterComponent = () => {
  const pathname = usePathname();
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const isActive = (link) => {
    return pathname.includes(link);
  };

  return (
    <footer className="bg-white border-t shadow-lg">
      <nav className="container px-4 mx-auto">
        <ul className="flex items-center justify-around">
          {FooterMenuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.link}
                className={`flex flex-col gap-1.5 pt-2 px-1 items-center text-gray-700 hover:text-[#FFEDB5] transition-all duration-300 ${
                  isActive(item.link) ? 'bg-gradient-to-b from-[#FFEDB5]/40 to-[#DCC6F5]/10' : ''
                }`}
              >
                {item.icon && <item.icon className={`w-5 h-5 ${!isActive(item.link) ? 'fill-white' : ''}`} />}
                <span className="text-xs">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default FooterComponent;