'use client';

import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const SkeletonBase = styled.div<{ $width?: string; $height?: string; $radius?: string }>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '20px'};
  border-radius: ${({ $radius }) => $radius || '4px'};
  background-color: ${({ theme }) => theme.colors.border};
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

import { CardContainer, CardBody, CardFooter } from '../setup/SetupCard'; 

export function SetupCardSkeleton() {
  return (
    <CardContainer>
      <SkeletonBase $height="200px" $radius="0" />
      
      <CardBody>
        <SkeletonBase $height="24px" $width="70%" style={{ marginBottom: '8px' }} />
        <SkeletonBase $height="16px" $width="40%" style={{ marginBottom: '16px' }} />
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <SkeletonBase $height="24px" $width="60px" $radius="16px" />
          <SkeletonBase $height="24px" $width="80px" $radius="16px" />
          <SkeletonBase $height="24px" $width="50px" $radius="16px" />
        </div>

        <CardFooter>
          <SkeletonBase $height="24px" $width="24px" $radius="50%" />
          <SkeletonBase $height="16px" $width="100px" />
        </CardFooter>
      </CardBody>
    </CardContainer>
  );
}