import { ISetup } from '@/types/setup';
import styled from 'styled-components';
import Link from 'next/link';
import { User, Monitor, Code2 } from 'lucide-react'; 
import { Badge } from '../ui/Badge';


export const CardContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.15);
  }
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardBody = styled.div`
  padding: 16px;
`;

export const SetupTitle = styled.h2`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
  
  /* Reticências se o título for muito grande */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const WorkRole = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  margin-bottom: 12px;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Avatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

export const AuthorName = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
export function SetupCard({ setup }: { setup: ISetup }) {
  const authorName = typeof setup.user === 'object' ? setup.user.name : 'Usuário';

  return (
    <Link href={`/setups/${setup._id}`} passHref style={{ textDecoration: 'none' }}>
        <CardContainer>
          <Thumbnail src={setup.thumbnail} alt={`Setup: ${setup.title}`} />
          
          <CardBody>
            <SetupTitle>{setup.title}</SetupTitle>
            
            <WorkRole style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Monitor size={14} />
              {setup.workRole}
            </WorkRole>
            
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
              {setup.softwareStack.slice(0, 3).map((tech) => (
                <Badge key={tech}>
                  <Code2 size={12} />
                  {tech}
                </Badge>
              ))}
            </div>

            <CardFooter>
              <User size={16} color="#64748b" />
              <AuthorName>{authorName}</AuthorName>
            </CardFooter>
          </CardBody>
        </CardContainer>
    </Link>
  );
}