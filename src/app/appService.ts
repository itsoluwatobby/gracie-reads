import { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { appRequest } from "./app.config";
import axios from 'axios'
import { AdminPaths, AppConfigPaths, ChapterPaths, CommentPaths, ContactUsPaths, Paths } from "./path.resource";
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
      Paths.rateAudio.endpoint,
      body,
      Paths.rateAudio.method,
    );

    return result.data;
  }
  
  async getUser() {
    const result = await appRequest<unknown, ResponseData<{ ipAddress: string }>>(
      Paths.getUser.endpoint,
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
      ChapterPaths.removeChapter.endpoint,
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
  
  async fetchRecentAudiobooks() {
    const result = await appRequest<unknown, ResponseData<AudioSchema[]>>(
      Paths.getRecentAudiobooks.endpoint,
      {},
      Paths.getRecentAudiobooks.method,
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
      AppConfigPaths.logout.endpoint,
      {},
      AppConfigPaths.logout.method,
    );

    return result.data;
  }

  // ADMIN ROUTES
  async deleteAudio(audioId: string) {
    const result = await appRequest<unknown, ResponseData<{ id: string }>>(
      `${AdminPaths.delete.endpoint}/${audioId}`,
      {},
      AdminPaths.delete.method,
    );

    return result.data;
  }

  async getAppDashboard() {
    const result = await appRequest<unknown, ResponseData<AppDashboardProps>>(
      AdminPaths.getAppDashboard.endpoint,
      {},
      AdminPaths.getAppDashboard.method,
    );

    return result.data;
  }

  async toggleBookStatus(audioId: string) {
    const result = await appRequest<unknown, ResponseData<AudioSchema>>(
      `${AdminPaths.toggleBookStatus.endpoint}/${audioId}`,
      {},
      AdminPaths.toggleBookStatus.method,
    );

    return result.data;
  }

  async contactRepliedTo(contactId: string) {
    const result = await appRequest<unknown, ResponseData<ContactUs>>(
      `${AdminPaths.contactRepliedTo.endpoint}/${contactId}`,
      {},
      AdminPaths.contactRepliedTo.method,
    );

    return result.data;
  }

  async getContact(contactId: string) {
    const result = await appRequest<unknown, ResponseData<ContactUs>>(
      `${AdminPaths.getContact.endpoint}/${contactId}`,
      {},
      AdminPaths.getContact.method,
    );

    return result.data;
  }

  async getContacts(query: typeof PaginatedQuery) {
    const result = await appRequest<unknown, ResponseData<{ docs: ContactUs[] } & PaginatedQueryResponseType>>(
      AdminPaths.getContacts.endpoint,
      {},
      AdminPaths.getContacts.method,
      'json',
      query,
    );

    return result.data;
  }

  async deleteContact(contactId: string) {
    const result = await appRequest<unknown, ResponseData<{ id: string }>>(
      `${AdminPaths.deleteContact.endpoint}/${contactId}`,
      {},
      AdminPaths.deleteContact.method,
    );

    return result.data;
  }

  async createContact(newContact: Partial<Omit<ContactUs, '_id'>>) {
    const result = await appRequest<unknown, ResponseData<{ id: string }>>(
      ContactUsPaths.create.endpoint,
      newContact,
      ContactUsPaths.create.method,
    );

    return result.data;
  }

  async createComment(newComment: Partial<Omit<CommentProps, '_id'>>) {
    const result = await appRequest<unknown, ResponseData<ContactUs>>(
      ContactUsPaths.create.endpoint,
      newComment,
      ContactUsPaths.create.method,
    );

    return result.data;
  }

  async getComments(query: typeof PaginatedQuery) {
    const result = await appRequest<unknown, ResponseData<{ docs: CommentProps[] } & PaginatedQueryResponseType>>(
      CommentPaths.getComments.endpoint,
      {},
      CommentPaths.getComments.method,
      'json',
      query,
    );

    return result.data;
  }

  async getComment(commentId: string) {
    const result = await appRequest<unknown, ResponseData<CommentProps>>(
      `${CommentPaths.getComment.endpoint}/${commentId}`,
      {},
      CommentPaths.getComment.method,
    );

    return result.data;
  }

  async deleteComment(contactId: string) {
    const result = await appRequest<unknown, ResponseData<{ id: string }>>(
      `${CommentPaths.delete.endpoint}/${contactId}`,
      {},
      CommentPaths.delete.method,
    );

    return result.data;
  }

  async likeAudioComment(id: string) {
    const result = await appRequest<unknown, ResponseData<CommentProps>>(
      `${CommentPaths.like.endpoint}/${id}`,
      {},
      CommentPaths.like.method,
    );

    return result.data;
  }
}
export const appService = new AppService();