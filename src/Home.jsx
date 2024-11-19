import React from "react";
import PerifericoList from "./components/PerifericoList";
import AddFuncionario from "./components/Addfuncionario";
import { useState } from "react";

const Home = () => {

  const [usuarios, setUsuarios] = useState(['LIVRE', 'EM USO']);

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
        tipoPeriferico="COMPUTADORES" 
        usuarios={usuarios} 
       />

      <PerifericoList 
        tipoPeriferico="MICROFONES" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="CÂMERAS" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="FONES DE OUVIDO" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="MOUSE" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="TECLADO" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="MONITOR" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="MOUSEPAD" 
        usuarios={usuarios} 
      />

      <PerifericoList 
        tipoPeriferico="OUTROS ITENS" 
        usuarios={usuarios} 
      />


    </div>
  );
}

export default Home;
