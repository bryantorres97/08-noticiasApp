import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TopHeadlines } from '../interfaces/topHeadlines.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  getTopHeadlines() {
    // tslint:disable-next-line: max-line-length
    return this.http.get<TopHeadlines>(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-09-05&sortBy=publishedAt&apiKey=f8d8242492a04fbdb1bedd8ac961e274`);
  }
}
