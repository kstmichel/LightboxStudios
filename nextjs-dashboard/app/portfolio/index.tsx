import { useEffect } from "react";
import { useRouter } from "next/router";
import { portfolioPanelData } from "@/app/lib/definitions";

const PortfolioIndexPage = () => {
  const router = useRouter();
  const initialCategory = portfolioPanelData[0].id;

  useEffect(() => {
    console.log("Redirecting to", `/portfolio/${initialCategory}`);
    router.replace(`/portfolio/${initialCategory}`);
  }, [router, initialCategory]);

  return null; // Render nothing while redirecting
};

export default PortfolioIndexPage;
