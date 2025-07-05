
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FontSizeContextType {
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
  getFontSizeClass: () => string;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export const FontSizeProvider = ({ children }: { children: ReactNode }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  const resetFontSize = () => {
    setFontSize(16);
  };

  const getFontSizeClass = () => {
    if (fontSize <= 12) return 'text-xs';
    if (fontSize <= 14) return 'text-sm';
    if (fontSize <= 16) return 'text-base';
    if (fontSize <= 18) return 'text-lg';
    if (fontSize <= 20) return 'text-xl';
    if (fontSize <= 22) return 'text-2xl';
    return 'text-3xl';
  };

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize, resetFontSize, getFontSizeClass }}>
      <div style={{ fontSize: `${fontSize}px` }} className={`${getFontSizeClass()}`}>
        {children}
      </div>
    </FontSizeContext.Provider>
  );
};

export const useFontSize = () => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
};
