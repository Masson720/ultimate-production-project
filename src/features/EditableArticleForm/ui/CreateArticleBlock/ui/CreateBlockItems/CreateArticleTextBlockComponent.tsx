import { ArticleTextBlock } from "@/entities/Article/model/types/article";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { TextArea } from "@/shared/ui/redesigned/TextArea/TextArea";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface CreateArticleTextBlockComponentProps {
    className?: string
    block: ArticleTextBlock
    textBlockHandler: (value: ArticleTextBlock) => void
}

export const CreateArticleTextBlockComponent = (props: CreateArticleTextBlockComponentProps) => {
    const {
        className,
        textBlockHandler,
        block
    } = props;
    const { t } = useTranslation();

    const titleHandler = useCallback((value: string) => {
        textBlockHandler({...block, title: value})
    }, [block])

    const textHandler = useCallback((value: string) => {
        textBlockHandler({...block, paragraphs: [value]})
    }, [block])

    return (
        <VStack gap='8' max>
            <Input onChange={titleHandler} value={block.title}/>
            <TextArea 
                placeholder={t('Введите текст статьи')} 
                rows={10} 
                cols={100}
                value={block.paragraphs[0]}
                onChange={textHandler}
            />
        </VStack>

    )
}