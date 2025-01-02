import { appRequest } from "./app.config";
import { Paths } from "./path.resource";

class AppService {
  async createAudio(newAudio: AudioSchema) {
    try {
      const result = await appRequest(Paths.create.endpoint, newAudio);
      // console.log("Document written with ID: ", docRef.id);
      return result.data;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAudio(id: string) {
    const result = await appRequest(
      `${Paths.getAudio.endpoint}/${id}`,
      {},
      Paths.getAudio.method,
    );

    return result.data;
  }
  
  // updateAudio(id: string, update: Partial<AudioSchema>) {

  // }

  // async deleteAudio(id: string) {
    // await deleteDoc(doc(this.AudioSchemaDB, this.audioSchema, id));
  // } 

  async fetchAudios(): Promise<AudioSchema[]> {
    const result = await appRequest<unknown, AudioSchema[]>(
      Paths.getAllAudios.endpoint,
      {},
      Paths.getAllAudios.method,
    );

    return result.data
  }

  async uploadAudio<M>(file: M) {
    const result = await appRequest<M, unknown>(Paths.upload.endpoint, file);

    return result.data
  }

  async streamAudio(fileName: string) {
    const result = await appRequest<unknown, unknown>(
      `${Paths.stream.endpoint}/${fileName}`,
      {},
      Paths.stream.method,
    );

    return result.data
  }
}
export const appService = new AppService();