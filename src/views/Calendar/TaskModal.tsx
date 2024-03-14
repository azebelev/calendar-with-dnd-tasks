import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { InputField } from '../../components/inputs/InputField';
import { Select } from '../../components/inputs/Select';
import { Modal } from '../../components/modals/Modal';
import { Button } from '../../components/styled/Button';
import { InputLabel } from '../../components/styled/InputLabel';
import { TaskLabelEnum } from '../../enums/taskLabelEnum';
import { Task } from '../../types/todoTypes';

const selectOptions = [
  { label: 'None', value: 'None' },
  { label: 'Approved', value: TaskLabelEnum.Approved },
  { label: 'Started', value: TaskLabelEnum.Started },
  { label: 'Clarification required', value: TaskLabelEnum.ClarificationRequired },
  { label: 'Testing required', value: TaskLabelEnum.TestingRequired },
  { label: 'Urgent', value: TaskLabelEnum.Urgent },
  { label: 'Documentation', value: TaskLabelEnum.Documentation },
];

export function TaskModal({
  title,
  setModalOpen,
  onSubmit,
  task,
}: {
  title: string;
  onSubmit: (task: Omit<Task, 'id' | 'date'>) => void;
  task?: Task;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [text, setText] = useState(task?.text??'');
  const [selectedLabels, setSelectedLabels] = useState<(number | string)[]>(task?.labels ?? []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (text) {
      onSubmit({ text, labels: selectedLabels.map((l) => +l) });
      setModalOpen(false);
    } else alert('task text should be not empty');
  };

  const onInputChange = (e: any) => {
    setText(e.target.value);
  };

  const addNewLabel = (e: ChangeEvent<HTMLSelectElement>) => {
    if (selectedLabels.includes(+e.target.value)) {
      alert('this label already exist');
      return;
    }
    setSelectedLabels([...selectedLabels, +e.target.value]);
  };

  const updateLabel = (initialValue: number | string) => {
    let closurePrevValue = initialValue;
    return (e: ChangeEvent<HTMLSelectElement>) => {
      if (selectedLabels.includes(+e.target.value)) {
        alert('this label already exist');
        setSelectedLabels([...selectedLabels]);
        return;
      }
      if (e.target.value === 'None') {
        const labels = selectedLabels.filter((l) => l !== closurePrevValue);
        setSelectedLabels(labels);
      } else {
        const labels = [...selectedLabels];
        labels[labels.indexOf(closurePrevValue)] = +e.target.value;
        setSelectedLabels(labels);
      }
      closurePrevValue = +e.target.value;
    };
  };

  return (
    <Modal title={title} setModalOpen={setModalOpen}>
      <form onSubmit={handleSubmit}>
        {selectedLabels.length ? <InputLabel>Change labels</InputLabel> : null}
        {selectedLabels.map((l, i) => (
          <div key={i} style={{ marginTop: '20px' }}>
            <Select options={selectOptions} value={l} onChange={updateLabel(l)} />
          </div>
        ))}
        <InputLabel>Add label</InputLabel>
        <div style={{ marginTop: '20px' }}>
          <Select options={selectOptions} value={'None'} onChange={addNewLabel} />
        </div>
        <InputField
          label='Enter task text'
          value={text}
          onChange={onInputChange}
          minLength={1}
          maxLength={100}
        />

        <div style={{ minWidth: '30vw' }}>
          <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          <Button variant={'outline-success'} style={{ marginLeft: '8px' }} type='submit'>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
}
