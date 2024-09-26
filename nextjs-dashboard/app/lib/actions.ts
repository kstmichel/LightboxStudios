'use server';
import z from 'zod'; // used to validate form data
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(
        { invalid_type_error: 'Please select a customer' }
    ),
    amount: z.coerce.number()
        .gt(0, { message: 'Amount must be greater than 0' }),
    status: z.enum(['pending', 'paid'], 
        { invalid_type_error: 'Please select a status' }
    ),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
    
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    
    // Forms with lots of fields can be converted to a plain object like this:
    // const rawFormData = Object.fromEntries(formData.entries())

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Invoice.',
        };
    }

    // Prepare data for insertion into the database
    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;

    //TODO: install moment.js and handle these dates more robustly
    const date = new Date().toISOString().split('T')[0];

    try {
        await sql`
            INSERT INTO invoices (customer_id, amount, status, date)
            VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
        `;
    } catch(error) {
        return  {
            message: 'Database Error - Failed to create invoice',
            error: error
        }
    };

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}


// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
export async function updateInvoice(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  if(!validatedFields.success) {
    return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Invoice.',
    }
  }

  const {customerId, amount, status} = validatedFields.data;
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
    `;
  } catch(error) {
    return {
        message: 'Database Error - Failed to update invoice',
        error: error
    }
  };

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
        await sql`
            DELETE FROM invoices
            WHERE id = ${id}
            `;
    } catch(error) {
        return {
            message: 'Database Error - Failed to delete invoice',
            error: error
        }
    };

    revalidatePath('/dashboard/invoices');
}
