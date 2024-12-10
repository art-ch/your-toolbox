import React from 'react';

import { Link } from '@/app/components/Link/Link';

export const Footer = () => {
  return (
    <div className="w-full min-h-12 bg-primary flex items-center justify-center">
      <div className="flex gap-1 justify-center text-sm text-secondary">
        <p>made by</p>
        <Link variant="light" href="https://github.com/art-ch">
          art-ch
        </Link>
      </div>
    </div>
  );
};
