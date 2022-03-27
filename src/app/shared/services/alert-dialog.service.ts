import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  constructor(private alertController: AlertController) { }

  async showAlert(
    header: string = '',
    message: string = '',
    subHeader: string = '',
    confirmButtonText: string = 'Aceptar'): Promise<any> {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header,
      subHeader,
      message,
      buttons: [confirmButtonText]
    });

    await alert.present();
  }

  async inputField(
    header: string,
    message: string,
    type: any = 'text',
    subHeader: string = null,
    placeholder: string = '',
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar'): Promise<any> {
    return new Promise(async (resolve, reject) => {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header,
        message,
        subHeader,
        inputs: [
          {
            name: 'field',
            type,
            placeholder
          },
        ],
        buttons: [
          {
            text: cancelButtonText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              resolve(null);
            }
          }, {
            text: confirmButtonText,
            handler: (event) => {
              if (event.field) {
                resolve(event.field);
              } else {
                resolve(null);
              }
            }
          }
        ]

      });

      await alert.present();

    });
  }

  async confirm(
    header: string,
    message: string,
    subHeader: string = null,
    confirmButtonText: string = 'Aceptar',
    cancelButtonText: string = 'Cancelar'): Promise<boolean> {
    return new Promise(async (resolve, reject) => {

      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header,
        message,
        subHeader,
        buttons: [
          {
            text: cancelButtonText,
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              resolve(false);
            }
          }, {
            text: confirmButtonText,
            handler: () => {
              resolve(true);
            }
          }
        ]
      });

      await alert.present();

    });
  }

  async catchError(
    error: any,
    warningTitle: string = 'Acción no completada',
    errorTitle: string = 'Upps',
    errorMessage: string = 'Ocurrio un detalle, intentelo más tarde...'): Promise<any> {
    if (error.status < 500) {
      this.showAlert(warningTitle, error.error.message);
    } else {
      this.showAlert(errorTitle, errorMessage);
    }
  }

}
