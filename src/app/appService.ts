import { AxiosProgressEvent } from "axios";
import { appRequest } from "./app.config";
import { ChapterPaths, Paths } from "./path.resource";

class AppService {
  async createAudio(newAudio: AudioSchema) {
    try {
      const result = await appRequest<unknown, ResponseData<AudioSchema>>(Paths.create.endpoint, newAudio);
      // console.log("Document written with ID: ", docRef.id);
      return result.data;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getAudio(id: string) {
    const result = await appRequest<unknown, ResponseData<AudioSchema>>(
      `${Paths.getAudio.endpoint}/${id}`,
      {},
      Paths.getAudio.method,
    );

    return result.data;
  }
  
  async getAudioChapterById(id: string) {
    const result = await appRequest<unknown, ResponseData<Chapter>>(
      `${ChapterPaths.getChapterById.endpoint}/${id}`,
      {},
      ChapterPaths.getChapterById.method,
    );

    return result.data;
  }
  
  // updateAudio(id: string, update: Partial<AudioSchema>) {

  // }

  // async deleteAudio(id: string) {
    // await deleteDoc(doc(this.AudioSchemaDB, this.audioSchema, id));
  // } 

  async fetchAudios() {
    const result = await appRequest<unknown, ResponseData<{ docs: AudioSchema[] }>>(
      Paths.getAllAudios.endpoint,
      {},
      Paths.getAllAudios.method,
    );

    return result.data;
  }

  async uploadAudio(formdata: FormData, setUploadProgress: React.Dispatch<React.SetStateAction<number>>) {
    const uploadProgress = (progressEvent: AxiosProgressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      setUploadProgress(percentCompleted);
    };
    const result = await appRequest<FormData, unknown>(
      Paths.upload.endpoint,
      formdata,
      Paths.upload.endpoint,
      'json',
      {},
      uploadProgress,
    );

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