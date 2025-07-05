import { createContext, useContext, useState } from "react";

interface FontSizeContextType {
  fontSize: string;
  setFontSize: (size: string) => void;
  getFontSizeClass: () => string;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

interface FontSizeProviderProps {
  children: React.ReactNode;
}

const fontSizes = ["sm", "base", "lg", "xl"] as const;
type FontSize = typeof fontSizes[number];

export function FontSizeProvider({ children }: FontSizeProviderProps) {
  const [fontSize, setFontSize] = useState<FontSize>("base");

  const getFontSizeClass = () => {
    switch (fontSize) {
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
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
        resetFontSize
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
