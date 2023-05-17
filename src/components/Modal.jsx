import { Link, useNavigate } from 'react-router-dom';
import style from './Modal.module.css';
import { useState } from 'react';

function Modal({ claim, company, event }) {
  const [ status, setStatus ] = useState(false);
  const navigate = useNavigate();

  function handleShowModal() {
    const modal = document.querySelector("#myModal");
    modal.style.display = "none";
  }

  function handleSubmit() {
    setStatus(true);
    setTimeout( () => {
      event();
      navigate('/');
    }, 1000);
  }

  return (
    <div id="myModal" className={ style.modal }>
      <div className={ style.modal_content }>
        <div className={ style.modal_header }>
          <span className={ style.close }>&times;</span>

          <h2>Você confirma os dados?</h2>
        </div>

        <div className={ style.modal_body }>
          <p>Empresa selecionada: { company }</p>

          <p>
            Reclamação: { claim }
          </p>
        </div>

        <div className={ style.modal_footer }>
          {
            !status ? (
            <>
              <button onClick={ handleSubmit }>Confirmar e Enviar</button>
              <button onClick={ handleShowModal }>Voltar e Editar</button>
            </> ) : (
              <p>Envio realizado com sucesso!</p>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;
