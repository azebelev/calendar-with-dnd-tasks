import styled from 'styled-components';

export const CircleButton = styled.button`
    margin-left: 1rem;
    border-radius: 9px; 
    cursor: pointer;
    border: none;
    &:hover{
        background-color: ${({ theme: { palette } }) => palette.grey.dark}
    }
`