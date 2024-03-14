import { ReactNode } from 'react';

export function ScrollableContainer({ height, children }: { height: string; children: ReactNode }) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{ height, overflowY: 'auto'}}>{children}</div>
    </div>
  );
}
