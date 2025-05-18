import { ProductWithCategory } from '@/app/dtos/products.dtos';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from '@/components/Table';
import Image from 'next/image';
import { ProductsMenu } from './products-menu';

export function ProductsTable({
  products,
}: {
  products: ProductWithCategory[];
}) {
  return (
    <TableRoot>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Descripción</TableHeaderCell>
            <TableHeaderCell>Precio</TableHeaderCell>
            <TableHeaderCell>Imagen</TableHeaderCell>
            <TableHeaderCell>Categoría</TableHeaderCell>
            <TableHeaderCell>Tipo</TableHeaderCell>
            <TableHeaderCell className='text-right'>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell className='max-w-[200px] overflow-hidden text-ellipsis'>
                {item.description}
              </TableCell>
              <TableCell className='text-right'>S/ {item.price}</TableCell>
              <TableCell>
                <Image
                  src={`${item.imageUrl}?v=${item.updatedAt?.getTime()}`}
                  alt={item.title}
                  width={50}
                  height={50}
                  className='rounded'
                  priority
                />
              </TableCell>
              <TableCell>{item.categoryName}</TableCell>
              <TableCell>
                {item.type === 'physical' ? 'Físico' : 'Digital'}
              </TableCell>
              <TableCell className='text-right'>
                <ProductsMenu product={item} />
              </TableCell>
            </TableRow>
          ))}
          {products.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className='text-center'>
                No hay productos
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableRoot>
  );
}
