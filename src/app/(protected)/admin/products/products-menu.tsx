'use client';

import { ProductWithCategory } from '@/app/dtos/products.dtos';
import { Button } from '@/components/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/DropdownMenu';
import { RiDeleteBinLine, RiMore2Line, RiPencilLine } from '@remixicon/react';
import { deleteProduct } from './actions';
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
import { useState } from 'react';
import { toast } from 'sonner';

interface ProductsMenuProps {
  product: ProductWithCategory;
}

export function ProductsMenu({ product }: ProductsMenuProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteProduct(product.id!);
      toast.success('Producto eliminado correctamente');
    } catch (error) {
      console.log(error);
      toast.error('Error al eliminar el producto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost'>
          <RiMore2Line />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='min-w-28'>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <RiPencilLine size={16} className='mr-2' /> Editar
          </DropdownMenuItem>
          <AlertDialog onAccept={() => handleDelete()} isLoading={isLoading}>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
              }}
            >
              <RiDeleteBinLine size={16} className='mr-2' /> Eliminar
            </DropdownMenuItem>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AlertDialog({
  children,
  onAccept,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
  onAccept: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Eliminar Producto</DialogTitle>
          <DialogDescription className='mt-1 text-sm leading-6'>
            ¿Quieres eliminar este producto? Esta acción no se puede deshacer.
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
            variant='destructive'
            className='w-full sm:w-fit'
            onClick={onAccept}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
