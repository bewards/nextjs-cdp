"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FaBars, FaTools } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { RiShoppingBag3Line } from "react-icons/ri";
import { IoPersonCircle } from "react-icons/io5";
import SearchBar from "./search-bar";
import { ColorSchemesSwitcher } from "@/components/ui/color-schemes-switcher";
import CartNav from "./cart-nav";

const MainHeader: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const currentPath = usePathname();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href={"/"}>
            <FaTools className={currentPath === "/" ? "text-2xl me-5 text-emerald-500" : "text-2xl me-5"} />
          </Link>
          <nav className="flex gap-4 justify-between ms-3">
            <Link
              href={"/identify"}
              className={
                currentPath === "/identify"
                  ? "hidden md:flex gap-2 text-lg flex items-center text-emerald-400 font-semibold"
                  : "hidden md:flex gap-2 text-lg flex items-center"
              }
            >
              <IoPersonCircle />
              Identify
            </Link>
            <Link
              href={"/shop"}
              className={
                currentPath === "/shop"
                  ? "hidden md:flex gap-2 text-lg flex items-center text-emerald-400 font-semibold"
                  : "hidden md:flex gap-2 text-lg flex items-center"
              }
            >
              <RiShoppingBag3Line />
              Shop
            </Link>
            <Link
              href={"/appliances"}
              className={
                currentPath === "/appliances"
                  ? "hidden md:block text-lg text-emerald-400 font-semibold"
                  : "hidden md:block text-lg"
              }
            >
              Appliances
            </Link>
            <Link
              href={"/building-supplies"}
              className={
                currentPath === "/building-supplies"
                  ? "hidden md:block text-lg text-emerald-400 font-semibold"
                  : "hidden md:block text-lg"
              }
            >
              Building Supplies
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <SearchBar />
          <CartNav />
          <ColorSchemesSwitcher />
        </div>
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            {menuOpen ? <AiOutlineClose /> : <FaBars />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-2 flex flex-col gap-2 pt-4 mt-4 border-t border-slate-500">
          <Link
            href={"/products"}
            className={currentPath === "/products" ? "text-lg text-emerald-400 font-semibold" : "text-lg"}
          >
            Products
          </Link>
          <Link
            href={"/appliances"}
            className={currentPath === "/appliances" ? "text-lg text-emerald-400 font-semibold" : "text-lg"}
          >
            Appliances
          </Link>
        </div>
      )}
    </header>
  );
};

export default MainHeader;
