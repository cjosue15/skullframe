'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { revalidate } from '@/app/actions/revalidate';
import {
  Category,
  categorySchema,
  CategorySchema,
} from '@/app/dtos/categories.dtos';
import { Button } from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog';
import { Input } from '@/components/Input';
import { PropsWithChildren, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { createCategory, updateCategory } from './actions';

interface CategoryDialogProps extends PropsWithChildren {
  category?: Category;
}

export const CategoryDialog = ({ category, children }: CategoryDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  });

  useEffect(() => {
    if (category) {
      setIsOpen(true);
      setValue('name', category.name);
    }
  }, [category]);

  const text = category
    ? 'Editar categoría'
    : isLoading
    ? 'Cargando...'
    : 'Crear categoría';

  async function onSubmit(values: CategorySchema) {
    try {
      setIsLoading(true);
      const isEditing = !!category;

      if (isEditing) {
        await updateCategory(category.id, values.name);
      } else {
        await createCategory(values.name);
      }

      reset();
      setIsOpen(false);
      toast.success(
        `Categoría ${category ? 'actualizada' : 'creada'} correctamente`
      );
    } catch (error) {
      toast.error(
        `Error ${category ? 'actualizando' : 'creando'} la categoría`
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>
            {category ? 'Edita una categoría' : 'Crea una categoría'}
          </DialogTitle>
          <DialogDescription title='Crea o edita una categoría' />

          <form onSubmit={handleSubmit(onSubmit)} className='mt-2'>
            <div>
              <Input
                hasError={!!errors.name}
                {...register('name')}
                type='text'
              />

              {errors.name && (
                <p className='text-red-600 text-sm mt-2'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className='mt-6 flex justify-end'>
              <Button
                className='w-full sm:mt-0 sm:w-fit sm:mr-2'
                variant='secondary'
                type='button'
                onClick={() => setIsOpen(false)}
              >
                Cerrar
              </Button>
              <Button
                type='submit'
                className='w-full mt-2 sm:mt-0 sm:w-fit'
                isLoading={isLoading}
              >
                {text}
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
