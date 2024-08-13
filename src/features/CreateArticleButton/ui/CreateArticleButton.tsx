import { getRouteArticlesCreate } from "@/shared/const/router";
import { AppLink } from "@/shared/ui/redesigned/AppLink/AppLink";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import { memo } from "react";
import CreateArticle from '@/shared/assets/icons/create.svg';


export const CreateArticleButton = memo(() => {
    const path = getRouteArticlesCreate();

    return (
        <AppLink to={path} >
            <Icon Svg={CreateArticle} width={18} height={18} />
        </AppLink>
    )
})
