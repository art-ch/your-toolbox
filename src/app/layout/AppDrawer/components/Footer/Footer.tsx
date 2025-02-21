import React from 'react';

import Link from 'next/link';

import { LuContact2 } from 'react-icons/lu';

export const Footer = () => {
  return (
    <div className="absolute bottom-0 min-w-full flex p-2.5 border-t-2 border-t-[rgba(0,0,0,0.1)]">
      <Link
        className="px-2 py-1 rounded-md text-sm flex gap-2 items-center hover:bg-[hsl(240,4.8%,95.9%)] min-w-full"
        href="/about"
      >
        <LuContact2 />
        About
      </Link>
    </div>
  );
};
