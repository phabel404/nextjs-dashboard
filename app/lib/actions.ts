'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const InvoiceFormSchema = z.object({
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const ProductFormSchema = z.object({
  productId: z.string(),
  title: z.string({
    invalid_type_error: 'Plese enter product name.',
  }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  description: z.string({
    invalid_type_error: 'Plese enter product description.',
  }),
  category: z.string({
    invalid_type_error: 'Plese enter product category.',
  }),
});

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
    productId?: string[];
    title?: string[];
    description?: string[];
    price?: string[];
    category?: string[];
  };
  message?: string | null;
};

// CREATE INVOICE
const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export async function createInvoice(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // Insert data into the database
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// UPDATE INVOICE
const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
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
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// DELETE INVOICE
export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/invoices');
}

// CREATE PRODUCT
const CreateProduct = ProductFormSchema.extend({
  id: z.string({
    invalid_type_error: 'Product ID is required.',
  }),
});

export async function createProduct(prevState: State, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = CreateProduct.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    category: formData.get('category'),
    price: formData.get('price'),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  // Prepare data for insertion into the database
  const { title, description, category, price } = validatedFields.data;

  // Insert data into the database
  try {
    await sql`
      INSERT INTO products (id, title, description, category, price)
      VALUES (${title}, ${description}, ${category}, ${price})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: 'Database Error: Failed to Create Product.',
    };
  }

  // Revalidate the cache for the products page and redirect the user.
  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

// UPDATE PRODUCT
const UpdateProduct = ProductFormSchema.omit({ productId: true });

export async function updateProduct(
  productId: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdateProduct.safeParse({
    productId: formData.get('productId'),
    title: formData.get('title'),
    price: formData.get('price'),
    category: formData.get('category'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product.',
    };
  }

  const { title, description, price, category } = validatedFields.data;
  const priceInCents = price * 100;

  try {
    await sql`
      UPDATE products
      SET title = ${title}, description = ${description}, price = ${priceInCents}, category = ${category}
      WHERE id = ${productId}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Product.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

// DELETE PRODUCT
export async function deleteProducts(id: string) {
  await sql`DELETE FROM products WHERE id = ${id}`;
  revalidatePath('/dashboard/products');
}

// LOGIN AUTH
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
