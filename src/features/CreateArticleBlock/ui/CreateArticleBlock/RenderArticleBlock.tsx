import { ArticleBlockType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { CreateArticleCodeBlockComponent } from "../CreateBlockItems/CreateArticleCodeBlockComponent";
import { CreateArticleImageBlockComponent } from "../CreateBlockItems/CreateArticleImageBlockComponent";
import { CreateArticleTextBlockComponent } from "../CreateBlockItems/CreateArticleTextBlockComponent";
import { memo } from "react";

interface RenderArticleBlockProps {
    block: ArticleBlock
    changeBlockHandler: (newBlock: ArticleBlock) => void
}

export const RenderArticleBlock = memo((props: RenderArticleBlockProps) => {
    const {
        block,
        changeBlockHandler
    } = props;

    switch(block.type){
        case ArticleBlockType.CODE:
            return <CreateArticleCodeBlockComponent codeBlockHandler={changeBlockHandler} block={block}/>
        case ArticleBlockType.IMAGE:
            return <CreateArticleImageBlockComponent imgBlockHandler={changeBlockHandler} block={block}/>
        case ArticleBlockType.TEXT:
            return <CreateArticleTextBlockComponent textBlockHandler={changeBlockHandler} block={block}/>
        default:
            return null;
    }
})