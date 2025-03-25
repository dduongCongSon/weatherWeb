import { useTheme } from "@/context/theme-provider";
import { Moon, Sun } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import CitySearch from "./city-search";

const header = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const cloudinaryLogo = "https://res-console.cloudinary.com/dbke1s5nm/media_explorer_thumbnails/6007604ba94bab82eb4bd708d1bd0ff5/detailed";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 justify-between items-center px-4">
        <Link to={"/"}>
          <img src={cloudinaryLogo} alt="LogoPage" className="h-14" />
        </Link>
        <div className="flex gap-4">
          <CitySearch />
          <div
            onClick={() => {
              setTheme(isDark ? "light" : "dark");
            }}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${
              isDark ? "rotate-180" : "rotate-0"
            }`}
          >
            {isDark ? (
              <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default header;
