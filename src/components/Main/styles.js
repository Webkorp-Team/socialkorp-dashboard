import styled from 'styled-components';

export const Wrapper = styled.main`
  background-color: ${props => props.theme.colors.primary};
  height: 100%;
  width: 100%;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.secondary};
  font-size: 30px;
`;