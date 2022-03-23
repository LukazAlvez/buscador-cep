
import {FiSearch} from 'react-icons/fi';
import './app.css';
import {useState} from 'react'
import api from './service/api'

function App() {

  const [input, setImput] = useState("");
  const [cep, setCep] = useState({})

  // faz a busca do cep na api
  const handleSearch = async () =>{
    if(input === ''){
      alert('Preencha algum Cep...')
      return;
    }
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      console.log(response.data)
    }catch{
      alert('Cep não encontrado!')
    }
  }

  return (
    <div className="container">

      <div className='box'>
      <h1 className='title'>Buscador Cep</h1>
      <div className='inputs'>
      {/* input */}
        <input 
        type="text"
        placeholder='Digite seu cep...'
        value={input}
        onChange = {(e) => setImput(e.target.value)}
        />
      {/* botão pesquisar */}
        <button onClick={handleSearch}>
          <FiSearch size = {25} color="#fff" />
        </button>

      </div>
      {/* mostra os resultados */}

      {Object.keys(cep).length >= 1 && (

        <main>
          <h2>Cep: {cep.cep}</h2>
          <span>{cep.logradouro}</span>
          <span>Bairro: {cep.bairro} </span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}
      
      </div>
    </div>
  );
}

export default App;
