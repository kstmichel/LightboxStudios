import { NextApiRequest, NextApiResponse } from "next";
import { createProject } from "app/lib/actions"; 
import { PortfolioCategoryKeys} from "app/lib/definitions";
import { z } from "zod"; // used to validate form data
import formidable from 'formidable';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Validation schema for Project form
const ProjectFormSchema = z.object({
    id: z.string(),
    title: z.string({ required_error: "Please include a title." })
      .trim()
      .min(1, { message: "Title cannot be empty or just whitespace." }),  
    description: z.string({ required_error: "Please include a description." })
    .trim()
    .min(1, { message: "Description cannot be empty or just whitespace." }),
    image_url: z.string({ required_error: "Image is required." })
    .trim()
    .min(1, { message: "Image cannot be empty or just whitespace." }),
    alt: z.string({ required_error: "Please include alt text." })
      .trim()
      .min(1, { message: "Alt text cannot be empty or just whitespace." }),
    type: z.enum(["web_development", "game", "ui_design"], {
      invalid_type_error: "Please select a project type.",
    }),
    skills: z.array(z.string())
    .transform((skills) => skills.filter(skill => skill.trim() !== ""))
    .refine((skills) => skills.length > 0, { message: "Please select at least one skill." }),
  });
  
  const CreateProject = ProjectFormSchema;
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
  ) {

    if (req.method === 'POST') {
        const form = formidable({ multiples: true });

        form.parse(req, async (err, fields) => {
            if(err) {
                return res.status(500).json({ message: 'Failed to parse form data' });
            }
        
            try {

                const validatedFields = CreateProject.safeParse({
                    id: String(fields.id),
                    title: String(fields.title),
                    description: String(fields.description),
                    image_url: String(fields.image_url),
                    alt: String(fields.alt),
                    type: String(fields.type),
                    skills: fields.skills,
                });

                if (!validatedFields.success) {
                return res.status(400).json({ errors: validatedFields.error.errors });
                }

                const response = await createProject({
                ...validatedFields.data,
                type: validatedFields.data.type as PortfolioCategoryKeys
                });

                res.status(200).json(response);

            } catch (error) {
                console.error("Failed to update project:", error);
                res.status(500).json({ message: error instanceof Error ? error.message : 'Unknown error' });
            }
            });
    
     }  else {
      res.setHeader('Allow', ['DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }