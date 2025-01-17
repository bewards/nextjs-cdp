"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "../../ui/button/button";
import { useEngageStore } from "@/providers/engage-provider-store";

const SearchBar: React.FC = () => {
  const [searchVal, setSearchVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { engage, addSearchQuery, searches } = useEngageStore((store) => store);
  const currentPath = usePathname();

  return (
    <div className="w-full max-w-sm min-w-[200px]">
      <div className="relative">
        <input
          className="w-full bg-transparent placeholder:text-slate-400 text-slate-300 text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          placeholder="Send a SEARCH event..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
        />
        <Button
          variant={"none"}
          size={"none"}
          icon={<AiOutlineSearch />}
          isLoading={isLoading}
          onClick={() => {
            const val = searchVal.trim();
            if (!val.length) return;
            setIsLoading(true);
            engage
              ?.event(`${process.env.NEXT_PUBLIC_ENGAGE_POS}:SITE_SEARCH`, {
                query: val,
                channel: "WEB",
                currency: "USD",
                page: currentPath,
              })
              .then(() => {
                addSearchQuery(val);
                setSearchVal("");
                setIsLoading(false);
              });
          }}
          className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-500 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        >
          Search
        </Button>
      </div>
      {searches.length ? (
        <>
          <span className="block">Custom Searches Sent to CDP:</span>
          {searches?.join(", ")}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default SearchBar;
