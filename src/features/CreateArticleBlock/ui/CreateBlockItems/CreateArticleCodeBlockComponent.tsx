import { ArticleCodeBlock } from "@/entities/Article/model/types/article";
import { HStack } from "@/shared/ui/redesigned/Stack";
import { TextArea } from "@/shared/ui/redesigned/TextArea/TextArea"
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

interface CreateArticleCodeBlockComponentProps {
    className?: string
    block: ArticleCodeBlock
    codeBlockHandler: (newblock: ArticleCodeBlock) => void
}

export const CreateArticleCodeBlockComponent = (props: CreateArticleCodeBlockComponentProps) => {
    const {
        className,
        codeBlockHandler,
        block
    } = props;
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        codeBlockHandler({...block, code: value})
    }, [])

    return (
        <HStack max>
            <TextArea 
                placeholder={t('Введите код')} 
                value={block.code} 
                onChange={onChangeHandler}
                rows={10} 
                cols={100}
            />
        </HStack>
    )
}
