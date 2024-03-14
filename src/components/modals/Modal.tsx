import { Dispatch, MutableRefObject, ReactNode, SetStateAction, useEffect, useRef } from 'react';
import { useOutsideAlerter } from '../../utils/useOutsideAlerter';
import { CloseButton } from '../buttons/CloseButton';
import { ModalWrapper } from '../styled/ModalWrapper';
import { Typography } from '../styled/Typography';

export function Modal({
  setModalOpen,
  title,
  children,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  children: ReactNode;
}) {
  const wrapperRef: MutableRefObject<null> = useRef(null);
  useOutsideAlerter(wrapperRef, setModalOpen);
  return (
    <div ref={wrapperRef}>
      <ModalWrapper>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant='boldXl'>{title}</Typography>
          <CloseButton onClick={() => setModalOpen(false)} />
        </div>
        <div>{children}</div>
      </ModalWrapper>
    </div>
  );
}
