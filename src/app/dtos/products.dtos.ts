import { z } from 'zod';

export const productSchema = z
  .object({
    id: z.number().optional(), // opcional si se autogenera
    title: z.string().min(1, 'El título es requerido'),
    shortDescription: z.string().min(1, 'La descripción corta es requerida'),
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
    // imageFile: z
    //   .instanceof(File, { message: 'La imagen es obligatoria' })
    //   .refine((file) => file.size > 0, { message: 'La imagen es obligatoria' }),
    // imageFile: z
    //   .instanceof(File, { message: 'La imagen es obligatoria' })
    //   .refine((file) => !file || file.size > 0, {
    //     message: 'La imagen es obligatoria',
    //   })
    //   .optional(),
    imageFile: z.any().optional(),
    imagePreview: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    // Si no hay archivo ni preview, error
    if (!data.imageFile && !data.imagePreview) {
      ctx.addIssue({
        path: ['imageFile'],
        code: z.ZodIssueCode.custom,
        message: 'La imagen es obligatoria',
      });
    }
    // Si hay archivo, debe ser File y tener tamaño
    if (data.imageFile && !(data.imageFile instanceof File)) {
      ctx.addIssue({
        path: ['imageFile'],
        code: z.ZodIssueCode.custom,
        message: 'La imagen debe ser un archivo',
      });
    }
  });

export type ProductSchema = z.infer<typeof productSchema>;
export interface Product {
  id?: number;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  imageUrl: string;
  categoryId: number;
  type: 'physical' | 'digital';
  slug: string;
  updatedAt?: Date;
  createdAt?: Date;
  fileUrl?: string;
}

export interface ProductWithCategory extends Product {
  categoryName: string;
}
