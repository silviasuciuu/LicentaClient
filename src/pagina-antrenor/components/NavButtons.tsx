import { IonButton, IonMenuButton } from "@ionic/react";
import React, { useEffect } from "react";
import {PaginaAntrenorProps} from "../profilePage/PaginaAntrenorProps";

interface PaginaAntrenorPropsExt extends PaginaAntrenorProps {
  onEdit: (id?: string) => void;
}


export const NavButtons = () => {
  const [mQuery, setMQuery] = React.useState<any>({
    matches: window.innerWidth > 768 ? true : false,
  });

  useEffect(() => {
    let mediaQuery = window.matchMedia("(min-width: 768px)");
    mediaQuery.addListener(setMQuery);

    return () => mediaQuery.removeListener(setMQuery);
  }, []);


  return (
    <div>
      {mQuery && !mQuery.matches ? (
        <IonMenuButton />
      ) : (
        <>
          <IonButton routerLink={"/home"}>Acasa</IonButton>
          <IonButton routerLink={"/page-1"}>Editeaza profilul </IonButton>
          <IonButton routerLink={"/page-2"}>Two</IonButton>
        </>
      )}
    </div>
  );
};
