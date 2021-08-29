import styled, { css } from 'styled-components';

export const TextField = styled.input.attrs(p=>{return{
  'data-invalid': p.invalid || false,
}})`
  width: 100%;
  border-bottom: 1px solid ${p => p.theme.colors.gray2};
  padding-bottom: 6px;

  color: ${p => p.theme.colors.text};
  font-weight: 400;
  font-size: 20px;
  height: 32px;
  
  &::placeholder{
    color: ${p => p.theme.colors.gray2};
  }
  &:focus{
    border-bottom-color: ${p => p.theme.colors.text};
  }
  &[data-invalid=true]{
    border-bottom-color: ${p => p.theme.colors.error};
  }
  &:disabled{
    color: ${p => p.theme.colors.gray2};
  }
`;

export const Label = styled.label`
  display: block;

  & span{
    display: block;
    font-size: 14px;
    padding-bottom: 8px;
  }
`;

export const Input = styled.input`
  display: none;
`;

const browseButton = css`
  border: 2px solid ${p => p.theme.colors.gray2};
  max-width: 80%;
  cursor: pointer;
  &:hover{
    opacity: 0.7;
  }
  transition: opacity 300ms;
`;

export const Preview = styled.img`
  ${browseButton}
  min-height: 10px;
  max-height: 250px;
`;

export const HelpText = styled.div`
  ${browseButton}
  height: 120px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: ${p => p.theme.colors.lightText};
`;
