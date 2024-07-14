"use client";
import React, { useEffect, useState } from "react";
import classes from "./theme-switcher.module.css";

const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button onClick={toggleTheme} className={classes.themeSwitcher}>
      {theme === "dark" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="800"
          height="800"
          viewBox="0 0 24 24"
          className={classes.icon}
        >
          <path d="M18 12a6 6 0 11-12 0 6 6 0 0112 0z"></path>
          <path
            fillRule="evenodd"
            d="M12 1.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM4.399 4.399a.75.75 0 011.06 0l.393.392a.75.75 0 01-1.06 1.061l-.393-.393a.75.75 0 010-1.06zm15.202 0a.75.75 0 010 1.06l-.393.393a.75.75 0 01-1.06-1.06l.393-.393a.75.75 0 011.06 0zM1.25 12a.75.75 0 01.75-.75h1a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zm19 0a.75.75 0 01.75-.75h1a.75.75 0 010 1.5h-1a.75.75 0 01-.75-.75zm-2.102 6.148a.75.75 0 011.06 0l.393.393a.75.75 0 11-1.06 1.06l-.393-.393a.75.75 0 010-1.06zm-12.296 0a.75.75 0 010 1.06l-.393.393a.75.75 0 11-1.06-1.06l.392-.393a.75.75 0 011.061 0zM12 20.25a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          ></path>
        </svg>
      ) : (
        <svg
          className={classes.icon}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
      <span className="sr-only">
        {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
