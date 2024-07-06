import { memo } from "react";
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from "../ArticleListItem";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useTranslation } from "react-i18next";
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/redesigned/Card/Card";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Button } from "@/shared/ui/redesigned/Button/Button";
import { getRouteArticleDetails } from "@/shared/const/router";
import { AppLink } from "@/shared/ui/redesigned/AppLink/AppLink";
import { Avatar } from "@/shared/ui/redesigned/Avatar/Avatar";
import { ArticleTextBlock } from "@/entities/Article/model/types/article";
import { ArticleBlockType, ArticleView } from "@/entities/Article/model/consts/articleConsts";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";



export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleView.SMALL,
        target
    } = props;

    const { t } = useTranslation('article');

    const viewsJSXElement = (
        <HStack gap='8'>
            <Icon Svg={EyeIcon}/> 
            <Text text={String(article.views)} className={cls.view}/> 
        </HStack>
    )

    const userInfo = (
        <>
            <Avatar size={32} src={article.user.avatar} className={cls.avatar}/>
            <Text bold text={article.user.username}/>
        </>
    )

    if(view === ArticleView.BIG){
        let textBlocks = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
            <Card 
                data-testid='ArticleListItem' 
                padding='24'
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
                max
            >   
                <VStack gap='16' max > 
                    <HStack gap='8' max>
                        {userInfo}
                        <Text text={article.createdAt}/>
                    </HStack>
                    <Text bold title={article.title} className={cls.title} /> 
                    <Text size='s' title={article.subtitle} className={cls.title} /> 
                    <AppImage 
                        fallback={<Skeleton width='100%' height={250}/>}
                        src={article.img} 
                        className={cls.img} 
                        alt={article.title}
                    />
                    {textBlocks?.paragraphs && (
                        <Text
                        className={cls.textBlock}
                            text={textBlocks.paragraphs.slice(0, 2).join(' ')} 
                        />
                    )}
                    <HStack justify="between" max>
                        <AppLink target={target } to={getRouteArticleDetails(article.id)}>
                            <Button  variant="outline" >
                                {t('Читать далее')}
                            </Button>
                        </AppLink>
                        {viewsJSXElement} 
                    </HStack>                                                                         
                </VStack>
            </Card>
        )
    }

    return (
        <AppLink
            data-testid='ArticleListItem' 
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card} border="round" padding='0'>
                <AppImage 
                    fallback={<Skeleton width={'100%'} height={200}/>}
                    src={article.img} 
                    className={cls.img} 
                    alt={article.title}
                />
                <VStack className={cls.info} gap='4'>
                    <Text title={article.title} size="m" />
                    <VStack className={cls.footer} gap='4' max>
                        <HStack justify="between" max>
                            <Text 
                                text={article.createdAt}
                                className={cls.date}
                            />
                            {viewsJSXElement}
                        </HStack>
                        <HStack gap='4'>
                            {userInfo}
                        </HStack>
                    </VStack>
                </VStack>
            </Card>
        </AppLink>
    )
})
