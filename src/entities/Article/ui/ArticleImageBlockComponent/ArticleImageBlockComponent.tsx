import { ArticleImageBlock } from "@/entities/Article/model/types/article";
import { memo } from "react";
import cls from './ArticleImageBlockComponent.module.scss';
import { Text as TextDeprecated, TextAlign } from "@/shared/ui/deprecated/Text/Text";
import { Text } from "@/shared/ui/redesigned/Text/Text";
import { ToggleFeatures } from "@/shared/features";

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
                <ToggleFeatures
                    feature='isAppRedesigned'
                    off={
                        <TextDeprecated text={block.title} align={TextAlign.CENTER}/>
                    }
                    on={
                        <Text text={block.title} align='center'/>
                    }
                />
            )}
        </div>)
})
