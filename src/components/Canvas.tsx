'use client';

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSwappingStrategy
} from '@dnd-kit/sortable';

import { useCanvasContext } from '@/context/canvasContext';
import SortableLogo from '@/components/SortableLogo';

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
          'mx-auto flex h-full w-10/12 items-center justify-center border-[3px] border-dashed border-orange-400 bg-gray-700 p-16 text-white'
        }
      >
        <p>Begin by selecting the desired logos below</p>
      </section>
    );
  }

  return (
    <section
      className={'grid w-full grid-cols-4'}
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
