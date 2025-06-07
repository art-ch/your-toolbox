import { TabsContent } from '@/components/ui/tabs';
import React from 'react';

export type FormTabProps = {
  children: React.ReactNode;
  value: string;
};

export const FormTab = ({ children, value }: FormTabProps) => (
  <TabsContent value={value}>
    <section className="flex flex-col gap-y-8 py-2 sm:py-4 md:py-6">
      {children}
    </section>
  </TabsContent>
);
