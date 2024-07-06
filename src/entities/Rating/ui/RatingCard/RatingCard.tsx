import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './RatingCard.module.scss';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text/Text';
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
import { Input as InputDeprecated } from "@/shared/ui/deprecated/Input/Input";
import { Input } from "@/shared/ui/redesigned/Input/Input";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card/Card";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { StarRating } from "@/shared/ui/deprecated/StarRating/StartRating";
import { Modal } from "@/shared/ui/redesigned/Modal/Modal";
import { Button as ButtonDeprecated, ButtonSize, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { Drawer } from "@/shared/ui/redesigned/Drawer/Drawer";
import { ToggleFeatures } from "@/shared/features";
import { Card } from "@/shared/ui/redesigned/Card/Card";

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
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <>
                        <TextDeprecated title={feedbackTitle} />
                        <InputDeprecated value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>                            
                    </>
                }
                on={
                    <>
                        <Text title={feedbackTitle} />
                        <Input value={feedback} onChange={setFeedback} placeholder={t('Ваш отзыв')}/>                       
                    </>
                }
            />      
    )

    const content = (
        <>
            <VStack align="center" gap='8' max>
                <ToggleFeatures
                    feature='isAppRedesigned'
                    off={
                        <TextDeprecated title={starsCount ? t('Спасибо за оценку!') : title}/>
                    }
                    on={
                        <TextDeprecated title={starsCount ? t('Спасибо за оценку!') : title}/>
                    }
                />
                <StarRating selectedStars={starsCount} size={40} onSelect={onSelectStars}/>
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack gap='32' max>
                        {modalContent}
                        <ToggleFeatures 
                            feature={"isAppRedesigned"} 
                            on={
                                <HStack gap='16' max justify="end">
                                    <Button
                                        data-testid='RatingCard.Close' 
                                        onClick={cancelhandler} 
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
                            } 
                            off={
                                <HStack gap='16' max justify="end">
                                    <ButtonDeprecated 
                                        data-testid='RatingCard.Close' 
                                        onClick={cancelhandler} 
                                        theme={ThemeButton.OUTLINE_RED}
                                    >
                                        {t('Закрыть')}
                                    </ButtonDeprecated>
                                    <ButtonDeprecated 
                                        data-testid='RatingCard.Send' 
                                        onClick={accepthandler}
                                    >
                                        {t('Отправить')}
                                    </ButtonDeprecated>
                                </HStack>
                            }
                        />
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={cancelhandler}>
                    {modalContent}
                    <VStack gap='32' >
                        <ToggleFeatures
                            feature="isAppRedesigned"
                            off={
                                <ButtonDeprecated onClick={cancelhandler} size={ButtonSize.L} fullWidth>
                                    {t('Отправить')}
                                </ButtonDeprecated>
                            }
                            on={
                                <Button onClick={cancelhandler} size='size_l' fullWidth>
                                    {t('Отправить')}
                                </Button>
                            }
                        />
                    </VStack>
                </Drawer>
            </MobileView>        
        </>
    )
     
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <CardDeprecated data-testid='RatingCard' max className={classNames(cls.RatingCard, {}, [className])}>
                    {content}
                </CardDeprecated>
            }
            on={
                <Card data-testid='RatingCard' border='partial' padding='24' max className={classNames(cls.RatingCard, {}, [className])}>
                    {content}
                </Card>
            }
        />
    )
}
