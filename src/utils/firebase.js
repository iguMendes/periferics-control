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

 //produção
 const firebaseConfig = {
  apiKey: "AIzaSyDiXuh0vHLEbDba64qzCpYgFl1osHdrQWY",
  authDomain: "controllerprod-78cd6.firebaseapp.com",
  projectId: "controllerprod-78cd6",
  storageBucket: "controllerprod-78cd6.firebasestorage.app",
  messagingSenderId: "957537953637",
  appId: "1:957537953637:web:b96e755e32d0c9a8cae38c",
  measurementId: "G-TDZQ71V6XE"
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

export { app, analytics, db };