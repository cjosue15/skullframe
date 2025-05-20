'use client';

import { FileUpload } from '@/app/components/file-upload';
import { FormError } from '@/app/components/FormError';
import { Category } from '@/app/dtos/categories.dtos';
import {
  Product,
  ProductSchema,
  productSchema,
} from '@/app/dtos/products.dtos';
import { slugify, validateImageFile } from '@/app/lib/utils';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/Select';
import { Switch } from '@/components/Switch';
import { Textarea } from '@/components/Textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  RiArrowLeftLongLine,
  RiLoader2Line,
  RiUploadCloudFill,
} from '@remixicon/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  copyImageToNewSlug,
  createProduct,
  deleteImageBySlug,
  getSignedURL,
  updateProduct,
} from './actions';

export function FormProduct({
  categories,
  product,
}: {
  categories: Category[];
  product?: Product;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      categoryId: undefined,
      type: 'physical',
      price: 0,
      imageFile: undefined,
      slug: '',
      imagePreview: product?.imageUrl ?? '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const title = watch('title');
    const slug = slugify(title || '');
    setValue('slug', slug);
  }, [watch('title'), setValue]);

  useEffect(() => {
    setValue('imagePreview', imagePreview);
  }, [imagePreview, setValue]);

  useEffect(() => {
    if (product) {
      setValue('title', product.title);
      setValue('description', product.description);
      setValue('categoryId', product.categoryId);
      setValue('type', product.type);
      setValue('price', product.price);
      setValue('slug', product.slug);
      setImagePreview(product.imageUrl);
    }
  }, [product, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const errorMsg = validateImageFile(file);
      if (errorMsg) {
        setError('imageFile', {
          type: 'manual',
          message: errorMsg,
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('imageFile', file);
      setError('imageFile', {
        type: 'manual',
        message: undefined,
      });
    }
  };

  const handleCategoryChange = (value: string) => {
    setValue('categoryId', parseInt(value));
    setError('categoryId', {
      type: 'manual',
    });
  };

  const handleCheckedChange = (checked: boolean) => {
    setValue('type', checked ? 'digital' : 'physical');
  };

  const handleFileR2 = async (
    file: File,
    baseSlug: string,
    forceSlug?: string
  ) => {
    const signedURL = await getSignedURL({
      fileType: file.type,
      fileSize: file.size,
      baseSlug: baseSlug,
      forceSlug,
    });

    if (signedURL.error) {
      throw new Error(signedURL.error);
    }

    const { signedUrl, url, slug } = signedURL.success!;
    await fetch(signedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    return { url, slug };
  };

  const onSubmit = async (values: ProductSchema) => {
    try {
      setIsLoading(true);
      let url = product?.imageUrl || '';
      const oldSlug = product?.slug || '';
      let newSlug = values.slug;

      if (values.imageFile) {
        // Si el slug no cambió, usa el mismo para la imagen
        const { url: imageUrl, slug: usedSlug } = await handleFileR2(
          values.imageFile,
          values.slug,
          product && oldSlug === newSlug ? oldSlug : undefined // <-- aquí
        );
        url = imageUrl;
        newSlug = usedSlug; // Si el slug cambió, borra la imagen anterior
        if (product && oldSlug !== newSlug) {
          await deleteImageBySlug(oldSlug);
        }
      } else if (product && oldSlug !== newSlug) {
        // Si el slug cambió pero no hay nueva imagen, copia la imagen y borra la anterior
        url = await copyImageToNewSlug(oldSlug, newSlug);
        await deleteImageBySlug(oldSlug);
      }

      if (product) {
        await updateProduct({
          ...values,
          id: product.id,
          imageUrl: url,
          slug: newSlug,
        });
        toast.success('Producto actualizado con éxito');
      } else {
        await createProduct({
          ...values,
          imageUrl: url,
          slug: newSlug,
        });
        toast.success('Producto creado con éxito');
      }
      router.push('/admin/products');
    } catch (error) {
      toast.error('Error al crear el producto');
    } finally {
      setIsLoading(false);
    }
  };

  const isEdit = Boolean(product);
  const buttonLabel = isLoading
    ? isEdit
      ? 'Actualizando producto...'
      : 'Creando producto...'
    : isEdit
    ? 'Actualizar producto'
    : 'Crear producto';
  const buttonIcon = isLoading ? (
    <RiLoader2Line className='mr-2 h-4 w-4 animate-spin' />
  ) : (
    <RiUploadCloudFill className='mr-2 h-4 w-4' />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Left Column - Form Fields */}
        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='title' className='font-bold mb-2 block'>
              Título
            </Label>
            <Input
              id='title'
              disabled={isLoading}
              placeholder='Ingrese el título del producto'
              {...register('title')}
            />
            {errors.title && <FormError name={errors.title.message!} />}

            <small className='block mt-1 text-xs text-gray-500'>
              Slug: {watch('slug')}
            </small>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description' className='font-bold mb-2 block'>
              Descripción
            </Label>
            <Textarea
              id='description'
              disabled={isLoading}
              placeholder='Ingrese la descripción del producto'
              {...register('description')}
              className='min-h-[90px]'
            />
            {errors.description && (
              <FormError name={errors.description.message!} />
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='category' className='font-bold mb-2 block'>
              Categoría
            </Label>
            <Select
              defaultValue={product?.categoryId?.toString()}
              disabled={isLoading}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger id='category'>
                <SelectValue placeholder='Seleccione una categoría' />
              </SelectTrigger>
              <SelectContent>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <SelectItem key={category.id} value={String(category.id)}>
                      {category.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value=''>
                    No hay categorías disponibles
                  </SelectItem>
                )}
              </SelectContent>
            </Select>

            {errors.categoryId && (
              <FormError name={errors.categoryId.message!} />
            )}
          </div>

          <div className='flex items-center justify-start gap-2'>
            <Switch
              disabled={isLoading}
              id='digital'
              onCheckedChange={handleCheckedChange}
            />
            <Label htmlFor='digital'>Digital</Label>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='price' className='font-bold mb-2 block'>
              Precio
            </Label>
            <Input
              id='price'
              type='number'
              step={0.01}
              disabled={isLoading}
              placeholder='Ingrese el precio del producto'
              {...register('price')}
            />
            {errors.price && <FormError name={errors.price.message!} />}
          </div>
        </div>

        {/* Right Column - Image Upload */}
        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='image' className='font-bold mb-2 block'>
              Imagen del Producto
            </Label>

            <FileUpload
              imagePreview={imagePreview}
              isLoading={isLoading}
              onImageChange={handleImageChange}
              onRemoveImage={() => {
                setImagePreview(undefined);
                setValue('imageFile', undefined as unknown as File);
                setError('imageFile', {
                  type: 'manual',
                  message: 'La imagen es obligatoria',
                });
              }}
              updatedAt={product?.updatedAt}
              errorMessage={errors.imageFile?.message as string}
            />
            {errors.imageFile && (
              <FormError name={errors.imageFile.message as string} />
            )}
          </div>
        </div>
      </div>

      <div className='text-right mt-6'>
        <Button asChild type='submit' variant='light' className='mr-4'>
          <Link href='/admin/products'>
            <RiArrowLeftLongLine className='mr-2 h-4 w-4' />
            Cancelar
          </Link>
        </Button>

        <Button type='submit' disabled={isLoading}>
          {buttonIcon}
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}
