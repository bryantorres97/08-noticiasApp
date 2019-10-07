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

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string) {
    query = `${apiURL}${query}`;
    return this.http.get<T>(query, {headers});
  }

  getTopHeadlines() {
    // tslint:disable-next-line: max-line-length
    // return this.http.get<TopHeadlines>(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-09-07&sortBy=publishedAt&apiKey=f8d8242492a04fbdb1bedd8ac961e274`);
    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=co`);
  }

  getTopHeadlinesByCategory(categoria: string) {
    // return this.http.get<TopHeadlines>(`
    // https://newsapi.org/v2/top-headlines?country=co&category=business&apiKey=f8d8242492a04fbdb1bedd8ac961e274`);
    return this.ejecutarQuery<TopHeadlines>(`/top-headlines?country=co&category=${categoria}`);
  }
}
