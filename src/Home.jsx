import React from "react";
import PerifericoList from "./components/PerifericoList";

const usuarios = ["Usuário 1", "Usuário 2", "Usuário 3"]; // Lista de usuários

function App() {
  return (
    <div className="App">
      <PerifericoList tipoPeriferico="Computadores" usuarios={usuarios} />

      <PerifericoList tipoPeriferico="Microfone" usuarios={usuarios} />

      <PerifericoList tipoPeriferico="Câmera" usuarios={usuarios} />

      <PerifericoList tipoPeriferico="Fone de ouvido" usuarios={usuarios} />

      <PerifericoList tipoPeriferico="Mouse" usuarios={usuarios} />
      <PerifericoList tipoPeriferico="Teclado" usuarios={usuarios} />
      <PerifericoList tipoPeriferico="Monitor" usuarios={usuarios} />
      <PerifericoList tipoPeriferico="MousePad" usuarios={usuarios} />
      <PerifericoList tipoPeriferico="Outros itens" usuarios={usuarios} />
    </div>
  );
}

export default App;
