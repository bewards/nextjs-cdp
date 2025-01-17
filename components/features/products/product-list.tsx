"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button/button";
import { ApiProduct } from "@/types/api";
import { useEngageStore } from "@/providers/engage-provider-store";

interface ProductListProps {
  search: string;
}

const ProductList: React.FC<ProductListProps> = ({ search }) => {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [cartLoading, setCartLoading] = useState<ApiProduct | null>(null);
  const { addItemToCart } = useEngageStore((state) => state);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/json`);
      const data = await response.json();

      setProducts(data ? data : []);
    };

    fetchProducts();
  }, [search]);

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products &&
          products.map((product) => (
            <div key={product.productId} className="bg-white shadow-md rounded-lg p-4 text-gray-700">
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">${product.price}</p>
              <p className="text-gray-500">{product.category}</p>
              <Button
                variant={"default"}
                className="mt-4"
                disabled={cartLoading?.productId === product.productId}
                isLoading={cartLoading?.productId === product.productId}
                onClick={() => {
                  setCartLoading(product);
                  setTimeout(() => {
                    addItemToCart(product);
                    setCartLoading(null);
                  }, 1200);
                }}
              >
                {cartLoading?.productId === product.productId ? "Adding to cart..." : "Add to cart"}
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductList;
