"use server";
// import { object, string, array as zodArray, coerce, enum as zodEnum } from "zod"; // used to validate form data
import { sql} from "@vercel/postgres";
import { ProjectTable, UUID } from "./definitions";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type ProjectState = {
  success: boolean,
  errors?: {
    title?: string[];
    description?: string[];
    image_url?: string[];
    alt?: string[];
    type?: string[];
    skills?: UUID[];
  };
  message?: string | null;
};

// const ProjectFormSchema = object({
//   id: string(),
//   title: string({ required_error: "Please include a title." })
//     .trim()
//     .min(1, { message: "Title cannot be empty or just whitespace." }),  
//   description: string({ required_error: "Please include a description." })
//   .trim()
//   .min(1, { message: "Description cannot be empty or just whitespace." }),
//   image_url: string({ required_error: "Image is required." })
//   .trim()
//   .min(1, { message: "Image cannot be empty or just whitespace." }),
//   alt: string({ required_error: "Please include alt text." })
//     .trim()
//     .min(1, { message: "Alt text cannot be empty or just whitespace." }),
//   type: zodEnum(["web_development", "game", "ui_design"], {
//     invalid_type_error: "Please select a project type.",
//   }),
//   skills: zodArray(string())
//   .transform((skills) => skills.filter(skill => skill.trim() !== ""))
//   .refine((skills) => skills.length > 0, { message: "Please select at least one skill." }),
// });

// const CreateProject = ProjectFormSchema.omit({ id: true });
// const EditProject = ProjectFormSchema;

export async function createProject(data: ProjectTable): Promise<ProjectState> {
  try {
    const { title, description, image_url, alt, type, skills } = data;
    const skillsArrayString = getSkillsArraySQLString(skills);

    await sql`
            INSERT INTO projects (title, description, image_url, alt, type, skills)
            VALUES (${title}, ${description}, ${image_url}, ${alt}, ${type}, ${skillsArrayString})`;
      
    return { 
      success: true,
      errors: {},
      message: 'Project has been created successfully.' 
    };

  } catch (error) {
    console.log("error inserting data", error);

    return {
      success: false,
      message: "Database Error - Failed to create project",
      errors: undefined,
    };
  }
}

export const updateProject = async (id: string, data: ProjectTable): Promise<ProjectState> =>{
  try {
    const { id, title, description, image_url, alt, type, skills } = data;
    const skillsArrayString = getSkillsArraySQLString(skills);

    await sql`
        UPDATE projects
        SET title = ${title},
            description = ${description},
            image_url = ${image_url},
            alt = ${alt},
            type = ${type},
            skills = ${skillsArrayString}::uuid[]
        WHERE id = ${id}
    `;    

    return { 
      success: true,
      errors: {},
      message: 'Project has been saved successfully.' 
    };
        
  } catch (error) {
    console.log("error inserting data", error);

    return {
      success: false,
      message: "Database Error - Failed to edit project",
      errors: { title: [String(error)] },
    };
  }
}

export const deleteProject = async (id: string): Promise<ProjectState> => {
  try {
    await sql`
      DELETE FROM projects
      WHERE id = ${id}`
      
    return { 
      success: true,
      errors: {},
      message: 'Project has been deleted successfully.' 
    };
    
  } catch (error) {
    return { 
      success: false,
      errors: { title: [String(error)] },
      message: 'Error occurred while deleting the Project.' 
    };
  }
}

const getSkillsArraySQLString = (skills: UUID[]) => {
  const skillsArray: string[] = skills.toString().split(",");
  return `{${skillsArray.map(skill => `"${skill}"`).join(',')}}`;
}