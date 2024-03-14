import styled from 'styled-components';

export const ModalWrapper = styled.div`
    position: fixed;
    top: 50%;
    left:50%;
    transform: translate(-50%,-50%);
    max-height: 100%;
    margin: 1rem;
    padding-top: 1.5rem;
    padding-bottom: 1.5rem; 
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 6px;
    background-color: white;
    overflow-y: auto;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    cursor: default;
    z-index: 50;
`