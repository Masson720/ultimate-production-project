import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "@/entities/Article/model/selector/articleDetailsSelectors";
import { fetchArticleById } from "@/entities/Article/model/services/fetchArticleById/fetchArticleById";
import { articleDetailsReducer } from "@/entities/Article/model/slice/articleDetailsSlice";
import { memo, useCallback } from "react";
import cls from './ArticleDetails.module.scss';
import { useSelector } from "react-redux";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Text, TextAlign, TextSize } from '../../../../shared/ui/deprecated/Text/Text';
import { useTranslation } from "react-i18next";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Avatar } from "@/shared/ui/deprecated/Avatar/Avatar";
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import CalendarIcon from '@/shared/assets/icons/calendar-20-20.svg';
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { HStack, VStack } from "@/shared/ui/deprecated/Stack";
import { ArticleBlockType } from "@/entities/Article/model/consts/articleConsts";

interface ArticleDetailsProps {
    id?: string
    className?: string
    
}

const reducers: ReducersList = {
    articleDetails: articleDetailsReducer
}

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
    const { id } = props;
    const dispatch = useAppDispatch();
    const { t } = useTranslation('article');
    const isLoading = useSelector(getArticleDetailsIsLoading);
    const article = useSelector(getArticleDetailsData);
    const error = useSelector(getArticleDetailsError);

    const renderBlock = useCallback((block: ArticleBlock) => {
        switch(block.type){
            case ArticleBlockType.CODE:
                return <ArticleCodeBlockComponent key={block.id} className={cls.block} block={block}/>
            case ArticleBlockType.IMAGE:
                return <ArticleImageBlockComponent key={block.id} className={cls.block} block={block}/>
            case ArticleBlockType.TEXT:
                return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block}/>
            default:
                return null;
        }
    }, [])

    useInitialEffect(() => {
        dispatch(fetchArticleById(id));
    }, [id]);

    let content;

    if(isLoading){
        content = (
            < >
                <Skeleton className={cls.avatar} width={200} height={200} border='50%'/>
                <Skeleton className={cls.title } width={200} height={24}/>
                <Skeleton className={cls.skeleton} width={600} height={24}/>
                <Skeleton className={cls.skeleton} width='100%' height={200}/>
                <Skeleton className={cls.skeleton} width='100%' height={200}/>
            </ >
        )
    } else if(error){
        content = (
            < >
                <Text 
                    align={TextAlign.CENTER}
                    title={t('Произошла ошибка при загрузке статьи')}
                    />
            </ >
        )
    } else {
        content = (
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
                    <Text 
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
                        <Text 
                            text={String(article?.views)}
                            align={TextAlign.LEFT}
                        />
                    </HStack>
                    <HStack gap='8'>
                        <Icon Svg={CalendarIcon}/>
                        <Text 
                            text={article?.createdAt}
                            align={TextAlign.LEFT}
                        />
                    </HStack>                                      
                </VStack>
                {article?.blocks.map(renderBlock)}
            </>
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
