"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTools } from "react-icons/fa";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";

const MainHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* <img src="/path/to/homedepot-logo.png" alt="Home Depot Logo" className="h-8 mr-4" /> */}
          <FaTools className="text-2xl me-5" />
          <Link
            href={"/products"}
            className={
              currentPath === "/products"
                ? "hidden md:block text-lg text-emerald-400 font-semibold"
                : "hidden md:block text-lg"
            }
          >
            Products
          </Link>
        </div>
        <div className="hidden md:flex items-center">
          <div className="w-full max-w-sm min-w-[200px]">
            <div className="relative">
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Send a SEARCH event..."
              />
              <button
                className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-white focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                <AiOutlineSearch />
                <span className="ms-1">Search</span>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <AiOutlineClose /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-2">
          <a href="/products" className="block p-2 bg-gray-700 rounded-md">
            Products
          </a>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
