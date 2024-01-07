import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

import { useCanvasContext } from '@/context/canvasContext';
import type { LogoProps } from '@/types';

export default function SortableLogo({ image }: { image: LogoProps }) {
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
				'group relative overflow-hidden before:cursor-move before:absolute before:content-[""] before:inset-0 before:opacity-0 before:bg-orange-400 before:mix-blend-overlay before:transition before:duration-300 hover:before:opacity-100 ease-in-out'
			}
			id={image.name}
		>
			<Image
				src={image.url || ''}
				width={344}
				height={206}
				alt={image.name}
			/>
			<button
				onClick={() => removeLogoFromCanvas(image)}
				className={
					'group-hover:-translate-y-6 transition-transform duration-300 ease-in-out absolute right-0 -bottom-6 text-white bg-red-500 font-semibold text-xs uppercase h-6 p-1'
				}
			>
				Remove
			</button>
		</div>
	);
}
