import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import { Slider } from '@/components/ui/slider';
import { useCanvasContext } from '@/context/canvasContext';
import type { LogoProps } from '@/types';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function SortableLogo({ image }: { image: LogoProps }) {
  const [scale, setScale] = useState(1);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: image.id });
  const { setCanvasImages } = useCanvasContext();

  const removeLogoFromCanvas = (image: LogoProps) => {
    image.isOnCanvas = false;
    setCanvasImages((prevImages) =>
      prevImages.filter((prevImage) => prevImage.id !== image.id)
    );
  };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className={
        'group relative overflow-hidden ease-in-out before:absolute before:inset-0 before:z-20 before:cursor-move before:bg-orange-400 before:opacity-0 before:mix-blend-overlay before:transition before:duration-300 before:content-[""] hover:before:opacity-100'
      }
      id={image.name}
    >
      <div
        className={
          'max-h-0-[179px] h-[179px] w-[344px] max-w-[344px] overflow-hidden'
        }
      >
        <Image
          src={image.url || ''}
          fill
          alt={image.name}
          className={'object-cover'}
          style={{ transform: `scale(${scale})` }}
        />
      </div>
      <div
        className={
          'absolute -bottom-6 left-0 z-20 flex h-6 w-full justify-between gap-x-2 transition-transform duration-300 ease-in-out group-hover:-translate-y-6'
        }
      >
        <Slider
          defaultValue={[1]}
          min={1}
          max={2}
          step={0.01}
          onValueChange={(value) => setScale(value[0])}
          className={'mb-2 ml-4 max-w-[50%]'}
        />
        <button
          onClick={() => removeLogoFromCanvas(image)}
          className={
            'bg-red-500 p-1 text-xs font-semibold uppercase text-white'
          }
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
