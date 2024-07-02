import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ArticleListItem.module.scss'
import { Article, ArticleTextBlock} from "../../model/types/article";
import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';
import { useTranslation } from "react-i18next";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { ArticleBlockType, ArticleView } from "@/entities/Article/model/consts/articleConsts";
import { getRouteArticleDetails } from "@/shared/const/router";
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Icon } from "@/shared/ui/deprecated/Icon/Icon";
import { Card } from "@/shared/ui/deprecated/Card/Card";
import { Avatar } from "@/shared/ui/deprecated/Avatar/Avatar";
import { AppImage } from "@/shared/ui/redesigned/AppImage";
import { Skeleton } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { AppLink } from "@/shared/ui/deprecated/AppLink/AppLink";
import { Button, ThemeButton } from "@/shared/ui/deprecated/Button/Button";
import { ToggleFeatures } from "@/shared/features";
import { ArticleListItemDeprecated } from "./ArticleListItemDeprecated/ArticleListItemDeprecated";
import { ArticleListItemRedesigned } from "./ArticleListItemRedesigned/ArticleListItemRedesigned";
 
export interface ArticleListItemProps {
    className?: string
    article: Article
    view: ArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ArticleListItemDeprecated {...props} />
            }
            on={
                <ArticleListItemRedesigned {...props}/>
            }
        />
    )
})
