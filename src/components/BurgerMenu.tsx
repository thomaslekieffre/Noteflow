import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "100%" },
  };

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        className="fixed top-0 right-0 w-64 h-full bg-background shadow-lg p-4"
      >
        <button onClick={toggleMenu} className="absolute top-4 right-4">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <nav className="flex flex-col space-y-4 mt-8">
          <a href="#" className="text-lg">
            Fonctionnalités
          </a>
          <a href="#" className="text-lg">
            Tarifs
          </a>
          <a href="#" className="text-lg">
            Contact
          </a>
          <ThemeToggle />
        </nav>
      </motion.div>
    </div>
  );
};

export default BurgerMenu;
