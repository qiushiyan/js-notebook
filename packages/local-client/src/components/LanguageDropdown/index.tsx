import React, { ChangeEvent, useState } from "react";
import { useActions } from "../../hooks";
import { CellLanguages } from "../../redux";

interface LanguageDropdownProps {
  id: string;
  initialLanguage: CellLanguages;
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({
  id,
  initialLanguage,
}) => {
  const { updateCellLanguage } = useActions();
  const [language, setLanguage] = useState<CellLanguages>(initialLanguage);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as CellLanguages);
    updateCellLanguage({ id, language: e.target.value as CellLanguages });
  };

  return (
    <div className="select is-primary">
      <select value={language} onChange={handleChange}>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
      </select>
    </div>
  );
};

export default LanguageDropdown;
