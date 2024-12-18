import { NextApiRequest, NextApiResponse } from "next";
import { fetchProjectsByPortfolioCategory, fetchSkills } from "app/lib/data";
import { Project, Skill } from "@/app/lib/definitions";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { category, page } = req.query;

  // Validate category
  if (typeof category !== "string") {
    return res.status(400).json({ error: "Invalid category" });
  }

  // Validate and convert page
  const pageNumber = parseInt(page as string, 10);
  if (isNaN(pageNumber) || pageNumber < 1) {
    return res.status(400).json({ error: "Invalid page number" });
  }

  try {
    const projects = await fetchProjectsByPortfolioCategory(
      category,
      pageNumber,
    );

    const skillsLibrary: Skill[] = await fetchSkills();

    const updatedProjects: Project[] = await Promise.all(
      projects.map(async (project) => {
        return {
          ...project,
          skills: skillsLibrary.filter((skill) =>
            project.skills.includes(skill.id),
          ),
        };
      }),
    );

    res.status(200).json(updatedProjects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}
