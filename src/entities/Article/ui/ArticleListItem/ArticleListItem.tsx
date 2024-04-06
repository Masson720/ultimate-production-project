import { classNames } from "shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import { Article, ArticleBlockType, ArticleTextBlock, ArticleView } from "../../model/types/article";
import { Text } from "shared/ui/Text/Text";
import { Icon } from "shared/ui/Icon/Icon";
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from "shared/ui/Card/Card";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { useTranslation } from "react-i18next";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "shared/config/routeConfig/RouteConfig";

interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
}

export const ArticleListItem = (props: ArticleListItemProps) => {
    const {
        className,
        article,
        view = ArticleView.SMALL
    } = props;

    const { t } = useTranslation('article');
    const navigate = useNavigate();

    const onOpenArticle = useCallback(() => {
        navigate(RoutePath.article_details + article.id); 
    }, [article.id, navigate]); 

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
            <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar}/>
                        <Text text={article.user.username} className={cls.username}/>
                        <Text text={article.createdAt} className={cls.username}/>
                    </div>
                    <Text title={article.title} className={cls.title} /> 
                    {typesJSXElement}
                    <img src={article.img} className={cls.img} alt={article.title} />
                    {textBlocks && (
                        <ArticleTextBlockComponent block={textBlocks} className={cls.textBlock}/>
                    )}
                    <div className={cls.footer} >
                        <Button onClick={onOpenArticle } theme={ThemeButton.OUTLINE}>
                            {t('Читать далее')}
                        </Button>
                        {viewsJSXElement}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card} onClick={onOpenArticle}>
                <div className={cls.imageWrapper}>
                    <img alt={article.title } src={article.img} className={cls.img}/>
                    <Text text={article.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper} >
                    {typesJSXElement}
                    {viewsJSXElement}
                </div>
                <Text text={article.title} className={cls.title} />
            </Card>
        </div>
    )
}
