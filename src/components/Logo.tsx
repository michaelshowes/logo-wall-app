import { useCanvasContext } from "@/context/canvasContext";
import Image from "next/image";
import { useState } from "react";
import { Slider } from "./ui/slider";
import { LogoProps } from "@/types";
import { X } from "lucide-react";

export default function Logo({ image }: { image: LogoProps }) {
  const [scale, setScale] = useState(1);
  const { setCanvasImages } = useCanvasContext();

  const removeLogoFromCanvas = (image: LogoProps) => {
    image.isOnCanvas = false;
    setCanvasImages((prevImages) =>
      prevImages.filter((prevImage) => prevImage.id !== image.id)
    );
  };

  return (
    <div id={image.name}>
      <div
      className={
        'max-h-0-[179px] h-[179px] w-[344px] max-w-[344px] overflow-hidden'
      }
      style={{
        backgroundColor: `rgba(${image.color.r}, ${image.color.g}, ${image.color.b}, ${image.color.a})`
      }}
    >
      <Image
        src={image.url || ''}
        fill
        alt={image.name}
        className={'object-cover'}
        style={{
          transform: `scale(${scale})`
        }}
      />
    </div>
    <div
      className={
        'absolute -bottom-6 left-0 z-20 flex h-6 w-full justify-between gap-x-2 transition-transform duration-300 ease-in-out group-hover:-translate-y-6'
      }
    >
      <Slider
        defaultValue={[1]}
        min={0.5}
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
  )
}