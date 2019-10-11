import { Injectable } from '@angular/core';
import { Article } from '../interfaces/article.interface';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = [];

  constructor(private storage: Storage) { }

  guardarNoticia(noticia: Article) {
    this.noticias.unshift( noticia );
    this.storage.set('favoritos', this.noticias);
    console.log('Guardando noticia');
  }

  cargarFavoritos() {

  }
}
