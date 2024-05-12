import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import { Article, ArticleTextBlock} from "../../model/types/article";
import { Text } from "@/shared/ui/Text/Text";
import { Icon } from "@/shared/ui/Icon/Icon";
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { Card } from "@/shared/ui/Card/Card";
import { Avatar } from "@/shared/ui/Avatar/Avatar";
import { Button, ThemeButton } from "@/shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { AppLink } from "@/shared/ui/AppLink/AppLink";
import { HTMLAttributeAnchorTarget } from "react";
import { ArticleBlockType, ArticleView } from "@/entities/Article/model/consts/articleConsts";
import { getRouteArticleDetails } from "@/shared/const/router";
import { AppImage } from "@/shared/ui/AppImage";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleView.SMALL,
        target
    } = props;

    const { t } = useTranslation('article');

    const typesJSXElement = <Text text={article.type.join(', ')} className={cls.types} />
    const viewsJSXElement = (
        <>
            <Text text={String(article.views)} className={cls.view}/> 
            <Icon Svg={EyeIcon} /> 
        </>
    )

    if(view === ArticleView.BIG){
        let textBlocks = article.blocks.find(
            (block) => block.type === ArticleBlockType.TEXT
        ) as ArticleTextBlock;

        return (
            <div 
                data-testid='ArticleListItem' 
                className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar}/>
                        <Text text={article.user.username} className={cls.username}/>
                        <Text text={article.createdAt} className={cls.username}/>
                    </div>
                    <Text title={article.title} className={cls.title} /> 
                    {typesJSXElement}
                    <AppImage 
                        fallback={<Skeleton width='100%' height={250}/>}
                        src={article.img} 
                        className={cls.img} 
                        alt={article.title}
                    />
                    {textBlocks && (
                        <ArticleTextBlockComponent block={textBlocks} className={cls.textBlock}/>
                    )}
                    <div className={cls.footer}>
                        <AppLink target={target } to={getRouteArticleDetails(article.id)}>
                            <Button  theme={ThemeButton.OUTLINE}>
                                {t('Читать далее')}
                            </Button>
                        </AppLink>
                        {viewsJSXElement} 
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <AppLink
            data-testid='ArticleListItem' 
            target={target}
            to={getRouteArticleDetails(article.id)}
            className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <AppImage 
                        fallback={<Skeleton width={200} height={200}/>}
                        src={article.img} 
                        className={cls.img} 
                        alt={article.title}
                    />
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper} >
                    {typesJSXElement}
                    {viewsJSXElement}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    )
}
