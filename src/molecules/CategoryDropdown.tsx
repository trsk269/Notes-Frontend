"use client";

import { useState, useRef, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";

interface DropdownProps {
  onCategoryChange?: (category: string) => void;
}

export default function CategoryDropdown({ onCategoryChange }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Personal");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ["Personal", "Work", "Study", "Ideas", "Important"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onCategoryChange?.(category);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div
        className="w-fit flex gap-2 items-center justify-center border border-black px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={toggleDropdown}
      >
        <p className="text-sm font-medium">{selectedCategory}</p>
        <FaAngleDown
          size={18}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <ul className="py-1">
            {categories.map((category) => (
              <li
                key={category}
                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-50 text-blue-600"
                    : ""
                }`}
                onClick={() => handleCategorySelect(category)}
              >
                <span className="text-sm">{category}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
