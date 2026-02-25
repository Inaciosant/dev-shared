'use client';

import styled from 'styled-components';

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
`;