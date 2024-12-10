import { LogoBreadcrumbItem } from './LogoBreadcrumb.types';

export const getBreadcrumbItems = (
  pathName: string | null
): {
  intermediateBreadcrumbItems: LogoBreadcrumbItem[];
  breadcrumbTitle: LogoBreadcrumbItem | null;
} => {
  if (!pathName) {
    return { intermediateBreadcrumbItems: [], breadcrumbTitle: null };
  }

  const linkSegments = pathName.split('/').filter((segment) => segment !== '');

  const intermediateBreadcrumbItems: LogoBreadcrumbItem[] = linkSegments
    .slice(0, -1)
    .map((segment, index) => ({
      key: segment,
      title: segment,
      href: '/' + linkSegments.slice(0, index + 1).join('/')
    }));

  const breadcrumbTitle: LogoBreadcrumbItem | null =
    linkSegments.length > 0
      ? {
          key: linkSegments[linkSegments.length - 1],
          title: linkSegments[linkSegments.length - 1]
        }
      : null;

  return { intermediateBreadcrumbItems, breadcrumbTitle };
};
