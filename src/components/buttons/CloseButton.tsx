import { CircleButton } from '../styled/CircleButton';

export function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <CircleButton onClick={onClick}>
      <svg
        style={{width:'16px',height:'16px'}}
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        viewBox='0 0 24 24'
        stroke='grey'
      >
        <path d='M6 18L18 6M6 6l12 12' />
      </svg>
    </CircleButton>
  );
}
