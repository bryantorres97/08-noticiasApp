import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment, IonInfiniteScroll } from '@ionic/angular';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { Article } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSegment, {static: false}) segment: IonSegment;
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {
   this.cargarNoticiasPorCategoria(this.categorias[0]);
  }


  ngOnInit() {
    // this.segment.value = this.categorias[0];
  }

  segmentChanged(event) {
    // console.log(event.detail.value);
    this.noticias = [];
    this.cargarNoticiasPorCategoria(event.detail.value);
    this.infiniteScroll.disabled = false;
    // console.log(this.segment.value);

  }

  loadData(event) {
    console.log(this.segment.value);
    this.cargarNoticiasPorCategoria(this.segment.value, event);
  }


  private cargarNoticiasPorCategoria(categoria: string, event?) {
    this.noticiasService.getTopHeadlinesByCategory(categoria).subscribe(data => {
      if (data.articles.length === 0) {
        event.target.disabled = true;
        event.target.complete();
        return;
      }

      this.noticias.push(...data.articles);
      console.log(this.noticias);
      if (event) {
        event.target.complete();
        // this.infiniteScroll.disabled = true;
      }
    });
  }
}
