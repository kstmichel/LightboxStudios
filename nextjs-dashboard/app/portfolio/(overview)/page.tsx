"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { portfolioPanels } from "@/app/lib/definitions";

const PortfolioIndexPage = () => {
  const router = useRouter();
  const initialCategory = portfolioPanels[0].id;

  useEffect(() => {
    console.log("Redirecting to", `/portfolio/${initialCategory}`);
    router.replace(`/portfolio/${initialCategory}`);
  }, [router, initialCategory]);

  return null;
};

export default PortfolioIndexPage;
