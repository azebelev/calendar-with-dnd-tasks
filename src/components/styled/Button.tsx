import styled, { css } from 'styled-components';

const getVariant = (variant?: VariantType) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: #9333ea; 
        color: #fff; 
        box-shadow: 0 0.125rem 0.25rem rgba(147, 51, 234, 0.25); 
        &:hover {
          background-color: #7f3ebf; 
          box-shadow: 0 0.375rem 0.75rem rgba(147, 51, 234, 0.75); 
        }
      `;
    case 'danger':
      return css`
        background-color: #e53e3e; 
        color: #fff; 
        &:hover {
          background-color: #c53030; 
        }
      `;
    case 'success':
      return css`
        background-color: #48bb78; 
        color: #fff; 
        box-shadow: 0 0.125rem 0.25rem rgba(72, 187, 120, 0.25); 
        &:hover {
          background-color: #38a169; 
          box-shadow: 0 0.375rem 0.75rem rgba(72, 187, 120, 0.75);
        }
      `;
    case 'warning':
      return css`
        background-color: #f6e05e; 
        color: #fff;
        box-shadow: 0 0.125rem 0.25rem rgba(246, 224, 94, 0.25); 
        &:hover {
          background-color: #f6e05e; 
          box-shadow: 0 0.375rem 0.75rem rgba(246, 224, 94, 0.75); 
        }
      `;
    case 'outline-danger':
      return css`
        background-color: #fff; 
        color: #e53e3e; 
        border: 1px solid #e53e3e; 
        &:hover {
          color: #fff; 
          background-color: #c53030; 
        }
      `;
    case 'outline-success':
      return css`
        background-color: #fff; 
        color: #48bb78; 
        border: 1px solid #48bb78;
        &:hover {
          color: #fff; 
          background-color: #38a169; 
        }
      `;
    case 'outline-warning':
      return css`
        background-color: #fff; 
        color: #f6e05e; 
        border: 1px solid #f6e05e;
        &:hover {
          color: #fff; 
          background-color: #f6e05e; 
        }
      `;
    case 'outline-primary':
      return css`
        background-color: #fff; 
        color: #9333ea; 
        border: 1px solid #9333ea; 
        &:hover {
          color: #fff;
          background-color: #7f3ebf; 
        }
      `;
    default:
      return css`
        &:hover {
          background-color: #d5cddb; /* Equivalent to hover:bg-violet-700 in Tailwind */
        }
      `;
  }
};

type VariantType =
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'outline-danger'
  | 'outline-warning'
  | 'outline-success'
  | 'outline-primary';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: VariantType;
  square?: boolean;
  paddingLess?: boolean;
}

export const Button = styled.button<IButtonProps>`
  transition: all 0.3s;
  ${props => !props.paddingLess && 'padding: 0.375rem 1rem;'}
  ${props => !props.square && 'border-radius: 0.375rem;'} 
  border: none;
  ${props => getVariant(props.variant)}
  &:active{
    scale: 95%
  }
`;
