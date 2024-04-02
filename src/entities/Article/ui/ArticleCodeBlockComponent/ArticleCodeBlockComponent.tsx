import { ArticleCodeBlock } from "entities/Article/model/types/article";
import { memo } from "react";
import { Code } from "shared/ui/Code/Code";
import cls from './ArticleCodeBlockComponent.module.scss';

interface ArticleCodeBlockComponent {
    className?: string
    block: ArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: ArticleCodeBlockComponent) => {
    const {
        className,
        block
    } = props;

    return (
        <div className={cls.ArticleCodeBlockComponent}>
            <Code text={block.code}/>
        </div>)
})
