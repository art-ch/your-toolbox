import { Button } from '@/components/ui/button';
import { LocalHref } from '@/types/types';
import Link from 'next/link';

export type HeroProps = {
  title: string;
  subtitle: string;
  link?: LocalHref;
  buttonText?: string;
};

export const Hero = ({
  title,
  subtitle,
  link = '/navigation',
  buttonText = 'Check available tools'
}: HeroProps) => {
  return (
    <div className="my-0 mx-auto py-40 text-center max-w-lg">
      <div className="my-0 mx-auto py-2">
        <h1 className="text-4xl sm:text-6xl font-semibold leading-none tracking-tight">
          {title}
        </h1>
        <p className="py-2">{subtitle}</p>
      </div>
      <Link href={link}>
        <Button>{buttonText}</Button>
      </Link>
    </div>
  );
};
