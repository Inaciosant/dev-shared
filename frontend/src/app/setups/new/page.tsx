"use client";

import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { ImagePlus, Plus, UploadCloud, X } from "lucide-react";

import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const Page = styled.main`
  min-height: calc(100vh - 70px);
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.section`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 14px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 1rem;
`;

const Title = styled.h1`
  margin: 0 0 0.4rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: grid;
  gap: 0.85rem;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadField = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Dropzone = styled.div<{ $dragging: boolean; $error: boolean }>`
  width: 100%;
  min-height: 100px;
  border: 1px dashed
    ${({ theme, $dragging, $error }) =>
      $error
        ? "#ef4444"
        : $dragging
          ? theme.colors.primary
          : theme.colors.border};
  background: ${({ theme, $dragging }) =>
    $dragging ? `${theme.colors.primary}10` : theme.colors.background};
  border-radius: 12px;
  padding: 1rem;
  text-align: left;
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: start;
  gap: 0.75rem;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const DropzoneContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
`;

const DropzoneText = styled.div`
  display: grid;
  gap: 0.2rem;
`;

const DropzoneTitle = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const DropzoneSubtitle = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.85rem;
`;

const PreviewCard = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  height: 100%;
  min-height: 170px;
  display: grid;
  grid-template-rows: 1fr auto;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 180px;
  object-fit: cover;
  display: block;
`;

const PreviewMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.65rem 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
`;

const RemoveFileButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border: none;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.8rem;
`;

const TextareaWrap = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
`;

const Textarea = styled.textarea<{ $error?: boolean }>`
  min-height: 120px;
  resize: vertical;
  border-radius: 8px;
  border: 1px solid
    ${({ theme, $error }) => ($error ? "#ef4444" : theme.colors.border)};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.75rem 1rem;
  outline: none;

  &:focus {
    border-color: ${({ theme, $error }) =>
      $error ? "#ef4444" : theme.colors.primary};
  }
`;

const Hint = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

const GearSection = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 0.85rem;
  display: grid;
  gap: 0.75rem;
`;

const GearHeaderText = styled.div`
  display: grid;
  gap: 0.15rem;
`;

const GearTitle = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const GearSubtitle = styled.span`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const GearSectionTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

const GearList = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const GearRow = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 0.75rem;
  display: grid;
  gap: 0.65rem;
  background: ${({ theme }) => theme.colors.surface};
`;

const GearRowHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const GearRowTitle = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.9rem;
`;

const RemoveGearButton = styled.button`
  border: none;
  background: transparent;
  color: #ef4444;
  cursor: pointer;
  font-size: 0.82rem;

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

const GearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

const GearInput = styled.input`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.65rem 0.85rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const GearSelect = styled.select`
  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 0.65rem 0.85rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Success = styled.div`
  margin-top: 0.75rem;
  border: 1px solid ${({ theme }) => `${theme.colors.primary}55`};
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 10px;
  padding: 0.75rem;
`;

type FormState = {
  title: string;
  workRole: string;
  softwareStack: string;
  tags: string;
  description: string;
  gears: GearFormItem[];
};

type GearCategory =
  | "Keyboard"
  | "Mouse"
  | "Monitor"
  | "Headset"
  | "Chair"
  | "Desk"
  | "PC/Laptop"
  | "Other";

type GearCategoryOption = {
  value: GearCategory;
  label: string;
};

type GearFormItem = {
  category: GearCategory;
  name: string;
  brand: string;
  model: string;
  link: string;
  details: string;
};

const GEAR_CATEGORIES: GearCategoryOption[] = [
  { value: "Keyboard", label: "Teclado" },
  { value: "Mouse", label: "Mouse" },
  { value: "Monitor", label: "Monitor" },
  { value: "Headset", label: "Headset" },
  { value: "Chair", label: "Cadeira" },
  { value: "Desk", label: "Mesa" },
  { value: "PC/Laptop", label: "PC/Notebook" },
  { value: "Other", label: "Outro" },
];

const EMPTY_GEAR: GearFormItem = {
  category: "Keyboard",
  name: "",
  brand: "",
  model: "",
  link: "",
  details: "",
};

const INITIAL_FORM: FormState = {
  title: "",
  workRole: "",
  softwareStack: "",
  tags: "",
  description: "",
  gears: [EMPTY_GEAR],
};

