import { Article } from './article.interface';

export interface TopHeadlines {
    status: string;
    totalResults: number;
    articles: Article[];
}

