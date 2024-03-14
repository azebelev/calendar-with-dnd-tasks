import styled from 'styled-components';

export const StyledSelect = styled.select`
  border: none;
  cursor: pointer;
  padding: 0.5rem 0.25rem;
  font-size: 1rem;
  border-radius: 0.375rem;
  outline: none;
  width: 100%;
  background-color: #f8fafc;
  box-shadow: 0 0 0 0.085rem ${({ theme }) => theme.palette.grey.main};
  &:focus {
    box-shadow: 0 0 0 0.125rem ${({ theme }) => theme.palette.blue.main};
  }
`;

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;
