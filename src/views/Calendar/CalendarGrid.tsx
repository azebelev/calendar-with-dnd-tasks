import { DndContext, DragEndEvent, DragOverlay, UniqueIdentifier } from '@dnd-kit/core';
import React, { useRef, useState } from 'react';
import { validate } from 'uuid';
import { WeeksGrid } from '../../components/styled/WeeksGrid';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';
import useTaskStore from '../../store/taskStore';
import { getTaskById } from '../../utils/getTaskById';
import { CalendarDay } from './CalendarDay';
import { TaskCard } from './TaskCard';

export function CalendarGrid() {
  const { datesData, handleScroll, scrollContainerRef } = useInfiniteScroll();

  const { dragSync } = useTaskStore(({ dragSync }) => ({ dragSync }));
  const [activeId, setActiveId] = useState<UniqueIdentifier | undefined>();
  const draggableRef = useRef<HTMLDivElement | null>(null);

  function handleDragEnd(event: DragEndEvent) {
    if (event.over) {
      dragSync(event.active.id, event.over.id, getIsDraggableBelow(event.over.id));
      console.log(event);
    }
    setActiveId(undefined);
  }

  function getIsDraggableBelow(overId: UniqueIdentifier) {
    if (!validate(overId as string)) return;
    const draggableRect = draggableRef.current?.getBoundingClientRect();
    const dropRect = document.getElementById(overId as string)?.getBoundingClientRect();
    if (draggableRect && dropRect) {
      const draggableCenterY = draggableRect.top + draggableRect.height / 2;
      const destCenterY = dropRect.top + dropRect.height / 2;
      return draggableCenterY < destCenterY ? false : true;
    }
  }

  return (
    <>
      <div
        onScroll={handleScroll}
        style={{ height: '90%', overflowY: 'auto' }}
        ref={scrollContainerRef}
      >
        <DndContext onDragEnd={handleDragEnd} onDragStart={(e) => setActiveId(e.active.id)}>
          <WeeksGrid>
            {datesData.map((dateData, i) => (
              <React.Fragment key={i}>
                <CalendarDay dateData={dateData} />
              </React.Fragment>
            ))}
          </WeeksGrid>
          <DragOverlay style={{ opacity: 1, cursor: 'grabbing' }}>
            {activeId ? (
              <div ref={draggableRef}>
                <TaskCopy id={activeId} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

function TaskCopy({ id }: { id: UniqueIdentifier }) {
  const { filteredTasks } = useTaskStore(({ filteredTasks }) => ({
    filteredTasks,
  }));
  const task = getTaskById(id, filteredTasks);

  return task ? (
    <div style={{ opacity: '0.5' }}>
      <TaskCard task={task} />{' '}
    </div>
  ) : null;
}
