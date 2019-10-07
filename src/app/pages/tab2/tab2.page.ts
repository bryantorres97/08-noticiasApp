import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { Article } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment, { static: false }) segment: IonSegment;
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

  }

  private cargarNoticiasPorCategoria(categoria: string) {
    this.noticiasService.getTopHeadlinesByCategory(categoria).subscribe(data => {
      this.noticias.push(...data.articles);
      console.log(this.noticias);
    });
  }
}
