import { useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import SubmenuLivros from "../../components/SubmenuLivros/SubmenuLivros";
import { LivrosService } from "../../api/LivrosService";

const LivrosCadastro = () => {
  const [livro, setLivro] = useState([]);

  async function createLivro() {
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
      await LivrosService.createLivro(body)
        .then((response) => {
          alert(response.data);
          document.getElementById("formulario").reset;
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data}`);
        });
    }
  }

  return (
    <>
      <Header />
      <SubmenuLivros />
      <div className="livrosCadastro">
        <h1>Cadastro de Livros</h1>
        <div>
          <form id="formulario">
            <div className="form-group">
              <label>Titulo</label>
              <input
                type="text"
                id="titulo"
                required
                onChange={(event) => {
                  setLivro({ ...livro, titulo: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Número de Páginas</label>
              <input
                type="text"
                id="num"
                required
                onChange={(event) => {
                  setLivro({ ...livro, paginas: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN</label>
              <input
                type="text"
                id="isbn"
                required
                onChange={(event) => {
                  setLivro({ ...livro, isbn: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <label>Editora</label>
              <input
                type="text"
                id="editora"
                required
                onChange={(event) => {
                  setLivro({ ...livro, editora: event.target.value });
                }}
              ></input>
            </div>
            <div className="form-group">
              <button
                onClick={() => {
                  createLivro();
                }}
              >
                Cadastrar Livro
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LivrosCadastro;
