import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * SortableElement is a wrapper component that makes its children sortable.
 * @param {string} id - The id of the sortable element
 * @param {React.ReactNode} children - The children of the sortable element
 * @returns The sortable element
 * @example
 * <SortableElement id={'1'}>
 *  <div>Sortable Element</div>
 * </SortableElement>
 */
export default function SortableElement({
  id,
  children
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

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
    >
      {children}
    </div>
  );
}
