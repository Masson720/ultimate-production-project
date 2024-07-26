import { User } from "@/entities/User";
import { ArticleBlockType, ArticleType } from "../consts/articleConsts";

export interface ArticleBlockBase {
    id: string
    type: ArticleBlockType
}

export interface ArticleCodeBlock extends ArticleBlockBase {
    type: ArticleBlockType.CODE
    userId?: string
    code: string
}

export interface ArticleImageBlock extends ArticleBlockBase {
    type: ArticleBlockType.IMAGE
    userId?: string
    src: string
    title: string
}

export interface ArticleTextBlock extends ArticleBlockBase {
    type: ArticleBlockType.TEXT
    userId?: string
    title: string
    paragraphs: string[]
}   

export type ArticleBlock = ArticleCodeBlock | ArticleImageBlock | ArticleTextBlock;



export interface Article {
    id: string
    title: string
    subtitle: string
    img: string
    views: number
    createdAt: string
    user: User
    type: ArticleType[]
    blocks: ArticleBlock[]
}