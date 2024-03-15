import styled from 'styled-components';

interface IProps {
  variant?: 'grey' | 'lightgrey' | 'white';
}
export const Card = styled.div<IProps>`
  padding: 4px;
  min-height: 6px;
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius};
  ${({ theme: { palette }, variant }) => {
    switch (variant) {
      case 'grey':
        return `
          background-color: ${palette.grey.light1};
        `;
      case 'lightgrey':
        return `
          background-color: ${palette.grey.light2};
        `;
      case 'white':
      default:
        return `
          background-color: white;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
          line-height: 14px;
          margin: 6px 0;`
    }
  }}
`;
