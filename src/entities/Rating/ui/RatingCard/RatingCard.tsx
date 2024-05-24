import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './RatingCard.module.scss';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
import { Input } from "@/shared/ui/deprecated/Input/Input";
import { Card } from "@/shared/ui/deprecated/Card/Card";
import { HStack, VStack } from "@/shared/ui/deprecated/Stack";
import { StarRating } from "@/shared/ui/deprecated/StarRating/StartRating";
import { Modal } from "@/shared/ui/deprecated/Modal/Modal";
import { Button, ButtonSize, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { Drawer } from "@/shared/ui/deprecated/Drawer/Drawer";

interface RatingCardProps {
    className?: string
    title?: string
    feedbackTitle?: string
    hasFeedback?: boolean
    onCancel?: (starsCount: number) => void
    onAccept?: (starsCount: number, feedback?: string) => void 
    rate?: number
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        title,
        feedbackTitle,
        hasFeedback,
        onCancel,
        onAccept ,
        rate = 0
    } = props;

    const {t} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);
    const [feedback, setFeedback] = useState('');

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if(hasFeedback){
            setIsModalOpen(true);
        }else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept]);

    const accepthandler = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const cancelhandler = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>        
        </>
    )
     
    return (
        <Card data-testid='RatingCard' max className={classNames(cls.RatingCard, {}, [className])}>
            <VStack align="center" gap='8' max>
                <Text title={starsCount ? t('Спасибо за оценку!') : title}/>
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars}/>
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack gap='32' max>
                        <Text title={feedbackTitle} />
                        <Input data-testid='RatingCard.Input' value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>
                        <HStack gap='16' max justify="end">
                            <Button 
                                data-testid='RatingCard.Close' 
                                onClick={cancelhandler} 
                                theme={ThemeButton.OUTLINE_RED}
                            >
                                {t('Закрыть')}
                            </Button>
                            <Button 
                                data-testid='RatingCard.Send' 
                                onClick={accepthandler}
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelhandler}>
                    {modalContent}
                    <VStack gap='32' >
                        <Button onClick={cancelhandler} size={ButtonSize.L} fullWidth>
                            {t('Отправить')}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    )
}
