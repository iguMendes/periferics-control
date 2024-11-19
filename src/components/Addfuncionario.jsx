import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AddFuncionario = ({ adicionarFuncionario, usuarios, removerFuncionario }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const usuariosVisiveis = usuarios.filter(user => user !== 'LIVRE');

  const onSubmit = (data) => {
    const novoFuncionario = data.nome.trim();
    if (novoFuncionario) {
      adicionarFuncionario(novoFuncionario);
      reset();
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={toggleModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Gerenciar<br/> Funcionários
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h1 className="text-2xl mb-4">Gerenciar Funcionários</h1>

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

            <div className="mb-4">
              <h2 className="text-xl mb-2">Lista de Funcionários</h2>
              <ul className="list-disc pl-6">
                {usuariosVisiveis.length === 0 && (
                  <p className="text-gray-500">Nenhum funcionário adicionado.</p>
                )}
                {usuariosVisiveis.map((funcionario, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{funcionario}</span>
                    <button
                      onClick={() => removerFuncionario(funcionario)}
                      className="bg-red-500 text-white px-2 py-1 rounded mt-2"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>

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
