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
              apiKey: "AIzaSyCblBU4w6qNzHwl07-6MRlfhIGWGgXaFRA",
              authDomain: "controllerperifericos-3e9b2.firebaseapp.com",
              projectId: "controllerperifericos-3e9b2",
              storageBucket: "controllerperifericos-3e9b2.firebasestorage.app",
              messagingSenderId: "801690815808",
              appId: "1:801690815808:web:60a250147d7611d0ae7ea5",
              measurementId: "G-M0RLLL03W9"
            };

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
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Erro ao obter funcionários:", error);
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
      // Referência para o documento do tipo de periférico (como "computador")
      const tipoPerifericoRef = doc(db, "perifericos", tipoPeriferico);
  
      // Agora acessamos a subcoleção "perifericos" dentro do documento "computador"
      const perifericosRef = collection(tipoPerifericoRef, "perifericos");
      
      // Adiciona o periférico na subcoleção "perifericos"
      await addDoc(perifericosRef, periferico);
      console.log(`Periférico adicionado: ${JSON.stringify(periferico)}`);
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
      // Referência para a subcoleção "perifericos"
      const perifericosRef = collection(db, "perifericos", tipoPeriferico, "perifericos");
      
      // Busca o documento com base no campo "numSerie"
      const q = query(perifericosRef, where("numSerie", "==", numSerie));
      const querySnapshot = await getDocs(q);
  
      // Apaga todos os documentos encontrados
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

export { app, analytics, db };