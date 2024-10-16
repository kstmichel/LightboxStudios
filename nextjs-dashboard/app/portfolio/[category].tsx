import React from "react";
import TabClient from "@/app/ui/portfolio/tab-client";
import { fetchProjectsByPortfolioCategory, fetchSkills } from "@/app/lib/data";
import { Project, portfolioPanels } from "@/app/lib/definitions";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const initialCategory = params.category || portfolioPanels[0].id;
  const page = 1;
  const initialData = await fetchProjectsByPortfolioCategory(
    initialCategory,
    page,
  );
  const skillsLibrary = await fetchSkills();

  const updatedInitialData: Project[] = await Promise.all(
    initialData.map(async (project) => {
      return {
        ...project,
        skills: skillsLibrary.filter((skill) =>
          project.skills.includes(skill.id),
        ),
      };
    }),
  );

  return (
    <TabClient
      category={initialCategory}
      page={page}
      initialData={updatedInitialData}
    />
  );
}
