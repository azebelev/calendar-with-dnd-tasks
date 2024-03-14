import styled from 'styled-components';

export const Container = styled.div`
    height:100vh;
    min-width: 1200px;
    padding:0 20px;
    background-color: ${({theme}) => theme.palette.common.white};
`