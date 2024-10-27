"use server";
import { object, string, array as zodArray, coerce, enum as zodEnum } from "zod"; // used to validate form data
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { UUID } from "./definitions";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export type ProjectState = {
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

const FormSchema = object({
  id: string(),
  customerId: string({ invalid_type_error: "Please select a customer" }),
  amount: coerce.number().gt(0, { message: "Amount must be greater than 0" }),
  status: zodEnum(["pending", "paid"], {
    invalid_type_error: "Please select a status",
  }),
  date: string(),
});

const ProjectFormSchema = object({
  id: string(),
  title: string({ required_error: "Please include a title." }),
  description: string({ required_error: "Please include a description." }),
  image_url: string({ required_error: "Image is required." }),
  alt: string({ required_error: "Please include alt text." }),
  type: zodEnum(["web_development", "game", "ui_design"], {
    invalid_type_error: "Please select a project type.",
  }),
  skills: zodArray(string()).nonempty({ message: "Please select at least one skill." }),
});

const CreateProject = ProjectFormSchema.omit({ id: true });
const EditProject = ProjectFormSchema;

export async function createProject(
  prevState: ProjectState,
  formData: FormData,
) {
  console.log("createProject:", formData, formData.get("skills"));

  const validatedFields = CreateProject.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image_url: formData.get("image_url"),
    alt: formData.get("alt"),
    type: formData.get("type"),
    skills: formData.get("skills"),
  });

  console.log("validatedFields.success:", validatedFields.success);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Project.",
    };
  }

  // Prepare data for insertion into the database
  const { title, description, image_url, alt, type, skills }: { title: string; description: string; image_url: string; alt: string; type: string; skills: UUID[] } = 
      validatedFields.data;

  try {
    console.log("INSERT", `
      INSERT INTO projects (title, description, image_url, alt, type, skills)
      VALUES (${title}, ${description}, ${image_url}, ${alt}, ${type}, {${skills.join(',')}})
  ` );
    await sql`
            INSERT INTO projects (title, description, image_url, alt, type, skills)
            VALUES (${title}, ${description}, ${image_url}, ${alt}, ${type}, {${skills.join(',')}})
        `;
     
  } catch (error) {
    console.log("error inserting data", error);

    return {
      message: "Database Error - Failed to create project",
      error: error,
    };
  }

  console.log("revalidating path");
  revalidatePath("/dashboard/portfolio");

  console.log("redirecting");
  redirect(`/dashboard/portfolio?query=${type}`);
}

export async function editProject(prevState: ProjectState, formData: FormData) {
  console.log("editProject:", formData, formData.getAll("skills"));

  const validatedFields = EditProject.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    image_url: formData.get("image_url"),
    alt: formData.get("alt"),
    type: formData.get("type"),
    skills: formData.getAll("skills"),
  });

  // Forms with lots of fields can be converted to a plain object like this:
  // const rawFormData = Object.fromEntries(formData.entries())
  console.log(
    "Validated Fields:",
    validatedFields,
    "formgetter",
    formData.get("title"),
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Project.",
    };
  }

  // Prepare data for insertion into the database
  const { id, title, description, image_url, alt, type, skills }: { id: string, title: string; description: string; image_url: string; alt: string; type: string; skills: UUID[] } = 
    validatedFields.data;
  console.log("skills prior to update", skills, skills.toString());

  try {
    await sql`
           UPDATE projects
           SET title = ${title},
                description = ${description},
                image_url = ${image_url},
                alt = ${alt},
                type = ${type},
                skills = ${skills.toString()}
            WHERE id = ${id}
        `;
  } catch (error) {
    console.log("error inserting data", error);

    return {
      message: "Database Error - Failed to edit project",
      error: error,
    };
  }

  console.log("revalidating path");
  revalidatePath("/dashboard/portfolio");

  console.log("redirecting");
  redirect(`/dashboard/portfolio?query=${type}`);
}

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  // Forms with lots of fields can be converted to a plain object like this:
  // const rawFormData = Object.fromEntries(formData.entries())

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  //TODO: install moment.js and handle these dates more robustly
  const date = new Date().toISOString().split("T")[0];

  try {
    await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
  } catch (error) {
    return {
      message: "Database Error - Failed to create invoice",
      error: error,
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Invoice.",
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: "Database Error - Failed to update invoice",
      error: error,
    };
  }

  revalidatePath("/dashboard/invoices");
  redirect("/dashboard/invoices");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`
            DELETE FROM invoices
            WHERE id = ${id}
            `;
  } catch (error) {
    return {
      message: "Database Error - Failed to delete invoice",
      error: error,
    };
  }

  revalidatePath("/dashboard/invoices");
}
