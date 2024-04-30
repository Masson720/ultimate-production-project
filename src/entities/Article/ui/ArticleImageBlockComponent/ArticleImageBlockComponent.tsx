import { ArticleImageBlock } from "@/entities/Article/model/types/article";
import { memo } from "react";
import cls from './ArticleImageBlockComponent.module.scss';
import { Text, TextAlign } from "@/shared/ui/Text/Text";

interface ArticleImageBlockComponentProps {
    className?: string
    block: ArticleImageBlock
}

export const ArticleImageBlockComponent = memo((props: ArticleImageBlockComponentProps) => {
    const {
        className,
        block
    } = props;

    return (
        <div>
            <img className={cls.img} src={block.src} alt={block.title}/>
            {block.title && (
                <Text text={block.title} align={TextAlign.CENTER}/>
            )}
        </div>)
})
