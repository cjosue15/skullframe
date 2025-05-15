'use client';

import { FormError } from '@/app/components/FormError';
import { Category } from '@/app/dtos/categories.dtos';
import { ProductSchema, productSchema } from '@/app/dtos/products.dtos';
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
  RiUploadCloudFill,
} from '@remixicon/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

export function FormProduct({ categories }: { categories: Category[] }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      categoryId: undefined,
      type: 'physical',
      price: 0,
      imageFile: undefined,
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    console.log('Selected category ID:', value);
    setValue('categoryId', parseInt(value));
    setError('categoryId', {
      type: 'manual',
    });
  };

  const handleCheckedChange = (checked: boolean) => {
    setValue('type', checked ? 'digital' : 'physical');
  };

  const onSubmit = (values: ProductSchema) => {
    console.log('Form submitted:', values);
    // Here you would typically send the data to your backend
    // console.log({
    //   title,
    //   description,
    //   category,
    //   image: fileInputRef.current?.files?.[0],
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Left Column - Form Fields */}
        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label htmlFor='title' className='font-bold mb-2 block'>
              Título
            </Label>
            <Input
              id='title'
              placeholder='Ingrese el título del producto'
              {...register('title')}
            />
            {errors.title && <FormError name={errors.title.message!} />}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='description' className='font-bold mb-2 block'>
              Descripción
            </Label>
            <Textarea
              id='description'
              placeholder='Ingrese la descripción del producto'
              {...register('description')}
              className='min-h-[180px]'
            />
            {errors.description && (
              <FormError name={errors.description.message!} />
            )}
          </div>

          <div className='space-y-2'>
            <Label htmlFor='category' className='font-bold mb-2 block'>
              Categoría
            </Label>
            <Select onValueChange={handleCategoryChange}>
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
            <Switch id='digital' onCheckedChange={handleCheckedChange} />
            <Label htmlFor='digital'>Digital</Label>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='price' className='font-bold mb-2 block'>
              Precio
            </Label>
            <Input
              id='price'
              type='number'
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
                className='border-2 border-dashed border-gray-300 hover:border-primary rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-full min-h-[280px]'
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
                    <p className='text-xs'>SVG, PNG, JPG or GIF (max. 5MB)</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  id='image'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
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

        <Button type='submit'>
          <RiUploadCloudFill className='mr-2 h-4 w-4' />
          Create Product
        </Button>
      </div>
    </form>
  );
}
