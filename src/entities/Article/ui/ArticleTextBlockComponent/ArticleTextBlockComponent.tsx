import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from "@/entities/Article/model/types/article";
import { Text } from "@/shared/ui/deprecated/Text/Text";


interface ArticleTextBlockComponentProps {
    className?: string
    block: ArticleTextBlock
}

export const ArticleTextBlockComponent = memo((props: ArticleTextBlockComponentProps) => {
    const {
        className,
        block
    } = props;

    return (<div className={classNames(cls.ArticleTextBlockComponent, {}, [className])}>
        {block.title && (
            <Text
                className={cls.title}
                title={block.title}
            />
        )
    }
        {block.paragraphs.map((paragraph) => (
                <Text 
                    key={paragraph} 
                    className={cls.paragraph} 
                    text={paragraph}
                /> 
        ))}
        </div>)
});