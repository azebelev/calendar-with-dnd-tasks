import { Coordinates } from '@dnd-kit/core/dist/types';
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { useOutsideAlerter } from '../../hooks/useOutsideAlerter';
import { DropdownWrapper } from '../styled/DropdownWrapper';

export function Dropdown({
  children,
  setOpened,
  coordinates
}: {
  children: React.ReactNode;
  setOpened: Dispatch<SetStateAction<boolean>>;
  coordinates:Coordinates
}) {
  const wrapperRef: MutableRefObject<null> = useRef(null);
  useOutsideAlerter(wrapperRef, setOpened);
  return (
      <DropdownWrapper coordinates={coordinates}  ref={wrapperRef}>
        {children}
      </DropdownWrapper>
  );
}

