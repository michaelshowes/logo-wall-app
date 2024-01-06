import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';

import { useCanvasContext } from '@/context/canvasContext';
import { LogoProps } from '@/lib/figma';
import { useSortable } from '@dnd-kit/sortable';

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
			className={`
        relative overflow-hidden,
        before:cursor-move
      `}
			id={image.name}
		>
			<Image
				src={image.url || ''}
				width={344}
				height={206}
				alt={image.name}
			/>
			<button onClick={() => removeLogoFromCanvas(image)}>Remove</button>
		</div>
	);
}
