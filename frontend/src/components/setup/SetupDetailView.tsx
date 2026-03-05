"use client";

import { FormEvent, useMemo, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageCircle,
  Monitor,
  Tag,
} from "lucide-react";

import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { commentService } from "@/services/comment/comment.service";
import { IComment } from "@/types/comments";
import { ISetup } from "@/types/setup";

const Page = styled.main`
  min-height: calc(100vh - 70px);
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
`;

const Hero = styled.section`
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Media = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
`;

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 280px;
  object-fit: cover;
  display: block;
`;

const CarouselControls = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 0.6rem;
  pointer-events: none;
`;

const CarouselButton = styled.button`
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => `${theme.colors.surface}dd`};
  color: ${({ theme }) => theme.colors.text};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: auto;
`;

const CarouselDots = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.65rem;
  display: flex;
  justify-content: center;
  gap: 0.45rem;
`;

const DotButton = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border: none;
  border-radius: 999px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : `${theme.colors.surface}cc`};
  cursor: pointer;
  padding: 0;
`;

const InfoCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
`;

const Title = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: clamp(1.35rem, 2vw, 2rem);
`;

const MetaList = styled.div`
  display: grid;
  gap: 0.6rem;
  margin-top: 0.9rem;
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.95rem;
`;

const AuthorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const AuthorProfileLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const AuthorText = styled.div`
  display: grid;
  gap: 2px;
`;

const AuthorName = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const AuthorRole = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const Section = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  margin: 0 0 0.85rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
`;

const Description = styled.p`
  margin: 0;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StackWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const GearList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.75rem;
`;

const GearItem = styled.li`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 0.75rem;
  display: grid;
  gap: 0.2rem;
`;

const GearTitle = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

const GearMeta = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const GearLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.85rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const CommentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

const Count = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const CommentList = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-bottom: 1rem;
`;

const CommentCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 0.75rem;
  background: ${({ theme }) => theme.colors.background};
`;

const CommentTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
`;

const CommentMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentAuthor = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.9rem;
`;

const CommentDate = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
`;

const CommentContent = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
`;

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

const ActionButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.82rem;
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const RepliesList = styled.div`
  margin-top: 0.65rem;
  margin-left: 1.75rem;
  display: grid;
  gap: 0.55rem;
`;

const ReplyCard = styled.div`
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  padding-left: 0.75rem;
`;

const EmptyComments = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.75rem;
`;

const Textarea = styled.textarea<{ $hasError: boolean }>`
  width: 100%;
  min-height: 110px;
  resize: vertical;
  border-radius: 10px;
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? "#ef4444" : theme.colors.border)};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.85rem;
  outline: none;

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? "#ef4444" : theme.colors.primary};
  }
`;

const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.825rem;
`;

const ReplyingInfo = styled.div`
  font-size: 0.84rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

