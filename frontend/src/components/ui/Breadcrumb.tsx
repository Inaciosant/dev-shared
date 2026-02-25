"use client";

import Link from "next/link";
import styled from "styled-components";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Nav = styled.nav`
  margin-bottom: 1rem;
`;

const List = styled.ol`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  list-style: none;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  overflow-x: auto;
  white-space: nowrap;
`;

const Item = styled.li`
  display: inline-flex;
  align-items: center;
  min-width: 0;
`;

const CrumbLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Current = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 500;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items.length) return null;

  return (
    <Nav aria-label="Breadcrumb">
      <List>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Item key={`${item.label}-${index}`}>
              {item.href && !isLast ? (
                <CrumbLink href={item.href}>{item.label}</CrumbLink>
              ) : (
                <Current>{item.label}</Current>
              )}
              {!isLast && <ChevronRight size={14} aria-hidden="true" />}
            </Item>
          );
        })}
      </List>
    </Nav>
  );
}
