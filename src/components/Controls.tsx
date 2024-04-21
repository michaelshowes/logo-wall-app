'use client';

import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

import { useCanvasContext } from '@/context/canvasContext';
import { exportAsImage } from '@/utils/exportAsImage';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';

export default function Controls() {
  const { ref, canvasImages, setCanvasImages } = useCanvasContext();
  const [fileName, setFileName] = useState('logo-wall');

  const promise = () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            message: `${fileName}.png has been saved!`
          }),
        2000
      )
    );

  const downloadImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    toast.promise(promise, {
      loading: 'Downloading your logo wall...',
      success: (data: any) => {
        return data.message;
      },
      error: 'Error'
    });
    canvas.style.scale = '2';
    exportAsImage(ref.current, `${fileName}.png`);
    canvas.style.scale = '1';
  };

  const clearCanvas = () => {
    setCanvasImages([]);
  };

  return (
    <div className={'p-10'}>
      <form
        className={'mx-auto flex max-w-[350px] flex-col items-center'}
        onSubmit={(e) => downloadImage(e)}
      >
        <Input
          type={'text'}
          placeholder={'File Name'}
          onChange={(e) => setFileName(e.target.value)}
          disabled={canvasImages.length === 0}
        />
        <div className={'mb-5 mt-2 text-xs text-white'}>
          Files are saved in PNG format
        </div>
        <div className={'flex w-full justify-center gap-x-6'}>
          <Button
            type={'submit'}
            disabled={canvasImages.length === 0}
          >
            Download
          </Button>
          <Button
            onClick={clearCanvas}
            type={'button'}
            variant={'outline'}
            disabled={canvasImages.length === 0}
          >
            Clear All
          </Button>
        </div>
      </form>
    </div>
  );
}
