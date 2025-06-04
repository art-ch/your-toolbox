'use client';

import React from 'react';
import Link from 'next/link';

import { FiGithub } from 'react-icons/fi';
import { LuAtSign } from 'react-icons/lu';
import { LuContact } from 'react-icons/lu';
import { useBreakpoint } from '@/hooks/useBreakpoint/useBreakpoint';
import { PageHeading } from '@/components/PageHeading/PageHeading';

export const About = () => {
  const breakpoint = useBreakpoint();

  return (
    <div className="max-w-4xl my-0 mx-auto">
      <PageHeading title="About" />

      <p className="py-2">
        Welcome! I&apos;m the creator of your-toolbox, a project born out of my
        love for efficiency and automation. Like many of us, I&apos;ve always
        been fascinated by the idea of letting computers handle the repetitive
        stuff. This space is where I share my experiments, tools, and thoughts
        on making technology work for us, not the other way around. If
        you&apos;re curious about streamlining your digital life or just enjoy
        the occasional clever hack, you&apos;re in the right place. Let&apos;s
        explore the art of productive laziness together!
      </p>

      <div className="flex items-end gap-4 py-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex items-end gap-2 text-lg md:text-4xl font-semibold leading-none tracking-tight">
            <LuContact className="text-2xl" />
            {!breakpoint.sm && <h2>Contact info</h2>}
          </div>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            <Link
              className="flex items-center gap-1 text-link hover:text-link-hover focus:text-link-focus"
              href="https://github.com/art-ch"
            >
              <FiGithub />
              <div>art-ch</div>
            </Link>
            <Link
              className="flex items-center gap-1 text-link hover:text-link-hover focus:text-link-focus"
              href="mailto:artem.chekin1997@gmail.com"
            >
              <LuAtSign />
              <div>artem.chekin1997@gmail.com</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
