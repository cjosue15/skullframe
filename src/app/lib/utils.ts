export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza no alfanuméricos por guion
    .replace(/^-+|-+$/g, ''); // Quita guiones al inicio/final
}

export const MEGA_NUMBER = 1;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const MAX_IMAGE_SIZE = 1024 * 1024 * MEGA_NUMBER; // 1MB

export function validateImageFile(file: {
  type: string;
  size: number;
}): string | null {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return 'Tipo de archivo no permitido. Solo JPG, PNG o WEBP.';
  }
  if (file.size > MAX_IMAGE_SIZE) {
    return `El tamaño del archivo debe ser menor a ${MEGA_NUMBER}MB.`;
  }
  return null;
}
