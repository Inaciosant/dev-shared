'use client';

import styled from 'styled-components';
import { Briefcase, MonitorSmartphone, Filter } from 'lucide-react';

const Aside = styled.aside`
  width: 260px;
  height: calc(100vh - 70px); /* Ocupa a tela toda menos a altura da Navbar */
  position: sticky;
  top: 70px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1.5rem;
  overflow-y: auto;
  
  /* Esconde a sidebar em telas de celular, deixando só pro desktop */
  @media (max-width: 768px) {
    display: none;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const FilterTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const FilterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FilterItem = styled.li`
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  input[type="checkbox"] {
    accent-color: ${({ theme }) => theme.colors.primary};
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
`;

export function Sidebar() {
  return (
    <Aside>
      <SectionHeader>
        <Filter size={18} />
        Filtros
      </SectionHeader>

      {/* Grupo 1: Cargo */}
      <FilterGroup>
        <FilterTitle>
          <Briefcase size={14} />
          Por Cargo
        </FilterTitle>
        <FilterList>
          <FilterItem><label><input type="checkbox" /> Front-end</label></FilterItem>
          <FilterItem><label><input type="checkbox" /> Back-end</label></FilterItem>
          <FilterItem><label><input type="checkbox" /> Full Stack</label></FilterItem>
          <FilterItem><label><input type="checkbox" /> Mobile (Flutter/RN)</label></FilterItem>
          <FilterItem><label><input type="checkbox" /> DevOps</label></FilterItem>
        </FilterList>
      </FilterGroup>

      {/* Grupo 2: Modalidade */}
      <FilterGroup>
        <FilterTitle>
          <MonitorSmartphone size={14} />
          Modalidade
        </FilterTitle>
        <FilterList>
          <FilterItem><label><input type="checkbox" /> Remote</label></FilterItem>
          <FilterItem><label><input type="checkbox" /> Hybrid</label></FilterItem>
          <FilterItem><label><input type="checkbox" /> Office</label></FilterItem>
        </FilterList>
      </FilterGroup>
    </Aside>
  );
}