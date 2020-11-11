Change log

01 Create project

- Ionic blank project

```
npm install -g @ionic/cli native-run cordova-res
ionic start photo-gallery blank --type=react --capacitor
```

- Add ionic PWA elements, https://github.com/ionic-team/pwa-elements 

```
npm install @ionic/react-hooks @ionic/pwa-elements
```

- Add in `index.tsx`

```
import { defineCustomElements } from '@ionic/pwa-elements/loader';
defineCustomElements(window);
```

- Take a photo, https://capacitorjs.com/docs/apis/camera

02 Displaying photos
