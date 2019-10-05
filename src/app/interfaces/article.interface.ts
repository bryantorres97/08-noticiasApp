import { Source } from './source.interface';

export interface Article {
    source: Source;
    author: null | string;
    title: string;
    description: string;
    url: string;
    urlToImage: null | string;
    publishedAt: string;
    content: null | string;
}
