import styled from 'styled-components';

export const TextField = styled.input.attrs(p=>{return{
  'data-invalid': p.invalid || false,
}})`
  width: 100%;
  border-bottom: 1px solid ${p => p.theme.colors.gray2};
  padding-bottom: 6px;

  color: ${p => p.theme.colors.text};
  font-weight: 500;
  font-size: 20px;
  
  &::placeholder{
    color: ${p => p.theme.colors.gray2};
  }
  &:focus{
    border-bottom-color: ${p => p.theme.colors.text};
  }
  &[data-invalid=true]{
    border-bottom-color: ${p => p.theme.colors.error};
  }
`;

