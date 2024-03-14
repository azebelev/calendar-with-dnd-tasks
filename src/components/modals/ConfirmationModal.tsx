import { Dispatch, SetStateAction } from 'react';
import { Button } from '../styled/Button';
import { Modal } from './Modal';

export function ConfirmationModal({
  title,
  modalOpened,
  setModalOpened,
  onDelete,
}: {
  title: string;
  modalOpened: boolean;
  setModalOpened: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
}) {
  const handleSubmit = async () => {
    onDelete();
    setModalOpened(false);
  };
  return (
    <>
      {modalOpened ? (
        <Modal title={title} setModalOpen={setModalOpened}>
          <div className=' mt-4 flex gap-3 justify-center'>
            <div style={{ display: 'flex', justifyContent: 'center',marginTop: '60px', }}>
              <Button
                style={{  marginRight: '8px' }}
                onClick={() => setModalOpened(false)}
              >
                Cancel
              </Button>
              <Button variant={'danger'} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
