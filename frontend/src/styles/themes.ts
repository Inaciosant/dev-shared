
export const lightTheme = {
  colors: {
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textSecondary: '#64748b',
    primary: '#0284c7',
    border: '#e2e8f0',
    divider: 'rgb(195, 198, 202)',
    footer: '#f1f5f9',
    borderFotter: '#acadafad',
  }
};

export const darkTheme = {
  colors: {
    background: '#020617',
    surface: '#0f172a',
    text: '#f8fafc',
    textSecondary: '#94a3b8',
    primary: '#38bdf8',
    border: '#1e293b',
    divider: '#1e293b',
    footer: '#0f172a',
    borderFotter: '#e2e8f0',
  }
  
};

export type ThemeType = typeof lightTheme;