import { IComment } from "@/types/comments";
import { ISetup } from "@/types/setup";

export const mockSetups: ISetup[] = [
  {
    _id: "setup-1",
    user: { _id: "u1", name: "Inácio", avatar: "" },
    title: "Setup Front-end Minimalista",
    description: "Foco em produtividade com monitor ultrawide e layout limpo.",
    workRole: "Front-end Developer",
    workModality: "Remote",
    thumbnail:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80",
    gears: [
      { _id: "g1", category: "Monitor", name: "Ultrawide 34", brand: "LG" },
      {
        _id: "g2",
        category: "Keyboard",
        name: "MX Keys Mini",
        brand: "Logitech",
        link: "https://www.amazon.com.br/dp/B08V5YQZ6P",
      },
      { _id: "g3", category: "Mouse", name: "MX Master 3S", brand: "Logitech" },
    ],
    softwareStack: ["React", "Next.js", "TypeScript", "Figma"],
    tags: ["frontend", "remote", "minimalista"],
    likes: [],
    createdAt: "2026-02-25T10:00:00.000Z",
    updatedAt: "2026-02-25T10:00:00.000Z",
  },
  {
    _id: "setup-2",
    user: { _id: "u2", name: "Marina", avatar: "" },
    title: "Desk de Full Stack para Home Office",
    description: "Dois monitores, periféricos ergonômicos e stack web completa.",
    workRole: "Full Stack Developer",
    workModality: "Hybrid",
    thumbnail:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    gears: [
      { _id: "g4", category: "Monitor", name: "Dual 27 IPS", brand: "Dell" },
      { _id: "g5", category: "Desk", name: "Mesa regulável", brand: "FlexiSpot" },
      { _id: "g6", category: "Chair", name: "Cadeira ergonômica", brand: "Elements" },
    ],
    softwareStack: ["Node.js", "PostgreSQL", "Docker", "Next.js"],
    tags: ["fullstack", "docker", "home-office"],
    likes: [],
    createdAt: "2026-02-25T10:00:00.000Z",
    updatedAt: "2026-02-25T10:00:00.000Z",
  },
  {
    _id: "setup-3",
    user: { _id: "u3", name: "Caio", avatar: "" },
    title: "Estação Mobile com foco em Flutter",
    description: "Setup para desenvolvimento mobile com testes em múltiplos devices.",
    workRole: "Mobile Developer",
    workModality: "Remote",
    thumbnail:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
    gears: [
      { _id: "g7", category: "PC/Laptop", name: "MacBook Pro 14", brand: "Apple" },
      { _id: "g8", category: "Monitor", name: "27 4K", brand: "Samsung" },
      { _id: "g9", category: "Headset", name: "WH-1000XM5", brand: "Sony" },
    ],
    softwareStack: ["Flutter", "Dart", "Firebase", "Android Studio"],
    tags: ["mobile", "flutter"],
    likes: [],
    createdAt: "2026-02-25T10:00:00.000Z",
    updatedAt: "2026-02-25T10:00:00.000Z",
  },
  {
    _id: "setup-4",
    user: { _id: "u4", name: "Lívia", avatar: "" },
    title: "Setup DevOps e Observabilidade",
    description: "Infra local com monitor dedicado para métricas e logs.",
    workRole: "DevOps Engineer",
    workModality: "Office",
    thumbnail:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    gears: [
      { _id: "g10", category: "Monitor", name: "34 Curvo", brand: "Samsung" },
      { _id: "g11", category: "PC/Laptop", name: "Workstation Linux", brand: "Custom" },
      { _id: "g12", category: "Other", name: "Deck Stream", brand: "Elgato" },
    ],
    softwareStack: ["Kubernetes", "Terraform", "Grafana", "AWS"],
    tags: ["devops", "infra", "observability"],
    likes: [],
    createdAt: "2026-02-25T10:00:00.000Z",
    updatedAt: "2026-02-25T10:00:00.000Z",
  },
];

const commentsBySetupId: Record<string, IComment[]> = {
  "setup-1": [
    {
      _id: "c1",
      setup: "setup-1",
      user: { _id: "u2", name: "Marina", avatar: "" },
      content: "Curti demais a organização e o stack. Esse monitor faz diferença.",
      createdAt: "2026-02-25T10:10:00.000Z",
      updatedAt: "2026-02-25T10:10:00.000Z",
    },
    {
      _id: "c2",
      setup: "setup-1",
      user: { _id: "u3", name: "Caio", avatar: "" },
      content: "Layout bem limpo. Você usa algum suporte articulado?",
      createdAt: "2026-02-25T10:20:00.000Z",
      updatedAt: "2026-02-25T10:20:00.000Z",
    },
  ],
  "setup-2": [
    {
      _id: "c3",
      setup: "setup-2",
      user: { _id: "u1", name: "Inácio", avatar: "" },
      content: "Setup muito completo para full stack, curti o combo Docker + Next.",
      createdAt: "2026-02-25T10:15:00.000Z",
      updatedAt: "2026-02-25T10:15:00.000Z",
    },
  ],
};

export function getSetupById(id: string) {
  return mockSetups.find((setup) => setup._id === id);
}

export function filterSetupsByQuery(setups: ISetup[], q: string) {
  const query = q.trim().toLowerCase();
  if (!query) return setups;

  return setups.filter((setup) => {
    const haystack = [
      setup.title,
      setup.workRole,
      ...setup.softwareStack,
      ...setup.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function getMockCommentsBySetupId(setupId: string): IComment[] {
  return [...(commentsBySetupId[setupId] ?? [])];
}
