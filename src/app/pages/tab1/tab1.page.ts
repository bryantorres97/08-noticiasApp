import { Component, OnInit, ViewChild } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { Article } from 'src/app/interfaces/article.interface';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  constructor(private noticiasService: NoticiasService) {
    this.cargarNoticias();
  }

  ngOnInit() {

  }

  loadData(event) {
    this.cargarNoticias(event);
  }

  private cargarNoticias(event?) {
    this.noticiasService.getTopHeadlines().subscribe(data => {
      if (data.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        // this.infiniteScroll.disabled = true;
        return;
      }
      this.noticias.push(...data.articles);
      console.log(this.noticias);
      if (event) {
        event.target.complete();
        this.infiniteScroll.disabled = true;
      }
    });
  }


}
