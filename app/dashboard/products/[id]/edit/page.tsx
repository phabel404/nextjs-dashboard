import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/products/breadcrumbs';
import { fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Product',
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [product] = await Promise.all([fetchCustomers]);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Products', href: '/dashboard/products' },
          {
            label: 'Edit Product',
            href: `/dashboard/products/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
