import { Button } from '@/components/ui/button';
import { WORLD_TIME_ZONES } from './constants/constants';

type ControlsProps = {
  zoneIndex: string;
  selectZone: (zoneId: string) => void;
};

export const Controls = ({ zoneIndex, selectZone }: ControlsProps) => (
  <div className="w-full border rounded-xl overflow-hidden p-[1px]">
    <div
      className="grid
      /* Extra Small: 4x4 Grid */
      grid-cols-4
      /* Small to Large: 2 lines of 8 */
      sm:grid-cols-8
      /* Large+: 1 line of 16 */
      lg:grid-cols-16
      gap-[1px]"
    >
      {WORLD_TIME_ZONES.map((timeZone) => (
        <Button
          key={timeZone.id}
          variant={zoneIndex === timeZone.id ? 'default' : 'ghost'}
          className="rounded-none text-xs sm:text-sm cursor-pointer h-auto"
          onClick={() => selectZone(timeZone.id)}
        >
          {timeZone.label}
        </Button>
      ))}
    </div>
  </div>
);
