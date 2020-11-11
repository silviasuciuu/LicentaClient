import { useCamera } from '@ionic/react-hooks/camera';
import { CameraResultType, CameraSource } from '@capacitor/core';

export function usePhotoGallery() {
  const { getPhoto } = useCamera();

  const takePhoto = async () => {
    const cameraPhoto = await getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
  };

  return {
    takePhoto
  };
}
