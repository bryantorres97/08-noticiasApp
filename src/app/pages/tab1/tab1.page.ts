import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/providers/noticias.service';
import { Article } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  noticias: Article[] = [];
  constructor(private noticiasService: NoticiasService) {
    this.noticiasService.getTopHeadlines().subscribe(data => {
      this.noticias.push(...data.articles);
      console.log(this.noticias);
    });
  }

  ngOnInit() {

  }

}
