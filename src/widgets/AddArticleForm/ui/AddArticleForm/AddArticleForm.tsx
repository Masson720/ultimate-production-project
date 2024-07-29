import cls from './AddArticleForm.module.scss';
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { HStack } from "@/shared/ui/redesigned/Stack/HStack/HStack";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { CreateArticleBlock } from "@/features/CreateArticleBlock";
import { ImageUploadingBlock } from "@/features/ImageUploadingBlock";
import { ArticleTypeSelect } from '@/entities/ArticleTypeSelector';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { ArticleForm } from '@/features/ArticleEditorManager';

interface AddArticleFormProps {
    className?: string
    onChangeTitle: (value: string) => void
    onChangeType: (types: ArticleType[]) => void
    onChangeImg: (img: string) => void
    addBlock: (block: ArticleBlock) => void
    onChangeBlock: (block: ArticleBlock) => void
    onSendArticle: () => void
    formData: ArticleForm
    errors?: string
    success?: boolean
}

const AddArticleForm = (props: AddArticleFormProps) => {
    const { 
        className,
        onChangeTitle,
        onChangeType,
        onChangeImg,
        addBlock,
        onChangeBlock,
        onSendArticle,
        success = false,
        errors,
        formData
    } = props;
    const { t } = useTranslation();

    const form = (
        <>
            <Text text={errors} />
            <Input size="m" value={formData.title} placeholder={t("Заголовок статьи")} onChange={onChangeTitle} />
            <ImageUploadingBlock onChange={onChangeImg} img={formData.img} />
            <CreateArticleBlock onChangeBlock={onChangeBlock} addBlock={addBlock} blocks={formData.blocks} />
            <ArticleTypeSelect onClick={onChangeType} types={formData.type} />
            <HStack gap='32' max>
                {/* <Button>{t('В черновик')}</Button>
                <Button color="error">{t('Удалить')}</Button> */}
                <Button onClick={onSendArticle} variant="filled" >{t('Отправить')}</Button>                
            </HStack>           
        </>
    )

    const successForm = (
        <Text title={t('Статья успешно добавлена')} />
    )
    
    return (
            <HStack max>
                <VStack gap="24" max >
                    {success ? successForm : form}
                </VStack>
            </HStack>            
    )
}


export default memo(AddArticleForm);