import { useState } from "react";
import {FiSearch} from "react-icons/fi"
import './styles.css'
import api from './services/api';

function App() {

  const [input, setInput]=useState ('')
  const  [cep, setCep] = useState({});

  async function handleSearch(){
    //05051000/json//
    
    if(input == ''){
      alert("Preencha algum CEP!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data) 
      setInput("");
    } catch{
        alert("Verifique se o CEP digitado está correto, se não tente novamente mais tarde");
        setInput("")
    }

  }

  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">

        <input type="text" placeholder="Digite seu cep..."
        value={input} onChange={(e) => setInput(e.target.value)}/>

        <button className="buttonSearch" onClick={handleSearch}> 
        <FiSearch size={25} color="#000"/> 
        </button>
      </div>

      {Object.keys(cep).length > 0 && (

          <main className="mainsrc">
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>{cep.bairro}</span>
            <span>{cep.localidade} - {cep.uf}</span>
          </main>
        
      )}
     
    </div>
  );
}

export default App;
