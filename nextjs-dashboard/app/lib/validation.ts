import { FormFields } from "@/app/lib/definitions";

export interface ValidationErrors {
    [key: string]: string 
}  

export const validateFields = (fields: FormFields) => {
    const errors: ValidationErrors = {};
    if (!fields.title) errors.title = 'Title is required';
    if (!fields.description) errors.description = 'Description is required';
    if (!fields.image_url) errors.image_url = 'Image URL is required';
    if (!fields.alt) errors.alt = 'Image description is required';
    if (!fields.type) errors.type = 'Category is required';
    if (!fields.skills) errors.skills = 'Skills are required';
    return errors;
};