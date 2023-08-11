import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { useParams } from "react-router-dom";
import { LivrosService } from "../../api/LivrosService";

const LivrosEdicao = () => {
  let { livroId } = useParams();

  const [livro, setLivro] = useState([]);

  async function getLivro() {
    const { data } = await LivrosService.getLivro(livroId);
    setLivro(data.resposta);
  }

  async function editLivro() {
    const body = {
      titulo: livro.titulo,
      paginas: Number(livro.paginas),
      isbn: livro.isbn,
      editora: livro.editora,
    };
    if (
      livro.titulo != undefined &&
      livro.titulo != "" &&
      livro.paginas != undefined &&
      livro.paginas != "" &&
      livro.isbn != undefined &&
      livro.isbn != "" &&
      livro.editora != undefined &&
      livro.editora != ""
    ) {
      await LivrosService.updateLivro(livro._id, body)
        .then(({ data }) => {
          alert(data.mensagem);
          getLivro();
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data}`);
        });
    }
  }

  useEffect(() => {
    getLivro();
  }, []);

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, titulo: event.target.value });
                }}
                value={livro.titulo || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, paginas: event.target.value });
                }}
                value={livro.paginas || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
                value={livro.isbn || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setLivro({ ...livro, editora: event.target.value });
                }}
                value={livro.editora || ""}
              ></input>
            </div>
            <div className="form-group">
              <button
                onClick={() => {
                  editLivro();
                }}
              >
                Atualizar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosEdicao;
