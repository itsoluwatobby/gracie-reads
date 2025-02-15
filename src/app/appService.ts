import { AxiosProgressEvent } from "axios";
import { appRequest } from "./app.config";
import { AppConfigPaths, ChapterPaths, Paths } from "./path.resource";

class AppService {
  async createAudio(formdata: FormData) {
    const result = await appRequest<FormData, ResponseData<AudioSchema>>(
      Paths.create.endpoint,
      formdata,
      Paths.create.method,
      'json',
      {},
      () => {},
      { 'Content-Type': 'multipart/form-data' },
    );
    return result.data;
  }

  async getAudio(id: string) {
    const result = await appRequest<unknown, ResponseData<AudioSchema>>(
      `${Paths.getAudio.endpoint}/${id}`,
      {},
      Paths.getAudio.method,
    );

    return result.data;
  }
  
  async likeAudio(id: string) {
    const result = await appRequest<unknown, ResponseData<AudioSchema>>(
      `${Paths.likeAudio.endpoint}/${id}`,
      {},
      Paths.likeAudio.method,
    );

    return result.data;
  }
  
  async rateAudiobook(body: { audioId: string, rating: number }) {
    const result = await appRequest<unknown, ResponseData<AudioSchema>>(
      `${Paths.rateAudio.endpoint}`,
      body,
      Paths.rateAudio.method,
    );

    return result.data;
  }
  
  async getUser() {
    const result = await appRequest<unknown, ResponseData<{ ipAddress: string }>>(
      `${Paths.getUser.endpoint}`,
      {},
      Paths.getUser.method,
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
  
  async getAudioChapterBySession(session: string) {
    const result = await appRequest<unknown, ResponseData<Chapter>>(
      `${ChapterPaths.getChapterBySession.endpoint}/${session}`,
      {},
      ChapterPaths.getChapterBySession.method,
    );

    return result.data;
  }

  async removeEpisode(sessionId: string, episodeId: string) {
    const result = await appRequest<unknown, ResponseData<Chapter>>(
      `${ChapterPaths.removeChapter.endpoint}`,
      { sessionId, episodeId },
      ChapterPaths.removeChapter.method,
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
  
  async deleteAudio(audioId: string) {
    const result = await appRequest<unknown, ResponseData<AudioSchema>>(
      `${Paths.delete.endpoint}/${audioId}`,
      {},
      Paths.delete.method,
    );

    return result.data;
  }

  async uploadAudio(formdata: FormData, setUploadProgress: React.Dispatch<React.SetStateAction<number>>) {
    const uploadProgress = (progressEvent: AxiosProgressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      setUploadProgress(percentCompleted);
    };
    const result = await appRequest<FormData, ResponseData<Chapter>>(
      Paths.upload.endpoint,
      formdata,
      Paths.upload.method,
      'json',
      {},
      uploadProgress,
      { 'Content-Type': 'multipart/form-data' },
    );

    return result.data;
  }

  async getAppConfig() {
    const result = await appRequest<unknown, ResponseData<AppConfig>>(
      AppConfigPaths.getAppConfig.endpoint,
      {},
      AppConfigPaths.getAppConfig.method,
    );

    return result.data
  }

  async updateAppConfig() {
    const result = await appRequest<Partial<AppConfig>, ResponseData<AppConfig>>(
      AppConfigPaths.updateAppConfig.endpoint,
      {},
      AppConfigPaths.updateAppConfig.method,
    );

    return result.data
  }

  async setup(body: CredentialProp) {
    const result = await appRequest<Partial<AppConfig>, ResponseData<AppConfig>>(
      AppConfigPaths.setup.endpoint,
      body,
      AppConfigPaths.setup.method,
    );

    return result.data
  }

  async login(body: CredentialProp) {
    const result = await appRequest<Partial<AppConfig>, ResponseData<AppConfig>>(
      AppConfigPaths.login.endpoint,
      body,
      AppConfigPaths.login.method,
    );

    return result.data
  }

  async logout() {
    const result = await appRequest<unknown, ResponseData<AudioSchema>>(
      `${AppConfigPaths.logout.endpoint}`,
      {},
      AppConfigPaths.logout.method,
    );

    return result.data;
  }
}
export const appService = new AppService();