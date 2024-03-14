import styled from 'styled-components';

export const Input = styled.input<{ error?: boolean }>`
  border: none;
  width: 100%;
  margin: 1rem 0;
  border-radius: 0.375rem;
  display: block;
  outline: none;
  padding: 0.5rem 0.25rem;
  transition: all 0.3s;
  font-size: 0.875rem;
  background-color: #f8fafc;
  box-shadow: 0 0 0 0.085rem ${({ theme }) => theme.palette.grey.main};
  &:focus {
    box-shadow: 0 0 0 0.125rem ${({ theme }) => theme.palette.blue.main};
  }
`;
