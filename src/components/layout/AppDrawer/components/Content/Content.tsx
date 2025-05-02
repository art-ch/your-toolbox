'use client';

import React from 'react';

import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider
} from '@/components/ui/sidebar';
import { APP_DRAWER_CONTENT } from './Content.config';
import { useTranslation } from 'react-i18next';

export const Content = () => {
  const { t } = useTranslation();

  return (
    <SidebarProvider className="min-h-0">
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {APP_DRAWER_CONTENT.map((item) => (
              <SidebarMenuItem key={item.translationKey}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-medium">
                    {item?.icon}
                    {t(item.translationKey)}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </SidebarProvider>
  );
};
