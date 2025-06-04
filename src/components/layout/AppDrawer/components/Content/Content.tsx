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
            {APP_DRAWER_CONTENT.map(
              ({ translationKey, url, icon, menuOptions }) => (
                <SidebarMenuItem key={translationKey}>
                  <SidebarMenuButton asChild>
                    <a href={url} className="font-medium">
                      {icon}
                      {t(translationKey)}
                    </a>
                  </SidebarMenuButton>
                  {menuOptions?.length ? (
                    <SidebarMenuSub className="ml-0 border-l-0 px-1.5">
                      {menuOptions.map((menuOption) => {
                        const linkText =
                          // use translationKey if it exists, or title if translation is not available
                          'translationKey' in menuOption
                            ? t(menuOption.translationKey)
                            : menuOption.title;

                        return (
                          <SidebarMenuSubItem key={linkText}>
                            <SidebarMenuSubButton asChild>
                              <a href={menuOption.url}>{linkText}</a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              )
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </SidebarProvider>
  );
};
