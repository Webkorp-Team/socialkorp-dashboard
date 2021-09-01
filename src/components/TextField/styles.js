import styled from 'styled-components';

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
    color: ${p => p.theme.colors.lightText};
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

  textarea&{
    min-height: 180px;
    max-width: 100%;
  }
  select&{
    background-color: transparent;
    &[data-value=""]{
      color: ${p => p.theme.colors.lightText};
    }
    option{
      background-color: ${p => p.theme.colors.background};
      color: ${p => p.theme.colors.text};
      &:disabled{
        color: ${p => p.theme.colors.lightText};
      }
    }
    color: ${p => p.theme.colors.text};
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

