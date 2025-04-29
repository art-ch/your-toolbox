import React from 'react';

export type AsceticExerciseDurationSectionProps = { children: React.ReactNode };

export const AsceticExerciseDurationSection = ({
  children
}: AsceticExerciseDurationSectionProps) => (
  <section className="flex flex-col gap-y-8 py-2 sm:py-4 md:py-6">
    {children}
  </section>
);
