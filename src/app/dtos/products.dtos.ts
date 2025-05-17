import { z } from 'zod';

// export const productSchema = z.object({
//   id: z.number().optional(), // opcional si se autogenera
//   title: z.string().min(1, 'El título es requerido'),
//   description: z.string().optional(),
//   price: z.number().nonnegative('El precio debe ser mayor o igual a 0'),
//   imageUrl: z.string().url('URL de imagen inválida'),
//   categoryId: z.number().int('ID de categoría inválido'),
//   type: z.enum(['physical', 'digital'], {
//     required_error: 'El tipo de producto es requerido',
//   }),
//   fileUrl: z.string().url('URL de archivo inválida').optional(), // solo si es digital
// });

export const productSchema = z.object({
  id: z.number().optional(), // opcional si se autogenera
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  price: z
    .number({ coerce: true })
    .min(1, 'El precio debe ser mayor o igual a 1'),
  categoryId: z
    .number({ required_error: 'La categoría es requerida' })
    .int('La categoría es requerida'),
  type: z.enum(['physical', 'digital'], {
    required_error: 'El tipo de producto es requerido',
  }),
  // file: z.instanceof(File).refine((file) => {
  //   const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  //   return validTypes.includes(file.type);
  // }
  // ).optional(), // solo si es digital
  // imageFile: z.instanceof(File).refine((file) => {
  //   const validTypes = ['image/jpeg', 'image/png'];
  //   return validTypes.includes(file.type);
  // }),
  imageFile: z
    .instanceof(File, { message: 'La imagen es obligatoria' })
    .refine((file) => file.size > 0, { message: 'La imagen es obligatoria' }),
  // .optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;
export interface Product {
  id?: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  type: 'physical' | 'digital';
  fileUrl?: string;
}
