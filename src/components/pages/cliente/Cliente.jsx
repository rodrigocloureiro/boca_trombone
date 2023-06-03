import style from "./Cliente.module.css";
import { Component, createRef } from "react";
import SimpleModal from "../../common/SimpleModal";

class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reclamacoes: [],
      nome: props.usuario.nome,
      sobrenome: props.usuario.sobrenome,
      username: props.usuario.username,
      editId: null,
      editedClaim: "",
      claim: {},
    };
    this.modalRef = createRef();
  }

  // Busca as reclamações realizaddas pelo usuário logado ao montar o componente
  componentDidMount() {
    const { cliente } = this.props;
    const { username } = this.state;
    // O método flaMap é a mistura do .map com o .flat. Ele percorre cada elemento do array e achata todos em um único array;
    const reclamacoesUsuario = cliente.flatMap((item) => {
      // O método flatMap é usado para percorrer todos os itens do array cliente e retornar um array com todas as reclamações do usuário
      const reclamacoesDoUsuario = item.reclamacoes.filter(
        (reclamacao) => reclamacao.username === username
      );
      return reclamacoesDoUsuario.map((reclamacao) => {
        reclamacao.empresa = item.nome;
        return reclamacao;
      });
    });
    this.setState({ reclamacoes: reclamacoesUsuario });
  }

  // Remove a reclamação selecioanada pelo usuário
  handleRemoval = (dado) => {
    const { event } = this.props;
    event(dado);
    this.setState((prevState) => ({
      reclamacoes: prevState.reclamacoes.filter(
        (reclamacao) => reclamacao.id !== dado.id
      ),
    }));
  };

  // Abre a edição para a reclamação selecionada baseada no id da mesma
  handleEdit = (id, reclamacao) => {
    this.setState({ editId: id, editedClaim: reclamacao });
  };

  // Salva a edição realizada pelo usuário
  handleFinishEditing = (id) => {
    if (this.state.claim.action === "edit") {
      const { reclamacoes, editedClaim } = this.state;
      const claimsUpdated = reclamacoes.map((item) => {
        if (item.id === id) item.reclamacao = editedClaim;
        return item;
      });

      this.setState({ reclamacoes: claimsUpdated, editId: null });
    } else {
      this.setState({ editId: null });
    }
  };

  handleShowModal = () => {
    this.modalRef.current.style.display = "block";
  };

  render() {
    const { reclamacoes, nome, sobrenome, username, claim } = this.state;
    const date = new Date().getTime();

    return (
      <main>
        <SimpleModal
          modalRef={this.modalRef}
          claim={claim}
          remove={this.handleRemoval}
          edit={this.handleFinishEditing}
        />

        <div className={style.container}>
          <section className={style.cliente_section}>
            <h1>
              {nome} {sobrenome}
            </h1>

            <h2>
              Usuário: <span>{username}</span>
            </h2>

            <p className={style.reclamacoes}>Suas reclamações:</p>

            {reclamacoes.length > 0 && (
              <ul className={style.claims_list}>
                {reclamacoes.map((dado, index) => (
                  <li key={dado.id}>
                    {this.state.editId !== dado.id ? (
                      <p className={style.claim}>
                        {dado.status === "Aberta" ? <>❗</> : <>✅</>}{" "}
                        {dado.reclamacao}
                      </p>
                    ) : (
                      <textarea
                        value={this.state.editedClaim}
                        className={style.edit_claim}
                        onChange={(e) =>
                          this.setState({ editedClaim: e.target.value })
                        }
                      >
                        {dado.reclamacao}
                      </textarea>
                    )}
                    <p>Empresa reclamada: {dado.empresa}</p>
                    <p>
                      {new Date(dado.data).toLocaleDateString()},{" "}
                      {dado.horario.slice(0, 5)}H
                    </p>
                    {this.state.editId !== dado.id ? (
                      <>
                        <button
                          onClick={() => {
                            this.setState({
                              claim: { ...dado, action: "remove" },
                            });
                            this.handleShowModal();
                          }}
                        >
                          Remover ❌
                        </button>
                        <button
                          onClick={() =>
                            this.handleEdit(dado.id, dado.reclamacao)
                          }
                        >
                          Editar 🖋️
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            this.setState({
                              claim: { ...dado, action: "edit" },
                            });
                            this.handleShowModal();
                          }}
                        >
                          Salvar edição
                        </button>
                        <button
                          onClick={() => {
                            this.setState({
                              claim: { ...dado, action: "cancel" },
                            });
                            this.handleShowModal();
                          }}
                        >
                          Cancelar edição
                        </button>
                      </>
                    )}
                    {dado.resposta !== undefined && (
                      <>
                        <p className={style.company_answer}>
                          Resposta da empresa:
                        </p>
                        <p className={style.answer}>{dado.resposta.texto}</p>
                        <p className={style.answer_dados}>
                          {dado.resposta.data.toLocaleDateString()} -{" "}
                          {dado.resposta.data.toLocaleTimeString()}
                        </p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
    );
  }
}

export default Cliente;
