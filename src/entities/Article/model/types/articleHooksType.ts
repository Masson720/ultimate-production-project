import { ArticleType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";

export interface Errors {
    title: string
    blocks: string
    type: string
}

export interface UseEditArticleResult {
    onChangeTitle: (value: string) => void
    onChangeType: (types: ArticleType[]) => void
    onChangeImg: (img: string) => void
    addBlock: (block: ArticleBlock) => void
    onChangeBlock: (block: ArticleBlock) => void
    onEditArticle: () => void
    onSendArticle: () => void
}