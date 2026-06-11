import { useState } from "react";

export function useToggleSections(initialSections = []) {
  // 토글 타이틀
  const [openSections, setOpenSections] = useState(initialSections);

  const toggleSection = (section) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((item) => item !== section)
        : [...prev, section],
    );
  };

  return { openSections, toggleSection };
}
