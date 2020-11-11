import { useCamera } from '@ionic/react-hooks/camera';
import { CameraPhoto, CameraResultType, CameraSource, FilesystemDirectory } from '@capacitor/core';
import { useState } from 'react';
import { base64FromPath, useFilesystem } from '@ionic/react-hooks/filesystem';

export interface Photo {
  filepath: string;
  webviewPath?: string;
}

export function usePhotoGallery() {
  const { getPhoto } = useCamera();
  const [photos, setPhotos] = useState<Photo[]>([]);

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    const fileName = new Date().getTime() + '.jpeg';
    const savedFileImage = await savePicture(cameraPhoto, fileName);
    const newPhotos = [savedFileImage, ...photos];
    setPhotos(newPhotos);
  };

  const { writeFile } = useFilesystem();
  const savePicture = async (photo: CameraPhoto, fileName: string): Promise<Photo> => {
    const base64Data = await base64FromPath(photo.webPath!);
    const savedFile = await writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });

    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
  };

  return {
    photos,
    takePhoto
  };
}
