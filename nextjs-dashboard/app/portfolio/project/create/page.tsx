import React from "react";
import CreateForm from "@/app/ui/portfolio/project/create-form";
import { fetchSkills } from "@/app/lib/data";
import { PortfolioCategoryKeys } from "@/app/lib/definitions";

interface PageProps {
  category: string;
  onClose: () => void;
}

export default async function Page({ category, onClose }: PageProps) {
  const skills = await fetchSkills();

  return (
    <div className="container mt-12">
      <CreateForm type={category as PortfolioCategoryKeys} skills={skills} onClose={() => onClose} />
    </div>
  );
}
