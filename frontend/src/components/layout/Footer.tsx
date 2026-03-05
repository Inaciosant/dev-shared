"use client";

import styled from "styled-components";
import Link from "next/link";
import Divider from "../ui/Divider";
import { Share2Icon, Github, Linkedin } from "lucide-react";

const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.borderFotter};
  background-color: ${({ theme }) => theme.colors.footer};
  padding: 1.5rem 2rem;
  position: relative;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 640px) {
    padding: 1.25rem 1rem;
  }
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SectionTitle = styled.p`
  margin: 0 0 0.6rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 600;
`;

const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: 0.85rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  transition: all 0.2s ease;

  &:hover {
    text-decoration: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const FooterSocial = styled.div`
  display: flex;
  flex-direction: column;
 

  @media (max-width: 900px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  margin-top: 0.5rem;
  
  @media (max-width: 900px) {
    flex-direction: column; 
      align-items: flex-start; 
  }
`;
const SocialLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
  }
`;

const FooterIconGit = styled(Github)`
  width: 16px;
  height: 16px;
`;

const FooterIconLinkedin = styled(Linkedin)`
  width: 16px;
  height: 16px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.9rem;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FooterRights = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;

const FooterDev = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
`;

const SocialIcon = styled(Share2Icon)`
  width: 16px;
  height: 16px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <div>
          <SectionTitle>Navegação</SectionTitle>
          <FooterNav aria-label="Navegação do rodapé">
            <FooterLink href="/">Início</FooterLink>
            <FooterLink href="/setups">Setups</FooterLink>
            <FooterLink href="/setups/new">Criar setup</FooterLink>
            <FooterLink href="/login">Login</FooterLink>
          </FooterNav>
        </div>

        <FooterSocial>
          <SectionTitle>Redes</SectionTitle>
          <LinksWrapper>
          <SocialLink
            href="https://github.com/inaciosant"
            target="_blank"
            rel="noreferrer"
          >
            <FooterIconGit />
            GitHub
          </SocialLink>
          <SocialLink
            href="https://www.linkedin.com/in/inaciosant/"
            target="_blank"
            rel="noreferrer"
          >
            <FooterIconLinkedin />
            LinkedIn
          </SocialLink>
          </LinksWrapper>
        </FooterSocial>
      </FooterContent>

      <Divider />

      <BottomRow>
        <FooterRights>
          &copy; {new Date().getFullYear()} <SocialIcon /> Dev Shared. All rights
          reserved.
        </FooterRights>
        <FooterDev>Desenvolvido por Inácio Sant</FooterDev>
      </BottomRow>
    </FooterContainer>
  );
};

export default Footer;
