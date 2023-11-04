'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