function formatDate(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface SetupDetailViewProps {
  setup: ISetup;
  initialComments: IComment[];
  currentUserId: string | null;
}

export function SetupDetailView({
  setup,
  initialComments,
  currentUserId,
}: SetupDetailViewProps) {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<IComment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const authorName = typeof setup.user === "object" ? setup.user.name : "Usuário";
  const authorId = typeof setup.user === "object" ? setup.user._id : undefined;
  const helperText = `${newComment.trim().length}/500 caracteres`;
  const galleryImages = useMemo(
    () =>
      Array.from(new Set([setup.thumbnail, ...(setup.images ?? [])].filter(Boolean))),
    [setup.thumbnail, setup.images],
  );
  const hasCarousel = galleryImages.length > 1;
  const topLevelComments = useMemo(
    () => comments.filter((comment) => !comment.parentComment),
    [comments],
  );
  const repliesByParent = useMemo(() => {
    return comments.reduce<Record<string, IComment[]>>((acc, comment) => {
      if (!comment.parentComment) return acc;

      const parentId = comment.parentComment;
      const list = acc[parentId] ?? [];
      list.push(comment);
      acc[parentId] = list;
      return acc;
    }, {});
  }, [comments]);

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const content = newComment.trim();

    if (content.length < 2) {
      setError("O comentário precisa ter pelo menos 2 caracteres.");
      return;
    }

    if (content.length > 500) {
      setError("O comentário deve ter no máximo 500 caracteres.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const comment = await commentService.create(setup._id, {
        content,
        parentComment: replyingTo?._id ?? null,
      });

      setComments((prev) =>
        replyingTo ? [...prev, comment] : [comment, ...prev],
      );
      setNewComment("");
      setReplyingTo(null);
    } catch {
      setError("Não foi possível enviar seu comentário agora.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    setIsDeletingId(commentId);

    try {
      await commentService.remove(commentId);
      setComments((prev) =>
        prev.filter(
          (comment) => comment._id !== commentId && comment.parentComment !== commentId,
        ),
      );

      if (replyingTo?._id === commentId) {
        setReplyingTo(null);
      }
    } catch {
      setError("Não foi possível excluir o comentário.");
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Setups", href: "/setups" },
            { label: setup.title },
          ]}
        />

        <Hero>
          <Media>
            <MediaImage
              src={galleryImages[currentImageIndex] ?? setup.thumbnail}
              alt={`Imagem do ${setup.title}`}
            />

            {hasCarousel ? (
              <>
                <CarouselControls>
                  <CarouselButton
                    type="button"
                    aria-label="Imagem anterior"
                    onClick={handlePrevImage}
                  >
                    <ChevronLeft size={18} />
                  </CarouselButton>
                  <CarouselButton
                    type="button"
                    aria-label="Próxima imagem"
                    onClick={handleNextImage}
                  >
                    <ChevronRight size={18} />
                  </CarouselButton>
                </CarouselControls>

                <CarouselDots>
                  {galleryImages.map((image, index) => (
                    <DotButton
                      key={`${image}-${index}`}
                      type="button"
                      $active={index === currentImageIndex}
                      aria-label={`Ir para imagem ${index + 1}`}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </CarouselDots>
              </>
            ) : null}
          </Media>

          <InfoCard>
            <Title>{setup.title}</Title>
            <MetaList>
              <MetaRow>
                <Monitor size={16} />
                {setup.workRole} • {setup.workModality}
              </MetaRow>
              <MetaRow>
                <Tag size={16} />
                {setup.tags.join(", ")}
              </MetaRow>
              <MetaRow>
                <Clock3 size={16} />
                Atualizado em {formatDate(setup.updatedAt)}
              </MetaRow>
            </MetaList>

            <AuthorRow>
              {authorId ? (
                <AuthorProfileLink href={`/users/${authorId}`}>
                  <Avatar
                    src={typeof setup.user === "object" ? setup.user.avatar : ""}
                    fallback={authorName}
                    size={40}
                  />
                </AuthorProfileLink>
              ) : (
                <Avatar
                  src={typeof setup.user === "object" ? setup.user.avatar : ""}
                  fallback={authorName}
                  size={40}
                />
              )}

              <AuthorText>
                {authorId ? (
                  <AuthorProfileLink href={`/users/${authorId}`}>
                    <AuthorName>{authorName}</AuthorName>
                  </AuthorProfileLink>
                ) : (
                  <AuthorName>{authorName}</AuthorName>
                )}
                <AuthorRole>{setup.workRole}</AuthorRole>
              </AuthorText>
            </AuthorRow>
          </InfoCard>
        </Hero>

        <Section>
          <SectionTitle>Descrição</SectionTitle>
          <Description>
            {setup.description ?? "Sem descrição cadastrada para este setup."}
          </Description>
        </Section>

        <Section>
          <SectionTitle>Stack de software</SectionTitle>
          <StackWrap>
            {setup.softwareStack.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </StackWrap>
        </Section>

        <Section>
          <SectionTitle>Equipamentos</SectionTitle>
          <GearList>
            {setup.gears.map((gear) => (
              <GearItem key={gear._id ?? `${gear.category}-${gear.name}`}>
                <GearTitle>{gear.name}</GearTitle>
                <GearMeta>
                  {gear.category}
                  {gear.brand ? ` • ${gear.brand}` : ""}
                  {gear.model ? ` • ${gear.model}` : ""}
                </GearMeta>
                {gear.link ? (
                  <GearLink href={gear.link} target="_blank" rel="noreferrer">
                    Ver link do item
                  </GearLink>
                ) : null}
              </GearItem>
            ))}
          </GearList>
        </Section>

        <Section>
          <CommentsHeader>
            <SectionTitle style={{ marginBottom: 0 }}>
              <MessageCircle size={18} style={{ verticalAlign: "text-bottom", marginRight: 6 }} />
              Comentários
            </SectionTitle>
            <Count>{comments.length} comentário(s)</Count>
          </CommentsHeader>

          {comments.length === 0 ? (
            <EmptyComments>Seja o primeiro a comentar este setup.</EmptyComments>
          ) : (
            <CommentList>
              {topLevelComments.map((comment) => (
                <CommentCard key={comment._id}>
                  <CommentTop>
                    <CommentMeta>
                      <Avatar src={comment.user.avatar} fallback={comment.user.name} size={28} />
                      <CommentAuthor>{comment.user.name}</CommentAuthor>
                      <CommentDate>{formatDate(comment.createdAt)}</CommentDate>
                    </CommentMeta>
                    <CommentActions>
                      <ActionButton type="button" onClick={() => setReplyingTo(comment)}>
                        Responder
                      </ActionButton>
                      {currentUserId && comment.user._id === currentUserId ? (
                        <ActionButton
                          type="button"
                          onClick={() => handleDeleteComment(comment._id)}
                          disabled={isDeletingId === comment._id}
                        >
                          Excluir
                        </ActionButton>
                      ) : null}
                    </CommentActions>
                  </CommentTop>
                  <CommentContent>{comment.content}</CommentContent>

                  {(repliesByParent[comment._id] ?? []).length > 0 ? (
                    <RepliesList>
                      {(repliesByParent[comment._id] ?? []).map((reply) => (
                        <ReplyCard key={reply._id}>
                          <CommentTop>
                            <CommentMeta>
                              <Avatar src={reply.user.avatar} fallback={reply.user.name} size={24} />
                              <CommentAuthor>{reply.user.name}</CommentAuthor>
                              <CommentDate>{formatDate(reply.createdAt)}</CommentDate>
                            </CommentMeta>
                            {currentUserId && reply.user._id === currentUserId ? (
                              <CommentActions>
                                <ActionButton
                                  type="button"
                                  onClick={() => handleDeleteComment(reply._id)}
                                  disabled={isDeletingId === reply._id}
                                >
                                  Excluir
                                </ActionButton>
                              </CommentActions>
                            ) : null}
                          </CommentTop>
                          <CommentContent>{reply.content}</CommentContent>
                        </ReplyCard>
                      ))}
                    </RepliesList>
                  ) : null}
                </CommentCard>
              ))}
            </CommentList>
          )}

          <Form onSubmit={handleSubmit}>
            {replyingTo ? (
              <ReplyingInfo>
                Respondendo a {replyingTo.user.name}.{" "}
                <ActionButton type="button" onClick={() => setReplyingTo(null)}>
                  Cancelar
                </ActionButton>
              </ReplyingInfo>
            ) : null}
            <Textarea
              $hasError={!!error}
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder={
                replyingTo
                  ? `Responda ${replyingTo.user.name}...`
                  : "Adicione um comentário sobre este setup..."
              }
              maxLength={500}
            />
            <FormFooter>
              <div style={{ display: "grid", gap: 4 }}>
                {error ? <ErrorText>{error}</ErrorText> : null}
                <Count>{helperText}</Count>
              </div>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Enviando..."
                  : replyingTo
                    ? "Responder"
                    : "Adicionar comentário"}
              </Button>
            </FormFooter>
          </Form>
        </Section>
      </Container>
    </Page>
  );
}
