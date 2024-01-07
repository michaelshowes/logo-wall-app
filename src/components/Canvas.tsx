'use client';

import { useCanvasContext } from '@/context/canvasContext';
import Image from 'next/image';
import { CSS } from '@dnd-kit/utilities';
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	rectSwappingStrategy,
	useSortable
} from '@dnd-kit/sortable';

import { LogoProps } from '@/types';

function SortableLogo({ image }: { image: LogoProps }) {
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

export default function Canvas() {
	const { canvasImages, setCanvasImages, ref } = useCanvasContext();

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 4
			}
		})
	);

	const onDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;

		if (active.id === over?.id) return;

		setCanvasImages((images) => {
			const oldIndex = images.findIndex((image) => image.id === active.id);
			const newIndex = images.findIndex((image) => image.id === over?.id);

			return arrayMove(images, oldIndex, newIndex);
		});
	};

	if (canvasImages.length === 0) {
		return (
			<section
				className={
					'flex justify-center items-center bg-gray-700 text-white p-16 w-10/12 h-full mx-auto border-[3px] border-dashed border-orange-400'
				}
			>
				<p>Begin by selecting the desired logos below</p>
			</section>
		);
	}

	return (
		<section
			className={'grid grid-cols-4 w-full'}
			ref={ref}
		>
			<DndContext
				collisionDetection={closestCenter}
				onDragEnd={onDragEnd}
				sensors={sensors}
			>
				<SortableContext
					items={canvasImages}
					strategy={rectSwappingStrategy}
				>
					{canvasImages.map((image) => (
						<SortableLogo
							key={image.id}
							image={image}
						/>
					))}
				</SortableContext>
			</DndContext>
		</section>
	);
}
