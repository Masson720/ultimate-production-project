import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { HStack } from "@/shared/ui/redesigned/Stack";
import cls from './ImageUploadingBlock.module.scss';
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { useCallback, useState } from "react";

interface ImageUploadingBlockProps {
    className?: string
    img: string
    onChange: (value: string) => void
}

export const ImageUploadingBlock = (props: ImageUploadingBlockProps) => {
    const {t} = useTranslation();
    const {
        className,
        img,
        onChange
    } = props;

    const [imgLink, setImgLink] = useState(img);

    const onChangeHandler = useCallback((value: string) => {
        setImgLink(value);
    }, [imgLink])

    const onSendImg = useCallback(() => {
        onChange(imgLink);
        setImgLink('')
    }, [imgLink])

    return (
        <HStack wrap="wrap" gap="8" max>
            {
                img 
                    && 
                <HStack className={cls.imgBlock}>
                    <AppImage src={img} className={cls.loadPreviewImage}/>
                    <Button size='size_s' variant="close"  className={cls.deleteBtn} onClick={() => onChange('')}>✖</Button>
                </HStack>
            }
            {
                !img
                    &&
                <HStack gap='32' max>
                    <Input size='m' placeholder={t('Укажите ссылку на фото')} value={imgLink} onChange={(value) => onChangeHandler(value)}/>
                    <Button size='size_m' onClick={onSendImg} >{t('Загрузить')}</Button>          
                </HStack>
            }
        </HStack>
    )
}
