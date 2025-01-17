"use client";

import { useEngageStore } from "@/providers/engage-provider-store";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

const CartNav: React.FC = () => {
  const { cartItems } = useEngageStore((state) => state);
  const cartCount = cartItems.length;
  return (
    <>
      <div className="cart-nav flex items-center gap-2">
        <FaShoppingCart size={28} className={cartItems.length > 0 ? "text-emerald-400" : ""} />
        <p>{cartCount}</p>
      </div>
    </>
  );
};

export default CartNav;
