import { ArticleBlock, ArticleCodeBlock, ArticleImageBlock, ArticleTextBlock } from '@/entities/Article/model/types/article';
import { RenderArticleBlock } from './RenderArticleBlock';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { useTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { codeBlock, imageBlock, textBlock } from '../../model/mainState';
import { generateId } from '@/shared/lib/generateId/generateId';

// interface CreateArticleBlockType extends ArticleBlock {
//     userId: string
// }

interface RenderCreateArticleBlockProps {
    userId: string
    blocks: ArticleBlock[]
    addBlock: (block: ArticleBlock) => void
    onChangeBlock: (block: ArticleBlock) => void
}

export const CreateArticleBlock = (props: RenderCreateArticleBlockProps) => {
    const {
        blocks,
        addBlock,
        onChangeBlock
    } = props;
    const { t } = useTranslation();

    const createText = useCallback(() => {
        addBlock({...textBlock, id: generateId()});
    }, [blocks]);

    const createImg = useCallback(() => {
        addBlock({...imageBlock, id: generateId()});
    }, [blocks]);

    const createCode = useCallback(() => {
        addBlock({...codeBlock, id: generateId()});
    }, [blocks]);

    return (
        <>
            {
                blocks.map((block) => {
                    return (
                        <RenderArticleBlock 
                            changeBlockHandler={onChangeBlock}
                            key={block.id} 
                            block={block}
                        />   
                    )
                })
            }
            <HStack gap='16' >
                <Button onClick={createImg}>{t('Добавить картинку')}</Button>
                <Button onClick={createText}>{t('Добавить текст')}</Button>
                <Button onClick={createCode}>{t('Добавить код')}</Button>
            </HStack> 
        </>
    )
}
