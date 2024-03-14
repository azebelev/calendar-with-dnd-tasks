import React, { Dispatch, MutableRefObject, SetStateAction, useRef } from 'react';
import { useOutsideAlerter } from '../../utils/useOutsideAlerter';
import { DropdownWrapper } from '../styled/DropdownWrapper';

export function Dropdown({
  children,
  setOpened,
}: {
  children: React.ReactNode;
  setOpened: Dispatch<SetStateAction<boolean>>;
}) {
  const wrapperRef: MutableRefObject<null> = useRef(null);
  useOutsideAlerter(wrapperRef, setOpened);
  return (
      <DropdownWrapper ref={wrapperRef}>
        {children}
      </DropdownWrapper>
  );
}

