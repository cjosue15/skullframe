import { getCategories } from '@/app/lib/querys';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { RiAddLine } from '@remixicon/react';
import { CategoryDialog } from './category-dialog';
import { CategoryTable } from './category-table';

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <section>
      <div className='mb-6 mt-4 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold mb-2'>Categorias</h1>
          <p className='text-black'>Controla tus categorias y sus detalles.</p>
        </div>

        <CategoryDialog>
          <Button className='font-semibold cursor-pointer'>
            Crear categoría <RiAddLine className='ml-2' size={16} />
          </Button>
        </CategoryDialog>
      </div>

      <Card>
        <CategoryTable categories={categories} />
      </Card>
    </section>
  );
}
