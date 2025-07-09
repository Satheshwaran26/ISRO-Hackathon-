import { createContext, useContext, useState, useEffect } from "react";

const fontSizes = ["xs", "sm", "base", "lg", "xl", "2xl"] as const;
type FontSize = typeof fontSizes[number];

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  getFontSizeClass: () => string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: React.ReactNode;
}

export function FontSizeProvider({ children }: FontSizeProviderProps) {
  const [fontSize, setFontSize] = useState<FontSize>("base");

  // Apply font size to document root when fontSize changes
  useEffect(() => {
    const html = document.documentElement;
    
    // Set CSS custom property for font size scaling
    const fontSizeScale = {
      'xs': '0.75',
      'sm': '0.875',
      'base': '1',
      'lg': '1.125',
      'xl': '1.25',
      '2xl': '1.5'
    };
    
    html.style.setProperty('--font-size-scale', fontSizeScale[fontSize]);
  }, [fontSize]);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "xs":
        return "text-xs";
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      default:
        return "text-base";
    }
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const resetFontSize = () => {
    setFontSize("base");
  };

  return (
    <FontSizeContext.Provider
      value={{
        fontSize,
        setFontSize,
        getFontSizeClass,
        increaseFontSize,
        decreaseFontSize,
        resetFontSize,
      }}
    >
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
}
