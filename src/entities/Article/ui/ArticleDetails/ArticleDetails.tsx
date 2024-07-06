import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "@/entities/Article/model/selector/articleDetailsSelectors";
import { fetchArticleById } from "@/entities/Article/model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "@/entities/Article/model/slice/articleDetailsSlice";
import { memo } from "react";
import cls from './ArticleDetails.module.scss';
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text as TextDeprecated, TextAlign, TextSize } from '../../../../shared/ui/deprecated/Text/Text';
import { Text } from '../../../../shared/ui/redesigned/Text/Text';
import { useTranslation } from "react-i18next";
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { Avatar } from "@/shared/ui/deprecated/Avatar/Avatar";
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { HStack, VStack } from "@/shared/ui/redesigned/Stack";
import { RenderArticleBlock } from "./RenderArticleBlock";
import { ToggleFeatures } from "@/shared/features";
import { AppImage } from "@/shared/ui/redesigned/AppImage";

interface ArticleDetailsProps {
    id?: string
    className?: string
    
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

const Deprecated = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <HStack 
                justify="center"
                max
            >
                <Avatar 
                    size={200} 
                    src={article?.img} 
                    className={cls.avatar}
                />                    
            </HStack>
            <VStack 
                gap='4' 
                max
                data-testid='ArticleDetails.Info'
            >
                <TextDeprecated 
                    title={article?.title}
                    size={TextSize.L}
                    text={article?.subtitle}
                    align={TextAlign.LEFT}
                />
                <HStack 
                    gap='8' 
                    className={cls.articleInfo}
                >
                    <Icon Svg={EyeIcon}/>
                    <TextDeprecated 
                        text={String(article?.views)}
                        align={TextAlign.LEFT}
                    />
                </HStack>
                <HStack gap='8'>
                    <Icon Svg={CalendarIcon}/>
                    <TextDeprecated 
                        text={article?.createdAt}
                        align={TextAlign.LEFT}
                    />
                </HStack>                                      
            </VStack>
            {article?.blocks.map(RenderArticleBlock)}
        </>        
    )
}

const Redesigned = () => {
    const article = useSelector(getArticleDetailsData);
    return (
        <>
            <Text 
                title={article?.title}
                size='l'
                align='left'
                bold
            />
            <Text
                title={article?.subtitle}
                align='left'
                size='m'
            />
            <AppImage className={cls.img} fallback={<Skeleton width='100%' height='420px' border='16px' />} src={article?.img} />
            {article?.blocks.map(RenderArticleBlock)}
        </>         
    )
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    }, [id]);

    let content;

    if(isLoading){
        content = (
            < >
                <SkeletonDeprecated className={cls.avatar} width={200} height={200} border='50%'/>
                <SkeletonDeprecated className={cls.title } width={200} height={24}/>
                <SkeletonDeprecated className={cls.skeleton} width={600} height={24}/>
                <SkeletonDeprecated className={cls.skeleton} width='100%' height={200}/>
                <SkeletonDeprecated className={cls.skeleton} width='100%' height={200}/>
            </ >
        )
    } else if(error){
        content = (
            < >
                <TextDeprecated 
                    align={TextAlign.CENTER}
                    title={t('Произошла ошибка при загрузке статьи')}
                    />
            </ >
        )
    } else {
        content = (
            <ToggleFeatures
                feature="isAppRedesigned"
                off={
                    <Deprecated/>
                }
                on={
                    <Redesigned/>
                }
            />
        )
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={true}>
            <VStack 
                gap='16'
                max
                className={cls.ArticleDetails}
            >
                {content}
            </VStack>
        </DynamicModuleLoader>
    )
})
