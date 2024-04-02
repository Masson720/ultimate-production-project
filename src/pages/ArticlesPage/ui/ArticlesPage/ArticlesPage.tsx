import { memo } from "react";
import cls from './ArticlesPage.module.scss';

const ArticlesPage = () => {
    return (<div className={cls.ArticlesPage}>
        ARTICLES PAGE
    </div>)
}

export default memo(ArticlesPage);