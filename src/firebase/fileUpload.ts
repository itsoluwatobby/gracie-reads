import { nanoid } from 'nanoid';
import { fileStorage } from './firebase'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'

type PathType = 'thumbnail' | 'audios';

class FileUploadManager {

  uploadFile(image: File, storePath: PathType): Promise<ImageReturnType> {
    return new Promise((resolve, reject) => {
      const photoName = `${image.name}-${nanoid(5)}`
      const storageRef = ref(fileStorage, `images/${storePath}/${photoName}`)
      const uploadTask = uploadBytesResumable(storageRef, image)
      uploadTask.on('state_changed', (snap: unknown) => {
        void(snap)
      },(error: unknown) => {
          void(error)
          reject({status: "failed", url: ''})
        }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadUrl: string) => {
            return resolve({status: 'success', url: downloadUrl})
          })
          .catch((error: unknown) => {
            void(error)
            return reject({status: 'failed', url: ''})
          })
        }
      )
    })
  }
  
  deleteFile(image: string, storePath: PathType) {
    const imageName = image?.split('?alt=')[0]?.split(`images%2F${storePath}%2F`)[1]
    return new Promise((resolve, reject) => {
      const deleteRef = ref(fileStorage, `images/${storePath}/${imageName}`)
      deleteObject(deleteRef)
      .then(() => resolve('successful'))
      .catch(() => reject('An Error occurred'))
    })
  }
}  
export const fileUploadManager = new FileUploadManager();
