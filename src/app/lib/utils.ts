export function slugify(text: string) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Quita acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Reemplaza no alfanuméricos por guion
    .replace(/^-+|-+$/g, ''); // Quita guiones al inicio/final
}
