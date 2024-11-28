import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
}
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
export const adicionarFuncionarioFirestore = async (nomeFuncionario) => {
  try {
    const docRef = await addDoc(collection(db, "funcionarios"), {
      nome: nomeFuncionario,
    });
    console.log("Funcionário adicionado com ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao adicionar funcionário:", error);
  }
};

// Função para obter todos os funcionários
export const obterFuncionariosFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "funcionarios"));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id, // ID aleatório do documento
      ...doc.data(), // Campos do documento, como 'nome'
    }));
  } catch (error) {
    console.error("Erro ao obter funcionários:", error);
    throw error;
  }
};


// Função para remover funcionário
export const removerFuncionarioFirestore = async (idFuncionario) => {
  try {
    await deleteDoc(doc(db, "funcionarios", idFuncionario));
    console.log("Funcionário removido com sucesso:", idFuncionario);
  } catch (error) {
    console.error("Erro ao remover funcionário:", error);
  }
};

export const adicionarPerifericoFirestore = async (tipoPeriferico, periferico) => {
  try {
    const tipoPerifericoRef = doc(db, "perifericos", tipoPeriferico);
    const perifericosRef = collection(tipoPerifericoRef, "perifericos");
    const docRef = doc(perifericosRef, periferico.numSerie);
    await setDoc(docRef, periferico)
    console.log(`Periférico adicionado com numSerie: ${periferico.numSerie}`);
    return periferico;
  } catch (error) {
    console.error("Erro ao adicionar periférico:", error);
    throw error;
  }
};

export const obterPerifericosFirestore = async (tipoPeriferico) => {
  try {
    const perifericosRef = collection(db, "perifericos", tipoPeriferico, "perifericos");
    const querySnapshot = await getDocs(perifericosRef);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao obter periféricos:", error);
    throw error;
  }
};

export const removerPerifericoFirestore = async (tipoPeriferico, numSerie) => {
  try {
    const perifericosRef = collection(db, "perifericos", tipoPeriferico, "perifericos");
    const q = query(perifericosRef, where("numSerie", "==", numSerie));
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((doc) =>
      deleteDoc(doc.ref)
    );

    await Promise.all(deletePromises);
    console.log(`Periférico com número de série ${numSerie} deletado com sucesso.`);
  } catch (error) {
    console.error("Erro ao deletar periférico:", error);
    throw error;
  }
};

export const getPerifericosNome = async (nomeFuncionario) => {
  try {
    const categorias = ["cameras", "computador", "foneDeOuvido", "microfone","monitor", "mouse","mousepad","outrosItens", "teclado"]; // Subcoleções existentes
    let perifericosDoUsuario = [];

    for (const categoria of categorias) {
      const perifericosRef = collection(
        db,
        "perifericos",
        categoria,
        "perifericos"
      );

      // Query para buscar documentos onde o campo "usuario" corresponde
      const q = query(perifericosRef, where("usuario", "==", nomeFuncionario));
      const querySnapshot = await getDocs(q);

      // Adiciona os documentos encontrados à lista
      perifericosDoUsuario = [
        ...perifericosDoUsuario,
        ...querySnapshot.docs.map((doc) => ({
          id: doc.id,
          categoria, // Inclui a categoria para identificar a origem
          ...doc.data(),
        })),
      ];
    }

    return perifericosDoUsuario; // Retorna a lista de periféricos do usuário
  } catch (error) {
    console.error("Erro ao buscar periféricos por usuário:", error);
    throw error;
  }
};

export { app, analytics, db };