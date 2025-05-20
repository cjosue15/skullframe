import { Button } from '@/components/Button';
import { RiImageLine } from '@remixicon/react';
import Image from 'next/image';
import { useRef } from 'react';
import { FormError } from './FormError';

interface FileUploadProps {
  isLoading: boolean;
  imagePreview: string | undefined;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  updatedAt?: Date;
  errorMessage?: string;
}

export const FileUpload = ({
  isLoading,
  imagePreview,
  onImageChange,
  onRemoveImage,
  updatedAt,
  errorMessage,
}: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='grid gap-4'>
      <div
        className={`border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-full min-h-[280px] ${
          isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary'
        }`}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <div className='relative w-full h-full min-h-[240px]'>
            <Image
              src={
                imagePreview?.startsWith('data:')
                  ? imagePreview
                  : `${imagePreview}?v=${updatedAt?.getTime() ?? Date.now()}`
              }
              alt='Product preview'
              fill
              className='object-contain rounded-md'
            />
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center py-8 text-muted-foreground'>
            <RiImageLine className='h-12 w-12 mb-2' />
            <p className='text-sm font-medium'>Click para subir una imagen</p>
            <p className='text-xs'>JPG, PNG o WEBP (max. 1MB)</p>
          </div>
        )}
        <input
          ref={fileInputRef}
          type='file'
          id='image'
          accept='image/jpeg,image/png,image/webp'
          className='hidden'
          onChange={onImageChange}
          disabled={isLoading}
        />
      </div>
      {errorMessage && <FormError name={errorMessage} />}
      {imagePreview && (
        <Button
          type='button'
          variant='secondary'
          onClick={() => {
            onRemoveImage();
            if (fileInputRef.current) fileInputRef.current.value = '';
          }}
        >
          Remover Imagen
        </Button>
      )}
    </div>
  );
};
