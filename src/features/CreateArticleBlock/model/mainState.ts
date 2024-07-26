import { ArticleBlockType } from "@/entities/Article"
import { ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from "@/entities/Article/model/types/article";

export const codeBlock: ArticleCodeBlock = {
    id: '',
    type: ArticleBlockType.CODE,
    code: ''
}

export const textBlock: ArticleTextBlock = {
    id: '',
    type: ArticleBlockType.TEXT,
    title: '',
    paragraphs: []
}

export const imageBlock: ArticleImageBlock = {
    id: '',
    type: ArticleBlockType.IMAGE,
    src: '',
    title: ''
}