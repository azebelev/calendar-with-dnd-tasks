import styled from 'styled-components';

export const MenuItem = styled.div`
  color: #4a5568;
  display: block;
  padding: 0.5rem 1rem; 
  font-size: 0.875rem; 
  cursor: pointer;
  z-index: 10;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #cbd5e0;
  }
`;
