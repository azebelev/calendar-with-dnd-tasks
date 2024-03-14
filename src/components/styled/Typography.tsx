import styled from 'styled-components';

interface IProps {
  variant?: 'boldXl' | 'bold' | 'boldSm' | 'light' | 'lightSm';
}

export const Typography = styled.span<IProps>`
  ${({ theme: { palette }, variant }) => {
    switch (variant) {
      case 'boldXl':
        return `
          color: ${palette.common.black};
          font-weight: 700;
          font-size: 18px
        `;
      case 'bold':
        return `
          color: ${palette.common.black};
          font-weight: 700;
          font-size: 14px
        `;
      case 'boldSm':
        return `
          color: ${palette.common.black};
          font-weight: 700;
          font-size: 12px;
        `;
      case 'light':
        return `
          color: ${palette.grey.main};
        `;
      case 'lightSm':
        return `
          color: ${palette.grey.main};
          font-size: 12px;
        `;
      default:
        return `
          color: ${palette.common.contrastText};
          font-size: 14px;
        `;
    }
  }}
`;
