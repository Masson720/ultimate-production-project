import cls from './AddArticleForm.module.scss';
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { VStack } from "@/shared/ui/redesigned/Stack";
import { HStack } from "@/shared/ui/redesigned/Stack/HStack/HStack";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { ArticleForm, ArticleType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { CreateArticleBlock } from "@/features/CreateArticleBlock";
import { ImageUploadingBlock } from "@/features/ImageUploadingBlock";
import { ArticleTypeSelect } from '@/entities/ArticleTypeSelector';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { Errors } from '@/entities/Article/model/types/articleHooksType';

interface AddArticleFormProps {
    className?: string
    onChangeTitle: (value: string) => void
    onChangeType: (types: ArticleType[]) => void
    onChangeImg: (img: string) => void
    addBlock: (block: ArticleBlock) => void
    onChangeBlock: (block: ArticleBlock) => void
    onSendArticle: () => void
    formData?: ArticleForm
    errors?: string
    validateErrors?: Errors
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
        formData,
        validateErrors
    } = props;

    const { t } = useTranslation();

    if(!formData){
        return null;
    }
    const form = (
        <>
            <Text text={errors} />
            {validateErrors?.title && <Text variant='error' text={validateErrors.title}/>}
            <Input size="m" value={formData.title} placeholder={t("Заголовок статьи")} onChange={onChangeTitle}/>
            <ImageUploadingBlock onChange={onChangeImg} img={formData.img} />
            {validateErrors?.blocks && <Text variant='error' text={validateErrors.blocks}/>}
            <CreateArticleBlock onChangeBlock={onChangeBlock} addBlock={addBlock} blocks={formData.blocks} />
            {validateErrors?.type && <Text variant='error' text={validateErrors.type}/>}
            <ArticleTypeSelect onClick={onChangeType} types={formData.type} />
            <HStack gap='32' max>
                {/* <Button>{t('В черновик')}</Button>
                <Button color="error">{t('Удалить')}</Button> */}
                <Button onClick={onSendArticle} variant="filled" >{t('Отправить')}</Button>                
            </HStack>           
        </>
    )

    const successForm = (
        <Text title={t('Статья успешно отредактирована')} />
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