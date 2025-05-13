'use client';
import { Category } from '@/app/dtos/categories.dtos';
import { Button } from '@/components/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@/components/Table';
import { RiPencilLine } from '@remixicon/react';
import { CategoryDelete } from './category-delete';
import { CategoryDialog } from './category-dialog';
import { JSX, useState } from 'react';

export const CategoryTable = ({
  categories,
}: {
  categories: Category[];
}): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <Table>
        <TableHead>
          <TableRow className='border-b border-tremor-border dark:border-dark-tremor-border'>
            <TableHeaderCell className='text-tremor-content-strong dark:text-dark-tremor-content-strong'>
              Nombre
            </TableHeaderCell>
            <TableHeaderCell className='text-tremor-content-strong dark:text-dark-tremor-content-strong text-right'>
              Acciones
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
                {category.name}
              </TableCell>
              <TableCell className='text-right'>
                {/* <CategoryDialog category={category}> */}
                <Button
                  onClick={() => handleEditCategory(category)}
                  variant='secondary'
                  className='cursor-pointer mr-4'
                >
                  <RiPencilLine size={16} />
                </Button>
                {/* </CategoryDialog> */}
                <CategoryDelete id={category.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CategoryDialog category={selectedCategory} />
    </>
  );
};
