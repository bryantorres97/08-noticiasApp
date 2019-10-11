import { Component } from '@angular/core';
import { DataLocalService } from 'src/app/providers/data-local.service';
import { Article } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  noticias: Article[] = [];
  constructor(public dataLocal: DataLocalService) {
    this.dataLocal.cargarFavoritos();
  }

}
