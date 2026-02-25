'use client';

import styled from 'styled-components';
import { useState } from 'react';

interface AvatarProps {
  src?: string;
  fallback: string;
  size?: number; 
  onClick?: () => void;
}

const AvatarRoot = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-weight: 600;
  font-size: ${({ $size }) => $size * 0.4}px; /* A fonte cresce proporcional ao tamanho */
  user-select: none;
  border: 2px solid transparent;
  transition: border-color 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.border};
    cursor: pointer;
  }
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export function Avatar({ src, fallback, size = 40, onClick }: AvatarProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <AvatarRoot $size={size} onClick={onClick}>
      {src && !imgError ? (
        <AvatarImage 
          src={src} 
          alt="Avatar do usuário" 
          onError={() => setImgError(true)} 
        />
      ) : (
        <span>{fallback.substring(0, 2).toUpperCase()}</span>
      )}
    </AvatarRoot>
  );
}