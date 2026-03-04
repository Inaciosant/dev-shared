import styled from "styled-components";

const Divider  = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  margin: 20px 0;
`;

export default Divider;