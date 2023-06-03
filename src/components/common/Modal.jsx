import { useNavigate } from "react-router-dom";
import style from "./Modal.module.css";
import { useState } from "react";

function Modal({ headerText, claim, company, answer, event, usuario, modalRef }) {
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  // Fecha o modal
  function handleShowModal() {
    modalRef.current.style.display = "none";
  }

  // Envia o usuário para a página principal 1 segundo após concluir o envio da reclamação
  function handleSubmit() {
    setStatus(true);
    setTimeout(() => {
      answer !== undefined ? event(claim, usuario, answer) : event(); // evento recebido por props
      navigate("/"); // Redireciona para a Home
    }, 1000);
  }

  return (
    <div ref={modalRef} className={style.modal}>
      <div className={style.modal_content}>
        <div className={style.modal_header}>
          <span className={style.close} onClick={handleShowModal}>
            &times;
          </span>

          <h2>{headerText}</h2>
        </div>

        <div className={style.modal_body}>
          {answer === undefined ? (
            <>
              <p>Empresa selecionada: {company}</p>
              <p>Reclamação: {claim}</p>
            </>
          ) : (
            <>
              <p>Reclamação: {claim.reclamacao}</p>
              <p>Resposta: {answer}</p>
            </>
          )}
        </div>

        <div className={style.modal_footer}>
          {!status ? (
            <>
              <button onClick={handleSubmit}>Confirmar e Enviar</button>
              <button onClick={handleShowModal}>Voltar e Editar</button>
            </>
          ) : (
            <p>Envio realizado com sucesso!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
