import defaultSettings from '@/settings';

const title = defaultSettings.title || 'NextGIS Sense';

export default function getPageTitle(pageTitle?: string) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
