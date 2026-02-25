"use client";

import { FormEvent, useContext, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, Sun, Moon, User, LogOut, Settings, Plus } from "lucide-react";
import { ThemeToggleContext } from "../ThemeClientProvider";
import { Avatar } from "../ui/Avatar";

const NavContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  min-height: 70px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 2rem;
  transition: background-color 0.3s ease;

  @media (max-width: 900px) {
    height: auto;
    flex-wrap: wrap;
    align-items: center;
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }
`;
const UserMenuContainer = styled.div`
  position: relative; /* Isso é crucial para o menu flutuar colado ao Avatar */
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 120%;
  right: 0;
  width: 200px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  flex-direction: column;
  padding: 0.5rem;
  z-index: 100;
`;
const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 0.875rem;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const DropdownDivider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 0.5rem 0;
`;

const LogoutAction = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  color: #ef4444;
  background: transparent;
  border: none;
  font-size: 0.875rem;
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  width: 100%;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(
      239,
      68,
      68,
      0.1
    ); /* Fundo vermelho translúcido no hover */
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};

  a {
    text-decoration: none;
    color: inherit;
  }

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }
`;
const ShortcutKey = styled.kbd`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 0.75rem;
  font-family: inherit;
  color: ${({ theme }) => theme.colors.textSecondary};
  pointer-events: none; /* Impede que o clique no atalho roube o foco do input */

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 400px;
  min-width: 0;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  input {
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    width: 100%;
    margin-left: 8px;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  @media (max-width: 900px) {
    order: 3;
    max-width: none;
    flex: 1 0 100%;
  }
`;

const SEARCH_ENABLED_ROUTES = new Set(["/", "/setups"]);

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 900px) {
    margin-left: auto;
    gap: 0.5rem;
  }
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => `${theme.colors.primary}1A`};
  }
`;

const CreateLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  text-decoration: none;
  padding: 0.55rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.875rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 640px) {
    span {
      display: none;
    }

    padding: 0.55rem;
  }
`;

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { toggleTheme, isDark } = useContext(ThemeToggleContext);
  const [modifierKey] = useState<string>(() => {
    const isMac = navigator.userAgent.toUpperCase().indexOf("MAC") >= 0;
    return isMac ? "⌘" : "Ctrl";
  });
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDebounceRef = useRef<number | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const applySearch = (rawValue: string) => {
    if (searchDebounceRef.current) {
      window.clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = window.setTimeout(() => {
      const normalized = rawValue.trim();
      const onSearchRoute = pathname ? SEARCH_ENABLED_ROUTES.has(pathname) : false;
      const targetPath = normalized ? (onSearchRoute ? pathname : "/setups") : pathname;

      if (!targetPath) return;

      const params = new URLSearchParams(searchParams.toString());

      if (normalized) {
        params.set("q", normalized);
      } else {
        params.delete("q");
      }

      const nextUrl = params.toString() ? `${targetPath}?${params.toString()}` : targetPath;
      const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

      if (nextUrl !== currentUrl) {
        router.replace(nextUrl);
      }
    }, 300);
  };

  useEffect(() => {
    const nextQuery = searchParams.get("q") ?? "";
    if (searchInputRef.current && searchInputRef.current.value !== nextQuery) {
      searchInputRef.current.value = nextQuery;
    }
  }, [searchParams]);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) {
        window.clearTimeout(searchDebounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentUser = {
    name: "Inácio",
    avatarUrl: "",
  };

  const handleLogout = () => {
    console.log("Saindo do sistema...");
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchInputRef.current?.blur();
  };

  return (
    <NavContainer>
      <Logo>
        <Link href="/">DevStack</Link>
      </Logo>

      <SearchWrapper onSubmit={handleSearchSubmit}>
        <Search size={18} color="#64748b" />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Buscar por setups"
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(event) => applySearch(event.target.value)}
        />
        {modifierKey && (
          <ShortcutKey>
            {modifierKey} <span>K</span>
          </ShortcutKey>
        )}
      </SearchWrapper>

      <ActionsContainer>
        <CreateLink href="/setups/new" title="Criar postagem">
          <Plus size={16} />
          <span>Criar</span>
        </CreateLink>

        <IconButton onClick={toggleTheme} title="Alternar Tema">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </IconButton>

        <UserMenuContainer ref={menuRef}>
          <Avatar
            src={currentUser.avatarUrl}
            fallback={currentUser.name}
            size={36}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          />

          <DropdownMenu $isOpen={isDropdownOpen}>
            <DropdownItem
              href="/profile"
              onClick={() => setIsDropdownOpen(false)}
            >
              <User size={16} />
              Meu Perfil
            </DropdownItem>

            <DropdownItem
              href="/settings"
              onClick={() => setIsDropdownOpen(false)}
            >
              <Settings size={16} />
              Configurações
            </DropdownItem>

            <DropdownDivider />

            <LogoutAction onClick={handleLogout}>
              <LogOut size={16} />
              Sair
            </LogoutAction>
          </DropdownMenu>
        </UserMenuContainer>
      </ActionsContainer>
    </NavContainer>
  );
}
