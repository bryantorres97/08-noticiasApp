import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopHeadlines } from '../interfaces/topHeadlines.interface';
import { environment } from 'src/environments/environment';

/* ------------------------------- CONSTANTES ------------------------------- */

const apiKey =  environment.apiKey;
const apiURL = environment.apiURL;
const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  headlinesPage = 0;

  categoriaActual = '';
  categoriaPage = 0;
  country = 'us';

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = `${apiURL}${query}`;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines() {
    this.headlinesPage++;
    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=${this.country}&page=${this.headlinesPage}`);
  }

  getTopHeadlinesByCategory(categoria: string) {
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    } else {
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<TopHeadlines>
    (`/top-headlines?country=${this.country}&category=${categoria}&page=${this.categoriaPage}`);
  }
}
