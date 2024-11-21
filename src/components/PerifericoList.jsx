import React, { useState, useEffect } from "react";
import { obterFuncionariosFirestore } from "../utils/firebase";

const PerifericoList = ({ tipoPeriferico }) => {
  const [perifericos, setPerifericos] = useState([
    {
      id: 1,
      usuario: "",
      item: "",
      modelo: "",
      dataRevisao: "",
      status: "",
      observacoes: "",
      numSerie: "",
    },
  ]);
  const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os funcionários

  // Função para buscar os funcionários do Firestore
  useEffect(() => {
    const fetchFuncionarios = async () => {
      const funcionarios = await obterFuncionariosFirestore();
      const nomesFuncionarios = funcionarios.map(funcionario => funcionario.nome); // Extrai apenas os nomes
      setUsuarios(nomesFuncionarios); // Atualiza o estado com os nomes dos funcionários
    };

    fetchFuncionarios();
  }, []);

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    const newPerifericos = [...perifericos];
    newPerifericos[index][field] = value;
    setPerifericos(newPerifericos);
  };

  const addPeriferico = () => {
    setPerifericos([
      ...perifericos,
      {
        id: perifericos.length + 1,
        usuario: "",
        item: "",
        modelo: "",
        dataRevisao: "",
        status: "",
        observacoes: "",
        numSerie: "",
      },
    ]);
  };

  const handleDelete = (index) => {
    const newPerifericos = perifericos.filter((_, i) => i !== index);
    setPerifericos(newPerifericos);
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-fit border rounded mt-5 border-black p-4">
        <h2 className="text-center font-bold text-black bg-zinc-300">{tipoPeriferico}</h2>
        <table className="table-auto border-collapse border mx-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Usuário</th>
              <th className="border px-4 py-2">Item</th>
              <th className="border px-4 py-2">Marca/Modelo</th>
              <th className="border px-4 py-2">Data de Revisão</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Observações</th>
              <th className="border px-4 py-2">Num. Série</th>
              <th className="border px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {perifericos.map((periferico, index) => (
              <tr key={periferico.id}>
                <td className="border px-4 py-2">
                  <select
                    value={periferico.usuario}
                    onChange={(e) => handleInputChange(e, index, "usuario")}
                    className={`border w-full px-2 py-1 rounded-full text-center
                      ${periferico.usuario === "LIVRE" ? "bg-green-500 text-white" : ""}`}
                  >
                    <option value="">Selecione</option>
                    {usuarios.map((usuario, i) => (
                      <option key={i} value={usuario}>
                        {usuario}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={periferico.item}
                    onChange={(e) => handleInputChange(e, index, "item")}
                    placeholder="Item"
                    className="border w-full px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={periferico.modelo}
                    onChange={(e) => handleInputChange(e, index, "modelo")}
                    placeholder="Marca/Modelo"
                    className="border w-full px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="date"
                    value={periferico.dataRevisao}
                    onChange={(e) => handleInputChange(e, index, "dataRevisao")}
                    className="border w-full px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2 font-bold">
                  <select
                    value={periferico.status}
                    onChange={(e) => handleInputChange(e, index, "status")}
                    className={`border w-full text-center px-2 py-1 rounded-full 
                    ${periferico.status === "funcionando" ? "bg-green-500 text-white" : ""}
                    ${periferico.status === "defeituoso" ? "bg-red-500 text-white" : ""}
                    ${periferico.status === "emUso" ? "bg-yellow-500 text-white" : ""}`}
                  >
                    <option value="">SELECIONE</option>
                    <option value="funcionando">FUNCIONANDO</option>
                    <option value="defeituoso">DEFEITUOSO</option>
                    <option value="emUso">EM USO</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={periferico.observacoes}
                    onChange={(e) => handleInputChange(e, index, "observacoes")}
                    placeholder="Observações"
                    className="border w-full px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="text"
                    value={periferico.numSerie}
                    onChange={(e) => handleInputChange(e, index, "numSerie")}
                    placeholder="Num. Série"
                    className="border w-full px-2 py-1 rounded"
                  />
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white rounded px-4 py-2"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addPeriferico}
          className="mt-4 bg-blue-500 text-white rounded px-6 py-2"
        >
          Adicionar {tipoPeriferico}
        </button>
      </div>
    </div>
  );
};

export default PerifericoList;