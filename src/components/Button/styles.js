import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;

  width: 100%;
  height: 36px;
  line-height: 36px;

  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.04em;

  & > i{
    font-size: 22px;
    line-height: inherit;
    vertical-align: bottom;
    margin-right: 12px;
  }


  border-radius: 2px;

  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);

  cursor: pointer;

  background-color: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.textOverPrimary};
  &[data-variant=secondary]{
    background-color: ${p => p.theme.colors.cardBackground};
    color: ${p => p.theme.colors.text};
  }

  &:hover,&:focus{
    filter: brightness(110%);
  }
  &:active{
    filter: brightness(95%);
  }
  &:disabled{
    filter: saturate(0%);
    opacity: 0.5;
    cursor: default;
  }
`;

