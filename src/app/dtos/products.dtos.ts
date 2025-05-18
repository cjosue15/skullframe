import { z } from 'zod';

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
  slug: z.string().min(1, 'El slug es requerido'),
  imageFile: z
    .instanceof(File, { message: 'La imagen es obligatoria' })
    .refine((file) => file.size > 0, { message: 'La imagen es obligatoria' }),
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
  slug: string;
  fileUrl?: string;
}
