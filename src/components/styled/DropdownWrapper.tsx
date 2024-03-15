import { Coordinates } from '@dnd-kit/core/dist/types';
import styled from 'styled-components';

export const DropdownWrapper = styled.div<{coordinates:Coordinates}>`
  position: fixed;
  width: fit-content;
  top: ${({coordinates}) => coordinates.y}px;
  left:${({coordinates}) => coordinates.x}px;
  right: 0;
  z-index: 10;
  margin-top: 2px;
  border-radius: 0.375rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
`;
