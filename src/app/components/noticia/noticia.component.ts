import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/article.interface';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/providers/data-local.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos: boolean;

  options: InAppBrowserOptions = {
    location: 'yes', // Or 'no'
    hidden: 'no', // Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'no', // Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', // Android only
    closebuttoncaption: 'Close', // iOS only
    disallowoverscroll: 'no', // iOS only
    toolbar: 'yes', // iOS only
    enableViewportScale: 'no', // iOS only
    allowInlineMediaPlayback: 'no', // iOS only
    presentationstyle: 'pagesheet', // iOS only
    fullscreen: 'yes', // Windows only
  };

  constructor(private iab: InAppBrowser,
              public actionSheetController: ActionSheetController,
              private socialSharing: SocialSharing,
              private dataLocal: DataLocalService,
              public toastController: ToastController) { }

  ngOnInit() {
    console.log('En favoritos', this.enFavoritos);
  }

  abrirNoticia() {
    console.log(this.noticia);
    // const browser = this.iab.create(this.noticia.url, '_blank', this.options);
    this.iab.create(this.noticia.url, '_system');
  }

  async mostrarMenu() {
    let guardarBorrarOpcion;
    if (this.enFavoritos) {
      // Borrar favoritos
      guardarBorrarOpcion = {
        text: 'Borrar de favoritos',
        icon: 'trash',
        cssClass: 'acion-dark',
        handler: () => {

          this.dataLocal.borrarNoticia(this.noticia);
          this.presentarMensaje('Tu noticia se ha borrado de favoritos');
        }
      };
    } else {
      guardarBorrarOpcion = {
        text: 'Guardar en favoritos',
        icon: 'bookmark',
        cssClass: 'acion-dark',
        handler: () => {

          this.dataLocal.guardarNoticia(this.noticia);
          this.presentarMensaje('Tu noticia se ha guardado en favoritos');
        }
      };
    }
    const actionSheet = await this.actionSheetController.create({
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'acion-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorrarOpcion,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'acion-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async presentarMensaje(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
