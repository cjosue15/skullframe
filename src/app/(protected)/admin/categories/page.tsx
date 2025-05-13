// 'use client';

import { Category } from '@/app/dtos/categories.dtos';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { db } from '@/db/index';
import { categoriesTable } from '@/db/schema';
import { RiAddLine } from '@remixicon/react';
import { CategoryDialog } from './category-dialog';
import { CategoryTable } from './category-table';

async function getCategories() {
  try {
    const data = (await db.select().from(categoriesTable)) as Category[];
    return data;
  } catch (error) {
    throw new Error('Error fetching categories');
  }
}

export default async function CategoriesPage() {
  // const [open, setOpen] = useState(false);
  // const [categories, setCategories] = useState<CategorySchema[]>([]);

  // useEffect(() => {
  //   async function fetchCategories() {
  //     try {
  //       const response = await fetch('/api/categories');
  //       if (!response.ok) {
  //         throw new Error('Error fetching categories');
  //       }
  //       const data = await response.json();
  //       console.log('Categories fetched successfully:', data);
  //       setCategories(data);
  //     } catch (error) {
  //       console.error('Error fetching categories:', error);
  //     }
  //   }

  //   fetchCategories();
  // }, []);

  const categories = await getCategories();

  return (
    <section>
      <div className='mb-6 mt-4 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold mb-2'>Categorias</h1>
          <p className='text-black'>Controla tus categorias y sus detalles.</p>
        </div>

        <CategoryDialog>
          <Button
            className='font-semibold cursor-pointer'
            // onClick={() => setOpen(true)}
          >
            Crear categoría <RiAddLine className='ml-2' size={16} />
          </Button>
        </CategoryDialog>
      </div>

      {/* <CategoryDialog isOpen={open} onClose={() => setOpen(false)} /> */}

      <Card>
        <CategoryTable categories={categories} />
      </Card>
    </section>
  );
}
