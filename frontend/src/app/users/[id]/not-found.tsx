import styled from "styled-components";
const Container = styled.div`
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem;
`;

const Title = styled.h1`
  margin: 0 0 1rem;
  font-size: 1.5rem;
`;

const Message = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
export default function UserNotFound() {
  return (
    <Container>
      <Title>Usuario nao encontrado</Title>
      <Message>O usuario que voce esta procurando nao existe.</Message>
    </Container>
  );
}