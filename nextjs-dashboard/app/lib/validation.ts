import { FormFields } from "@/app/lib/definitions";
import formidable from "formidable";
import { z } from "zod"; // used to validate form data

export interface ValidationErrors {
    [key: string]: string 
}  
  
interface ValidationResponse {
    success: boolean;
    error?: string; // JSON stringified array of ValidationError objects
    message?: string;
    data?: FormFields; // Add data property to hold validated data
}

export const validateClientFields = (fields: FormFields) => {
    const errors: ValidationErrors = {};
    if (!fields.title) errors.title = 'Title is required';
    if (!fields.description) errors.description = 'Description is required';
    if (fields.description.toString().length >= 255) errors.description = "Description needs to be less than 255 characters";
    if (!fields.image_url) errors.image_url = 'Image URL is required';
    if (!fields.alt) errors.alt = 'Image description is required';
    if (!fields.type) errors.type = 'Category is required';
    if (!fields.skills) errors.skills = 'Skills are required';
    return errors;
};

// Validation schema
export const FormSchema = z.object({
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
  
export const validateFieldsForServer = (fields: formidable.Fields<string>): Promise<ValidationResponse> => {
    const validatedFields = FormSchema.safeParse({
        id: String(fields.id),
        title: String(fields.title),
        description: String(fields.description),
        image_url: String(fields.image_url),
        alt: String(fields.alt),
        type: String(fields.type),
        skills: fields.skills,
    });

    if (!validatedFields.success) {
        return Promise.resolve({
            success: false,
            error: JSON.stringify(validatedFields.error.errors),
            message: 'Fields validation failed',
            data: undefined
        });
    }

    return Promise.resolve({
        success: true,
        error: validatedFields?.error,
        message: 'Fields validated successfully',
        data: validatedFields.data
    }); 
}