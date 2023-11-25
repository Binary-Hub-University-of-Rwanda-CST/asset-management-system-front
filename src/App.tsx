import React, { useState } from 'react';
import Modal from "./components/modal/Modal.tsx";
import './components/modal/Modal.css';

function App(): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  return (
    <>
      <h1 className="title-1">Re-usable components - Modal component</h1>
      <button className="show" onClick={() => setOpenModal(!openModal)}>Show modal</button>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Modal Header</Modal.Header>
        <Modal.Body>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque harum ea facere commodi neque nihil ratione eaque maiores quam odit laboriosam totam placeat veniam at, optio cupiditate autem labore! Reiciendis.</p>
        </Modal.Body>
        <Modal.Footer>
          <Modal.DismissButton className="btn btn-secondary">Close</Modal.DismissButton>
          <button className="btn btn-primary">Save Changes</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
