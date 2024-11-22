import React from "react";
import PerifericoList from "./components/PerifericoList";
import AddFuncionario from "./components/Addfuncionario";
import { useState } from "react";

const Home = () => {

  const [usuarios, setUsuarios] = useState(['LIVRE']);

  const adicionarFuncionario = (novoFuncionario) => {
    if (!usuarios.includes(novoFuncionario)) {
      setUsuarios([...usuarios, novoFuncionario]);
    }
  };

  const removerFuncionario = (funcionario) => {
    setUsuarios(usuarios.filter((user) => user !== funcionario));
  };

  return (
    <div className="App">

      <AddFuncionario 
        adicionarFuncionario={adicionarFuncionario}
        usuarios={usuarios} 
        removerFuncionario={removerFuncionario}
       />

      <PerifericoList
        tipoPeriferico="computador" 
        usuarios={usuarios} 
       />

      <PerifericoList 
        tipoPeriferico="microfone" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="cameras" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="foneDeOuvido" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="mouse" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="teclado" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="monitor" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="mousepad" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="outrosItens" 
        usuarios={usuarios} 
      />


    </div>
  );
}

export default Home;
