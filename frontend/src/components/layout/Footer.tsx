"use client";

import styled from "styled-components";
import Link from "next/link";
import Divider from "../ui/Divider";
import { Share2Icon,Github,Linkedin } from "lucide-react";


const FooterContainer = styled.footer`
  border-top: 1px solid ${({ theme }) => theme.colors.borderFotter};
  background-color: ${({ theme }) => theme.colors.footer};
  padding: 20px;
  text-align: center;
`;

const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
`;
const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  margin: 0 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const FooterDev = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  text-align: end;
  display: block;
  font-size: 0.8rem;
  margin-top: 10px;
`;

const FooterRights = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  margin-top: 10px;
  gap: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterIconGit = styled(Github)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 5px;
  width: 16px;
  height: 16px;
`;
const FooterIconLinkedin = styled(Linkedin)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0 5px;
  width: 16px;
  height: 16px;
`;

const FooterSocial = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;
  margin-top: 10px;
`;

const SocialLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SocialIcon = styled(Share2Icon)`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-right: 5px;
  width: 16px;
  height: 16px;
`;
const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterRights>
        &copy; {new Date().getFullYear()} <SocialIcon /> Dev Shared. All rights
        reserved.
      </FooterRights>
         <Divider />
      <p>
        Navegação
      </p>

      <FooterNav>
        <FooterLink href="/setups">Setups</FooterLink>
      </FooterNav>


      <FooterDev>Desenvolvido por Inácio sant</FooterDev>
      <FooterSocial>
        <SocialLink href="https://github.com/inaciosant" target="_blank">
          <FooterIconGit />
          GitHub
        </SocialLink>
        
        <SocialLink href="https://www.linkedin.com/in/inaciosant/" target="_blank">
          <FooterIconLinkedin />
          LinkedIn
        </SocialLink>
      </FooterSocial>

    </FooterContainer>
  );
};

export default Footer;
