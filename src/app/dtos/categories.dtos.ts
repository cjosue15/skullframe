import { z } from 'zod';

export const categorySchema = z.object({
  id: z.number().optional(), // opcional si se autogenera
  name: z.string().min(1, 'El nombre es requerido'),
});

export type CategorySchema = z.infer<typeof categorySchema>;

export interface Category {
  id: number;
  name: string;
}
