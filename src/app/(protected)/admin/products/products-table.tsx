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
              <TableCell>{item.description}</TableCell>
              <TableCell className='text-right'>S/ {item.price}</TableCell>
              <TableCell>
                <Image
                  src={item.imageUrl}
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
        </TableBody>
      </Table>
    </TableRoot>
  );
}
