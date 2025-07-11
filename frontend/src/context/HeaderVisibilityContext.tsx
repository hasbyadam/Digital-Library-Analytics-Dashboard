// context/HeaderVisibilityContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

const HeaderVisibilityContext = createContext<{
  showHeader: boolean;
  setShowHeader: (value: boolean) => void;
}>({
  showHeader: true,
  setShowHeader: () => {},
});

export const HeaderVisibilityProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [showHeader, setShowHeader] = useState(true);
  return (
    <HeaderVisibilityContext.Provider value={{ showHeader, setShowHeader }}>
      {children}
    </HeaderVisibilityContext.Provider>
  );
};

export const useHeaderVisibility = () => useContext(HeaderVisibilityContext);
