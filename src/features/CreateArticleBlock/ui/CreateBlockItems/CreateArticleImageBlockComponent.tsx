import { ArticleImageBlock } from '@/entities/Article/model/types/article';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface CreateArticleImageBlockComponentProps {
    className?: string
    block: ArticleImageBlock
    imgBlockHandler: (newBlock: ArticleImageBlock) => void
}

//ToDo заменить внутрянку на переиспользуемый компонент

export const CreateArticleImageBlockComponent = (props: CreateArticleImageBlockComponentProps) => {
    const { 
        className,
        block,
        imgBlockHandler
    } = props;
    const { t } = useTranslation();
    const [title, setTitle] = useState(block.src);
    const [src, setSrc] = useState(block.title)

    const sendBlock = () => {
        imgBlockHandler({...block, src: src, title: title})
    }

    const imgHandler = useCallback((value: string) => {
        setSrc(value);
    }, []);

    const imgTitleHandler = useCallback((value: string) => {
        setTitle(value);
    }, [])

    return (
        <VStack gap='8' max>
            {
                !block.src 
                    ?
                <>
                    <Input onChange={imgHandler} value={src} placeholder={t('Введите ссылку на картинку')}/>
                    <Input onChange={imgTitleHandler} value={title} placeholder={t('Введите подпись к картинке')}/>
                    <Button onClick={sendBlock}>{t('Загрузить')}</Button>     
                </>  
                    :
                <>
                    <AppImage src={block.src}/>
                    <Text text={block.title} />              
                </>
            }
        </VStack>
    )
}
