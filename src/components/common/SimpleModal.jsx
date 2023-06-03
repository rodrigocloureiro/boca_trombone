import style from './Modal.module.css';

function Modal({ modalRef, claim, remove, edit }) {
  // Fecha o modal
  function handleShowModal() {
    modalRef.current.style.display = "none";
  }

  // Realiza a ação de deletar ou editar a reclamação de acordo com a ação recebida
  function handleSubmit() {
    if(claim.action === 'remove') {
      remove(claim);
      handleShowModal();
    } else {
      edit(claim.id);
      handleShowModal();
    }
  }

  return (
    <div ref={modalRef} className={ style.modal }>
      <div className={ style.modal_content }>
        <div className={ style.modal_header }>
          <span className={ style.close } onClick={handleShowModal}>&times;</span>

          <h2>Você confirma a ação?</h2>
        </div>

        <div className={ style.modal_footer }>
          <button onClick={ handleSubmit }>Confirmar</button>
          <button onClick={ handleShowModal }>Voltar</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