export default function NewSetupPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [submitted, setSubmitted] = useState<FormState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [thumbnailError, setThumbnailError] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const updateGearField = <K extends keyof GearFormItem>(
    index: number,
    key: K,
    value: GearFormItem[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      gears: prev.gears.map((gear, itemIndex) =>
        itemIndex === index ? { ...gear, [key]: value } : gear,
      ),
    }));
    setErrors((prev) => ({ ...prev, gears: undefined }));
  };

  const addGear = () => {
    setForm((prev) => ({
      ...prev,
      gears: [...prev.gears, { ...EMPTY_GEAR }],
    }));
    setErrors((prev) => ({ ...prev, gears: undefined }));
  };

  const removeGear = (index: number) => {
    setForm((prev) => ({
      ...prev,
      gears:
        prev.gears.length === 1
          ? [{ ...EMPTY_GEAR }]
          : prev.gears.filter((_, itemIndex) => itemIndex !== index),
    }));
    setErrors((prev) => ({ ...prev, gears: undefined }));
  };

  useEffect(() => {
    return () => {
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
    };
  }, [thumbnailPreview]);

  const applyThumbnailFile = (file: File | null) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setThumbnailError("Selecione um arquivo de imagem válido.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setThumbnailError("A imagem deve ter no máximo 5MB.");
      return;
    }

    setThumbnailError("");
    setThumbnailFile(file);

    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    applyThumbnailFile(event.target.files?.[0] ?? null);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    applyThumbnailFile(event.dataTransfer.files?.[0] ?? null);
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.title.trim()) nextErrors.title = "Título é obrigatório.";
    if (!form.workRole.trim()) nextErrors.workRole = "Cargo é obrigatório.";
    if (!form.description.trim())
      nextErrors.description = "Descrição é obrigatória.";
    if (!form.gears.some((gear) => gear.name.trim())) {
      nextErrors.gears = "Adicione pelo menos 1 equipamento com nome.";
    }
    if (!thumbnailFile)
      setThumbnailError("A imagem da postagem é obrigatória.");

    return nextErrors;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    if (!thumbnailFile) {
      return;
    }

    setIsSubmitting(true);
    const payload = new FormData();
    const normalizedGears = form.gears
      .map((gear) => ({
        category: gear.category,
        name: gear.name.trim(),
        brand: gear.brand.trim(),
        model: gear.model.trim(),
        link: gear.link.trim(),
        details: gear.details.trim(),
      }))
      .filter((gear) => gear.name);

    payload.append("title", form.title.trim());
    payload.append("workRole", form.workRole.trim());
    payload.append("softwareStack", form.softwareStack.trim());
    payload.append("tags", form.tags.trim());
    payload.append("description", form.description.trim());
    payload.append("gears", JSON.stringify(normalizedGears));
    payload.append("thumbnail", thumbnailFile);

    for (const [key, value] of payload.entries()) {
      console.log("multipart", key, value);
    }

    await new Promise((resolve) => window.setTimeout(resolve, 450));
    setSubmitted(form);
    setIsSubmitting(false);
  };

  return (
    <Page>
      <Container>
        <Breadcrumb
          items={[
            { label: "Início", href: "/" },
            { label: "Setups", href: "/setups" },
            { label: "Criar postagem" },
          ]}
        />

        <Grid>
          <Card>
            <Title>Criar postagem de setup</Title>

            <Form onSubmit={handleSubmit}>
              <UploadField>
                <Label htmlFor="setup-thumbnail">Imagem do setup</Label>
                <HiddenFileInput
                  id="setup-thumbnail"
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Dropzone
                  $dragging={isDragging}
                  $error={!!thumbnailError}
                  role="button"
                  tabIndex={0}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                >
                  <DropzoneContent>
                    {thumbnailPreview ? (
                      <ImagePlus size={20} />
                    ) : (
                      <UploadCloud size={20} />
                    )}
                    <DropzoneText>
                      <DropzoneTitle>
                        {thumbnailFile
                          ? "Trocar imagem da postagem"
                          : "Arraste uma imagem aqui ou clique para selecionar"}
                      </DropzoneTitle>
                      <DropzoneSubtitle>
                        PNG/JPG/WebP até 5MB 
                      </DropzoneSubtitle>
                    </DropzoneText>
                  </DropzoneContent>

                  {thumbnailPreview ? (
                    <PreviewCard>
                      <PreviewImage
                        src={thumbnailPreview}
                        alt="Prévia da thumbnail"
                      />
                      <PreviewMeta>
                        <span>
                          {thumbnailFile?.name} (
                          {Math.round((thumbnailFile?.size ?? 0) / 1024)} KB)
                        </span>
                        <RemoveFileButton
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setThumbnailFile(null);
                            setThumbnailError("");
                            if (thumbnailPreview) {
                              URL.revokeObjectURL(thumbnailPreview);
                            }
                            setThumbnailPreview("");
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                        >
                          <X size={14} />
                          Remover
                        </RemoveFileButton>
                      </PreviewMeta>
                    </PreviewCard>
                  ) : null}
                </Dropzone>
                {thumbnailError ? (
                  <ErrorText>{thumbnailError}</ErrorText>
                ) : (
                  <Hint>Use uma imagem horizontal para melhor resultado.</Hint>
                )}
              </UploadField>

              <GearSection>
                <GearSectionTop>
                  <GearHeaderText>
                    <GearTitle>Equipamentos</GearTitle>
                    <GearSubtitle>
                      Preencha ao menos o nome de 1 item. Categoria é em PT-BR.
                    </GearSubtitle>
                  </GearHeaderText>
                  <Button type="button" onClick={addGear}>
                    <Plus size={16} /> Adicionar Equipamento
                  </Button>
                </GearSectionTop>

                {errors.gears ? <ErrorText>{errors.gears}</ErrorText> : null}

                <GearList>
                  {form.gears.map((gear, index) => (
                    <GearRow key={`gear-row-${index}`}>
                      <GearRowHeader>
                        <GearRowTitle>Equipamento {index + 1}</GearRowTitle>
                        <RemoveGearButton
                          type="button"
                          disabled={form.gears.length === 1}
                          onClick={() => removeGear(index)}
                        >
                          Remover
                        </RemoveGearButton>
                      </GearRowHeader>

                      <GearGrid>
                        <GearSelect
                          aria-label={`Categoria do equipamento ${index + 1}`}
                          value={gear.category}
                          onChange={(event) =>
                            updateGearField(
                              index,
                              "category",
                              event.target.value as GearCategory,
                            )
                          }
                        >
                          {GEAR_CATEGORIES.map((category) => (
                            <option key={category.value} value={category.value}>
                              {category.label}
                            </option>
                          ))}
                        </GearSelect>

                        <GearInput
                          placeholder="Nome do item* (ex.: MX Master 3S)"
                          value={gear.name}
                          onChange={(event) =>
                            updateGearField(index, "name", event.target.value)
                          }
                        />

                        <GearInput
                          placeholder="Marca"
                          value={gear.brand}
                          onChange={(event) =>
                            updateGearField(index, "brand", event.target.value)
                          }
                        />

                        <GearInput
                          placeholder="Modelo"
                          value={gear.model}
                          onChange={(event) =>
                            updateGearField(index, "model", event.target.value)
                          }
                        />

                        <GearInput
                          placeholder="Link do produto (opcional)"
                          value={gear.link}
                          onChange={(event) =>
                            updateGearField(index, "link", event.target.value)
                          }
                        />

                        <GearInput
                          placeholder="Detalhes (ex.: mecânico, sem fio, 75%)"
                          value={gear.details}
                          onChange={(event) =>
                            updateGearField(index, "details", event.target.value)
                          }
                        />
                      </GearGrid>
                    </GearRow>
                  ))}
                </GearList>

                <Hint>
                  Dica: os itens sem nome não serão enviados na publicação.
                </Hint>
              </GearSection>

              <Input
                label="Título"
                placeholder="Ex.: Setup Front-end compacto"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
                error={errors.title}
              />

              <Input
                label="Cargo / área"
                placeholder="Ex.: Front-end Developer"
                value={form.workRole}
                onChange={(e) => updateField("workRole", e.target.value)}
                error={errors.workRole}
              />

              <Input
                label="Stack (separado por vírgula)"
                placeholder="React, Next.js, TypeScript"
                value={form.softwareStack}
                onChange={(e) => updateField("softwareStack", e.target.value)}
              />

              <Input
                label="Tags (separado por vírgula)"
                placeholder="frontend, remote, minimalista"
                value={form.tags}
                onChange={(e) => updateField("tags", e.target.value)}
              />

              <TextareaWrap>
                <Label htmlFor="setup-description">Descrição</Label>
                <Textarea
                  id="setup-description"
                  $error={!!errors.description}
                  placeholder="Descreva seu setup, objetivos, ergonomia, produtividade..."
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
                {errors.description ? (
                  <ErrorText>{errors.description}</ErrorText>
                ) : (
                  <Hint>
                    Explique o contexto de uso e o que faz esse setup ser bom.
                  </Hint>
                )}
              </TextareaWrap>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Publicando..." : "Publicar setup"}
              </Button>
            </Form>

            {submitted ? (
              <Success>
                Postagem mock criada: <strong>{submitted.title}</strong>
              </Success>
            ) : null}
          </Card>

          
        </Grid>
      </Container>
    </Page>
  );
}
