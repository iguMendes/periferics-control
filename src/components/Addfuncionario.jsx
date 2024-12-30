import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  adicionarFuncionarioFirestore,
  obterFuncionariosFirestore,
  removerFuncionarioFirestore,
  obterPerifericosFirestore,
  getPerifericosNome
} from "../../utils/firebase";

const AddFuncionario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [perifericosFuncionario, setPerifericosFuncionario] = useState([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  // Buscar funcionários do Firestore ao carregar
  useEffect(() => {
    const carregarFuncionarios = async () => {
      const funcionarios = await obterFuncionariosFirestore();
      setUsuarios(funcionarios);
    };
    carregarFuncionarios();
  }, []);

  // Adicionar funcionário
  const onSubmit = async (data) => {
    const nomesFuncionarios = data.nome.trim();
    if (nomesFuncionarios) {
      const id = await adicionarFuncionarioFirestore(nomesFuncionarios);
      setUsuarios((prev) => [...prev, { id, nome: nomesFuncionarios }]);
      reset();
    }
  };

  // Remover funcionário
  const removerFuncionario = async (funcionario) => {
    await removerFuncionarioFirestore(funcionario); // Exclui do Firestore
    // Recarregar os funcionários para garantir que a lista esteja atualizada
    const funcionariosAtualizados = await obterFuncionariosFirestore();
    setUsuarios(funcionariosAtualizados); // Atualiza o estado com a lista de funcionários atualizada
  };

  // Carregar periféricos relacionados ao funcionário
  const carregarPerifericos = async (nomesFuncionarios) => {
    try {
      const perifericos = await getPerifericosNome(nomesFuncionarios);
      setPerifericosFuncionario(perifericos);
      setFuncionarioSelecionado(nomesFuncionarios);
    } catch (error) {
      console.error("Erro ao carregar periféricos:", error);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Gerenciar Funcionários
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h1 className="text-2xl mb-4">Gerenciar Funcionários</h1>

            {/* Adicionar novo funcionário */}
            <div className="mb-4">
              <input
                type="text"
                {...register("nome", { required: true })}
                placeholder="Nome do Funcionário"
                className="border px-2 py-1 rounded mr-2 w-full"
              />
              <button
                onClick={handleSubmit(onSubmit)}
                className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full"
              >
                Adicionar Funcionário
              </button>
            </div>

            {/* Listar funcionários */}
            <div className="mb-4">
              <h2 className="text-xl mb-2">Lista de Funcionários</h2>
              <ul className="list-disc pl-6 max-h-60 overflow-y-auto">
                {usuarios.length === 0 && (
                  <p className="text-gray-500">Nenhum funcionário adicionado.</p>
                )}
                {usuarios.map((funcionario) => (
                  <li
                    key={funcionario.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>{funcionario.nome}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => carregarPerifericos(funcionario.nome)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Ver Periféricos
                      </button>
                      <button
                        onClick={() => removerFuncionario(funcionario)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remover
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exibir periféricos do funcionário selecionado */}
            {perifericosFuncionario.length === 0 ? (
              <p className="text-gray-500">NENHUM PERIFÉRICO.</p>
            ) : (
              <ul className="overflow-auto max-h-40">
                {perifericosFuncionario.map((periferico, index) => (
                  <li className="flex w-fit border-t border-gray-600 pb-2" key={index}>
                    ITEM: {periferico.item} - CATEGORIA: {periferico.categoria} - CÓDIGO: ({periferico.numSerie})
                  </li>
                ))}
              </ul>
            )}

            {/* Fechar modal */}
            <button
              onClick={toggleModal}
              className="bg-gray-500 text-white px-4 py-2 rounded w-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFuncionario;
