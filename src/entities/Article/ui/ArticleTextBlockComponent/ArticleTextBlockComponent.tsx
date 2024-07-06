import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleTextBlockComponent.module.scss';
import { ArticleTextBlock } from "@/entities/Article/model/types/article";
import { Text as TextDeprecated } from "@/shared/ui/deprecated/Text/Text";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { ToggleFeatures } from "@/shared/features";


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
            <ToggleFeatures
                feature='isAppRedesigned'
                off={
                    <TextDeprecated
                        className={cls.title}
                        title={block.title}
                    />
                }
                on={
                    <Text
                        className={cls.title}
                        title={block.title}
                    />
                }
            />
        )
    }
        {block.paragraphs.map((paragraph) => (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <TextDeprecated 
                        key={paragraph} 
                        className={cls.paragraph} 
                        text={paragraph}
                    /> 
                }
                on={
                    <Text
                        key={paragraph} 
                        className={cls.paragraph} 
                        text={paragraph}
                    />
                }
            />
        ))}
        </div>)
});