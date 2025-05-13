import { z } from 'zod';

export const productSchema = z.object({
  id: z.number().optional(), // opcional si se autogenera
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().optional(),
  price: z.number().nonnegative('El precio debe ser mayor o igual a 0'),
  imageUrl: z.string().url('URL de imagen inválida'),
  categoryId: z.number().int('ID de categoría inválido'),
  type: z.enum(['physical', 'digital'], {
    required_error: 'El tipo de producto es requerido',
  }),
  fileUrl: z.string().url('URL de archivo inválida').optional(), // solo si es digital
});
