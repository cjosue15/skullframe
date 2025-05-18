'use client';

import { FormError } from '@/app/components/FormError';
import { Category } from '@/app/dtos/categories.dtos';
import { ProductSchema, productSchema } from '@/app/dtos/products.dtos';
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
  RiImageLine,
  RiLoader2Line,
  RiUploadCloudFill,
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { createProduct, getSignedURL } from '../actions';

export function FormProduct({ categories }: { categories: Category[] }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
    watch,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: undefined,
      type: 'physical',
      price: 0,
      imageFile: undefined,
      slug: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const title = watch('title');
    const slug = slugify(title || '');
    setValue('slug', slug);
  }, [watch('title'), setValue]);

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

  const handleFileR2 = async (file: File, baseSlug: string) => {
    const signedURL = await getSignedURL({
      fileType: file.type,
      fileSize: file.size,
      baseSlug: baseSlug,
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
      const { url, slug } = await handleFileR2(values.imageFile, values.slug);

      await createProduct({
        title: values.title,
        description: values.description,
        categoryId: values.categoryId,
        type: values.type,
        price: values.price,
        imageUrl: url,
        slug,
      });

      toast.success('Producto creado con éxito');
      router.push('/admin/products');
    } catch (error) {
      toast.error('Error al crear el producto');
    } finally {
      setIsLoading(false);
    }
  };

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
            <Select disabled={isLoading} onValueChange={handleCategoryChange}>
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
            <div className='grid gap-4'>
              <div
                className={`border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-full min-h-[280px] ${
                  isLoading
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:border-primary'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {imagePreview ? (
                  <div className='relative w-full h-full min-h-[240px]'>
                    <Image
                      src={imagePreview || '/placeholder.svg'}
                      alt='Product preview'
                      fill
                      className='object-contain rounded-md'
                    />
                  </div>
                ) : (
                  <div className='flex flex-col items-center justify-center py-8 text-muted-foreground'>
                    <RiImageLine className='h-12 w-12 mb-2' />
                    <p className='text-sm font-medium'>
                      Click para subir una imagen
                    </p>
                    <p className='text-xs'>JPG, PNG o WEBP (max. 1MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  id='image'
                  accept='image/jpeg,image/png,image/webp'
                  className='hidden'
                  onChange={handleImageChange}
                  disabled={isLoading}
                />
              </div>
              {errors.imageFile && (
                <FormError name={errors.imageFile.message!} />
              )}
              {imagePreview && (
                <Button
                  type='button'
                  variant='secondary'
                  onClick={() => {
                    setImagePreview(null);
                    setValue('imageFile', undefined as unknown as File);
                    setError('imageFile', {
                      type: 'manual',
                      message: 'La imagen es obligatoria',
                    });
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  Remove Image
                </Button>
              )}
            </div>
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
          {!isLoading ? (
            <RiUploadCloudFill className='mr-2 h-4 w-4' />
          ) : (
            <RiLoader2Line className='mr-2 h-4 w-4 animate-spin' />
          )}
          {isLoading ? 'Creando Producto' : 'Crear Producto'}
        </Button>
      </div>
    </form>
  );
}
