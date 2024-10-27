import React from "react";
import Form from "@/app/ui/portfolio/project/create-form";
import { fetchSkills } from "@/app/lib/data";

interface PageProps {
  onClose: () => void;
}

export default async function Page({ onClose }: PageProps) {
  const skills = await fetchSkills();

  return (
    <div className="container mt-12">
      <Form skills={skills} onClose={() => onClose} />
    </div>
  );
}
