import { ReactNode, createContext, useContext, useState } from "react";

interface ValueProvided {
  selectedType: string;
  toggleCreatureType: () => void;
}

// Create context
const CreatureTypeContext = createContext<ValueProvided>({
  selectedType: "animal",
  toggleCreatureType: () => {},
});

// Main func of this file
const CreatureTypeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // State
  const [selectedType, setSelectedType] = useState("animal");

  // Handle toggle
  const toggleCreatureType = () => {
    setSelectedType((prevType) => (prevType === "animal" ? "plant" : "animal"));
  };

  return (
    <CreatureTypeContext.Provider value={{ selectedType, toggleCreatureType }}>
      {children}
    </CreatureTypeContext.Provider>
  );
};

const useCreatureType = () => useContext(CreatureTypeContext);

export { useCreatureType, CreatureTypeProvider };
