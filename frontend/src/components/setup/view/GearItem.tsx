'use client';

import { IGearItem } from '@/types/setup';
import styled from 'styled-components';
import { ExternalLink } from 'lucide-react'; 

const ItemCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CategoryLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.05em;
`;

const ItemTitle = styled.h4`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ItemDetails = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin: 0;
`;

const LinkButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}1A`}; /* 1A é transparência em HEX */
  }
`;

interface GearItemProps {
  gear: IGearItem;
}

export function GearItem({ gear }: GearItemProps) {
  return (
    <ItemCard>
      <ItemInfo>
        <CategoryLabel>{gear.category}</CategoryLabel>
        <ItemTitle>{gear.brand ? `${gear.brand} ` : ''}{gear.name}</ItemTitle>
        {gear.details && <ItemDetails>{gear.details}</ItemDetails>}
      </ItemInfo>

      {/* Só renderiza o botão se a pessoa cadastrou um link */}
      {gear.link && (
        <LinkButton href={gear.link} target="_blank" rel="noopener noreferrer" title="Onde comprar">
          <ExternalLink size={20} />
        </LinkButton>
      )}
    </ItemCard>
  );
}