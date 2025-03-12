import { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { appRequest } from "./app.config";
import axios from 'axios'
import { AppConfigPaths, ChapterPaths, Paths } from "./path.resource";
import { PaginatedQuery } from "../utils/initStates";

type ChapterUpload = {
  sessionId: string;
  chapter: {
    episode: string;
    duration: string;
    filename: string;
    publicId: string;
    link: string;
  },
}

type AudioUpload = {
  chapterId: string;
  thumbnail: string;
  author: string;
  genre: string[];
  note?: string;
  about: string;
  title: string;
  reference?: {
      siteName: string;
      link: string;
  };
}

type UpdateAppConfigProp = {
  name: string;
  channel: string;
  genres: string[];
}

class AppService {
  async createAudio(data: AudioUpload) {
    const result = await appRequest<AudioUpload, ResponseData<AudioSchema>>(
      Paths.create.endpoint,
      data,
      Paths.create.method,
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

  async fetchAudios(query: typeof PaginatedQuery) {
    const result = await appRequest<unknown, ResponseData<{ docs: AudioSchema[] } & PaginatedQueryResponseType>>(
      Paths.getAllAudios.endpoint,
      {},
      Paths.getAllAudios.method,
      'json',
      query,
    );

    return result.data;
  }
  
  async fetchRecommendedAudios() {
    const result = await appRequest<unknown, ResponseData<AudioSchema[]>>(
      Paths.getAudioRecommendations.endpoint,
      {},
      Paths.getAudioRecommendations.method,
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

  async uploadThumbnailCloudinary(formdata: FormData,): Promise<{ secureUrl: string, publicId: string }>
  {
    const uploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

    const config: AxiosRequestConfig = {
      url: uploadUrl,
      method: 'POST',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
    };

    const result = await axios(config);
    const data = result?.data;
    return {
      secureUrl: data.secure_url,
      publicId: data.public_id,
    };
  }
  
  async uploadAudioToCloudinary(
    formdata: FormData,
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>,
  ): Promise<{ playbackUrl: string, publicId: string, filename: string }>
  {
    const uploadUrl = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`;

    const uploadProgress = (progressEvent: AxiosProgressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total!);
      setUploadProgress(percentCompleted);
    };

    const config: AxiosRequestConfig = {
      url: uploadUrl,
      method: 'POST',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' },
      params: {},
      responseType: 'json',
      onUploadProgress: uploadProgress,
    };

    const result = await axios(config);
    const data = result?.data;

    return {
      playbackUrl: data.secure_url,
      filename: data.original_filename,
      publicId: data.public_id,
    };
  }
  
  async uploadAudio(data: ChapterUpload) {

    const result = await appRequest<ChapterUpload, ResponseData<Chapter>>(
      Paths.upload.endpoint,
      data,
      Paths.upload.method,
      'json',
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

  async updateAppConfig(body: Partial<UpdateAppConfigProp>) {
    const result = await appRequest<Partial<UpdateAppConfigProp>, ResponseData<UpdateAppConfigProp>>(
      AppConfigPaths.updateAppConfig.endpoint,
      body,
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