import { TimeZone } from '@/types';

const LOCAL_IANA = Intl.DateTimeFormat().resolvedOptions().timeZone;

/** Local time zone is used as default time zone.
 * User should not have an option to select default value to replicate behavior of Digital Travel Calculators.
 */
export const DEFAULT_TIME_ZONE: TimeZone = {
  id: '0',
  label: 'Local time',
  iana: LOCAL_IANA
};

/** A list of time zones to operate with.
 * Should have exactly 16 items to replicate behavior of Digital Travel Calculators. */
export const WORLD_TIME_ZONES: TimeZone[] = [
  { id: '1', label: 'London', iana: 'Europe/London' },
  { id: '2', label: 'Zürich', iana: 'Europe/Zurich' },
  { id: '3', label: 'Kyiv', iana: 'Europe/Kyiv' },
  { id: '4', label: 'Istanbul', iana: 'Europe/Istanbul' },
  { id: '5', label: 'Trivandrum', iana: 'Asia/Kolkata' },
  { id: '6', label: 'Jakarta', iana: 'Asia/Jakarta' },
  { id: '7', label: 'Manila', iana: 'Asia/Manila' },
  { id: '8', label: 'Tokyo', iana: 'Asia/Tokyo' },
  { id: '9', label: 'Sydney', iana: 'Australia/Sydney' },
  { id: '10', label: 'Wellington', iana: 'Pacific/Auckland' },
  { id: '11', label: 'Honolulu', iana: 'Pacific/Honolulu' },
  { id: '12', label: 'L.A.', iana: 'America/Los_Angeles' },
  { id: '13', label: 'SLC', iana: 'America/Boise' },
  { id: '14', label: 'Chicago', iana: 'America/Chicago' },
  { id: '15', label: 'NYC', iana: 'America/New_York' },
  { id: '16', label: 'Rio', iana: 'America/Sao_Paulo' }
];
