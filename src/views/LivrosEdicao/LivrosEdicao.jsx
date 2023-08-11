import {useEffect , useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import SubmenuLivros from '../../components/SubmenuLivros/SubmenuLivros'
import { useParams } from 'react-router-dom'
import { LivrosService } from '../../api/LivrosService'

const LivrosEdicao = () => {  
  let {livroId} = useParams();

  const [livro, setLivro] = useState([])

  async function getLivro(){
    const {data} = await LivrosService.getLivro(livroId);
    setLivro(data)
  }

  async function editLivro(){
    const body = {
        id:Number(livro.id),
        titulo:livro.titulo,
        num_paginas: Number(livro.num_paginas),
        isbn: livro.isbn,
        editora: livro.editora
      }
    if(livro.id!=undefined && livro.id!='' && livro.titulo!=undefined && livro.titulo!='' && livro.num_paginas!=undefined && livro.num_paginas!='' && livro.isbn !=undefined && livro.isbn !='' && livro.editora !=undefined && livro.editora !=''){
      await LivrosService.updateLivro(Number(livro.id),body)
      .then(({data})=>{
        alert(data.mensagem)
      })
      .catch(({response:{data,status}})=>{
        alert(`${status} - ${data}`)      
      });
    }  

  }

  useEffect(() => {
    getLivro()    
  }, [])  

  return (
  <>
    <Header/>    
    <SubmenuLivros/>
    <div className='livrosCadastro'>
        <h1>Edição de Livros</h1>
        <div>
          <form id="formulario">
            <div className='form-group'>
              <label>Id</label>
              <input type="text" disabled required onChange={(event)=>{ setLivro({...livro, id: event.target.value})}} value={livro.id || ''}></input>
            </div>
            <div className='form-group'>
              <label>Titulo</label>
              <input type="text" required onChange={(event)=>{ setLivro({...livro, titulo: event.target.value})}} value={livro.titulo || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Número de Páginas</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, num_paginas: event.target.value})}} value={livro.num_paginas || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, isbn: event.target.value})}} value={livro.isbn || ''}></input>
            </div>
            <div className='form-group'>
              <label>Editora</label>
              <input type="text"  required onChange={(event)=>{ setLivro({...livro, editora: event.target.value})}} value={livro.editora || ''}></input>
            </div> 
            <div className='form-group'>
              <button onClick={()=>{
              editLivro()
            }}>Atualizar Livro</button>  
            </div>                   
          </form>
          </div>        
    </div>
  </>)
  
}

export default LivrosEdicao