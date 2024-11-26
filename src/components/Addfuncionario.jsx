import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  adicionarFuncionarioFirestore,
  obterFuncionariosFirestore,
  removerFuncionarioFirestore,
} from "../../utils/firebase";

const AddFuncionario = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

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
    const nomeFuncionario = data.nome.trim();
    if (nomeFuncionario) {
      const id = await adicionarFuncionarioFirestore(nomeFuncionario);
      setUsuarios((prev) => [...prev, { id, nome: nomeFuncionario }]);
      reset();
    }
  };

  // Remover funcionário
  const removerFuncionario = async (idFuncionario) => {
    await removerFuncionarioFirestore(idFuncionario);
    setUsuarios((prev) => prev.filter((user) => user.id !== idFuncionario));
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Gerenciar
        <br />
        Funcionários
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
                  <p className="text-gray-500">
                    Nenhum funcionário adicionado.
                  </p>
                )}
                {usuarios.map((funcionario) => (
                  <li
                    key={funcionario.id}
                    className="flex justify-between items-center"
                  >
                    <span>{funcionario.nome}</span>
                    <button
                      onClick={() => removerFuncionario(funcionario.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>

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
