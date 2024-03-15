import { Coordinates } from '@dnd-kit/core/dist/types';
import { useSortable } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { Dropdown } from '../../components/dropdowns/Dropdown';
import { ConfirmationModal } from '../../components/modals/ConfirmationModal';
import { Card } from '../../components/styled/Card';
import { MenuItem } from '../../components/styled/MenuItem';
import { TaskLabel } from '../../components/styled/TaskLabel';
import { Typography } from '../../components/styled/Typography';
import useTaskStore from '../../store/taskStore';
import { Task } from '../../types/todoTypes';
import { TaskModal } from './TaskModal';

export function TaskCard({ task }: { task: Task }) {
  const { removeTask, updateTask } = useTaskStore(({ removeTask, updateTask }) => ({
    removeTask,
    updateTask,
  }));
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [updateModalOpened, setUpdateModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [disableDragging, setDisableDragging] = useState(false);
  const [dropDownPosition, setDropdownPosition] = useState<Coordinates>({ x: 0, y: 0 });
  const onContextMenu = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    setDropdownPosition({
      x: e.clientX,
      y: e.clientY,
    });
    setDropdownOpened(true);
  };

  const handleDelete = () => removeTask({ id: task.id, date: task.date });
  const handleUpdate = (updateObj: Omit<Task, 'id' | 'date'>) =>
    updateTask({ id: task.id, text: updateObj.text, date: task.date, labels: updateObj.labels });

  const { attributes, listeners, setNodeRef, transform, transition, active } = useSortable({
    id: task.id,
    disabled: disableDragging,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
        opacity: active?.id !== task.id ? '1' : '0',
      }
    : {
        cursor: 'grab',
        ...(dropdownOpened ? { border: '1px solid grey' } : null),
      };

  useEffect(() => {
    if (dropdownOpened || updateModalOpened || deleteModalOpened) {
      setDisableDragging(true);
    } else setDisableDragging(false);
  }, [dropdownOpened, updateModalOpened, deleteModalOpened]);

  return (
    <Card
      id={task.id}
      onContextMenu={onContextMenu}
      style={style}
      variant='white'
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <ConfirmationModal
        title='Confirm deletion of task'
        modalOpened={deleteModalOpened}
        setModalOpened={setDeleteModalOpened}
        onDelete={handleDelete}
      />
      {updateModalOpened ? (
        <TaskModal
          title='Update task'
          task={task}
          onSubmit={handleUpdate}
          setModalOpen={setUpdateModalOpened}
        />
      ) : null}
      {task.labels?.length ? (
        <div style={{ lineHeight: '6px' }}>
          {task.labels.map((l, i) => (
            <TaskLabel key={i} variant={l} />
          ))}
        </div>
      ) : null}
      <Typography>{task.text}</Typography>
      {dropdownOpened ? (
        <Dropdown coordinates={dropDownPosition} setOpened={setDropdownOpened}>
          <MenuItem onClick={() => setUpdateModalOpened(true)}>Update</MenuItem>
          <MenuItem style={{ color: 'red' }} onClick={() => setDeleteModalOpened(true)}>
            Delete
          </MenuItem>
        </Dropdown>
      ) : null}
    </Card>
  );
}
