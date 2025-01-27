'use client';

import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';

const COLOR_THEMES = [
  'default',
  'zinc',
  'red',
  'rose',
  'orange',
  'blue',
  'yellow',
  'violet'
] as const;
type ColorTheme = (typeof COLOR_THEMES)[number];

export function ColorThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');

  useEffect(() => {
    setMounted(true);
    // Get the initial color theme from localStorage or default
    const savedTheme = localStorage.getItem('color-theme') as ColorTheme;
    if (savedTheme && COLOR_THEMES.includes(savedTheme)) {
      setColorTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: ColorTheme) => {
    const htmlElement = document.documentElement;

    // Remove the data-theme attribute if default, otherwise set it
    if (theme === 'default') {
      htmlElement.removeAttribute('data-theme');
    } else {
      htmlElement.setAttribute('data-theme', theme);
    }

    // Save to localStorage
    localStorage.setItem('color-theme', theme);
    setColorTheme(theme);
  };

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="focus:ring-0 focus-visible:ring-0 active:ring-0"
        >
          <Palette className="size-5" />
          <span className="sr-only">Toggle color theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {COLOR_THEMES.map((theme) => (
          <DropdownMenuItem key={theme} onClick={() => applyTheme(theme)}>
            <span className={colorTheme === theme ? 'font-bold' : ''}>
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
