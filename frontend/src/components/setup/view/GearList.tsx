'use client';

import { IGearItem } from '@/types/setup';
import styled from 'styled-components';
import { GearItem } from './GearItem';

const ListContainer = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  /* Em telas maiores (tablets e monitores), mostra em duas colunas */
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

interface GearListProps {
  gears: IGearItem[];
}

export function GearList({ gears }: GearListProps) {
  if (!gears || gears.length === 0) {
    return <p style={{ color: '#64748b' }}>Nenhum periférico cadastrado neste setup.</p>;
  }

  return (
    <ListContainer>
      <SectionTitle>Equipamentos</SectionTitle>
      <Grid>
        {gears.map((gear) => (
          <GearItem key={gear._id || `${gear.category}-${gear.name}`} gear={gear} />
        ))}
      </Grid>
    </ListContainer>
  );
}