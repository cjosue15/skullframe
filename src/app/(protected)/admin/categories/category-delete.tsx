'use client';
import { revalidate } from '@/app/actions/revalidate';
import { Button } from '@/components/Button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/Dialog';
import { RiDeleteBinLine } from '@remixicon/react';
import { useState } from 'react';
import { toast } from 'sonner';

export const CategoryDelete = ({ id }: { id: number }) => {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Replace with actual category ID
      });

      if (!response.ok) {
        throw new Error('Error deleting category');
      }

      await response.json();
      revalidate('/admin/categories');
      toast.success('Categoría eliminada correctamente');
    } catch (error) {
      toast.error('Error al eliminar la categoría');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' className='cursor-pointer'>
          <RiDeleteBinLine size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Eliminar Categoría</DialogTitle>
          <DialogDescription className='mt-1 text-sm leading-6'>
            ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no
            se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='mt-6'>
          <DialogClose asChild>
            <Button
              className='mt-2 w-full sm:mt-0 sm:w-fit'
              variant='secondary'
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            type='submit'
            onClick={handleDelete}
            className='w-full sm:w-fit'
            isLoading={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar categoría'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
