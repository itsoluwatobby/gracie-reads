/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  // query,
  // where,
  getDoc,
} from 'firebase/firestore/lite';
import { app } from './firebase';


class Database {
  private readonly audioSchema = 'audioSchema'
  private AudioSchemaDB = getFirestore(app);;
  private audioCollection = collection(this.AudioSchemaDB, this.audioSchema);

  async createAudio(newAudio: AudioSchema) {
    try {
      const docRef = await addDoc(this.audioCollection, newAudio);
      console.log("Document written with ID: ", docRef.id);
      return docRef.firestore.toJSON() as AudioSchema
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAudio(id: string) {
    // const q = query(this.audioCollection, where('id', "==", id));
    const docRef = doc(this.AudioSchemaDB, this.audioSchema, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data() as AudioSchema;
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
      return null
    }
  }
  
  updateAudio(id: string, update: Partial<AudioSchema>) {

  }

  async deleteAudio(id: string) {
    await deleteDoc(doc(this.AudioSchemaDB, this.audioSchema, id));
  }

  async fetchAudios(): Promise<AudioSchema[]> {
    const audioSnapshot = await getDocs(this.audioCollection);
    const audioList = audioSnapshot.docs.map(doc => doc.data() as AudioSchema);
    return audioList;
  }
}
export const dbStorage = new Database();
