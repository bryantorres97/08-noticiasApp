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
    const existe = this.noticias.find(news => news.title === noticia.title);
    if (!existe) {
      this.noticias.unshift(noticia);
      this.storage.set('favoritos', this.noticias);

    }
  }

  async cargarFavoritos() {
    const favoritos = await this.storage.get('favoritos');
    if (favoritos) {
      console.log('async', favoritos);
      this.noticias = favoritos;
    }
  }

  borrarNoticia(noticia: Article) {
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this.storage.set('favoritos', this.noticias);
  }
}
