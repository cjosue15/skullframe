'use client';

import { Button } from '@/components/Button';
import { RiWhatsappLine } from '@remixicon/react';
import { MouseEvent } from 'react';

export function ContactButton({
  onClick,
  className,
}: {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}) {
  return (
    <Button
      className={`flex items-center gap-2 cursor-pointer ${className}`}
      onClick={(event) => onClick?.(event)}
    >
      Contactar <RiWhatsappLine size={18} />
    </Button>
  );
}
