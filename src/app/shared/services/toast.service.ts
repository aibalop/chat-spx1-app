import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastController: ToastController
  ) { }

  async success(
    message: string,
    header: string = '',
    duration: number = 1500,
    position: 'bottom' | 'top' | 'middle' = 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      color: 'success',
      message,
      header,
      duration,
      position
    });
    toast.present();
  }

  async warning(
    message: string,
    header: string = '',
    duration: number = 1500,
    position: 'bottom' | 'top' | 'middle' = 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      color: 'warning',
      message,
      header,
      duration,
      position
    });
    toast.present();
  }

  async info(
    message: string,
    header: string = '',
    duration: number = 1500,
    position: 'bottom' | 'top' | 'middle' = 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      color: 'dark',
      message,
      header,
      duration,
      position
    });
    toast.present();
  }

  async danger(
    message: string,
    header: string = '',
    duration: number = 1500,
    position: 'bottom' | 'top' | 'middle' = 'bottom'): Promise<void> {
    const toast = await this.toastController.create({
      color: 'danger',
      message,
      header,
      duration,
      position
    });
    toast.present();
  }

}
