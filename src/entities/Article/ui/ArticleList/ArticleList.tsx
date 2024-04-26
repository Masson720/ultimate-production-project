import { classNames } from "shared/lib/classNames/classNames";
import cls from "./ArticleList.module.scss"
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import List from "react-virtualized/dist/es/List";
import { ListRowProps, WindowScroller } from "react-virtualized";
import { PAGE_ID } from "widgets/Page/Page";
import { ArticleView } from "../../model/consts/articleConsts";


interface ArticleListProps {
    className?: string
    articles: Article[]
    isLoading?: boolean
    target?: HTMLAttributeAnchorTarget
    view?: ArticleView
    virtualized?: boolean
}

const getSkeletons = (view: ArticleView) => {
    return (
        new Array(view === ArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((item, index) => (
            <ArticleListItemSkeleton 
                key={index} 
                view={view}
                className={cls.card}
            />
        ))
    )
}

export const ArticleList = memo((props: ArticleListProps) => {
    const {
        className,
        articles,
        target,
        isLoading,
        view = ArticleView.SMALL,
        virtualized = true
    } = props;
    const {t} = useTranslation('article');

    const isBig = view === ArticleView.BIG;

    const itemsPerRow = isBig ? 1 : 3;
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow);

    const rowRender = ({index, key, style}: ListRowProps) => {
            const items = [];
            const fromIndex = index * itemsPerRow;
            const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

            for(let i = fromIndex; i < toIndex; i+=1){
                items.push( 
                    <ArticleListItem 
                        article={articles[i]}
                        target={target}
                        className={cls.card}
                        view={view}
                        key={`str${i}`}
                    />
                )
            }

            return (
                <div
                    key={key}
                    style={style}
                    className={cls.row}
                >
                    {items}
                </div>
            );
        }

    if(!isLoading && !articles.length){
        return (
            <div className={classNames(cls.ArticleList, {}, [className])}>
                <Text 
                    size={TextSize.L} 
                    title={t('Статьи не найдены')} 
                />
            </div>
        )
    }

    return (
        <WindowScroller
            scrollElement={document.getElementById(PAGE_ID) as Element}
        >
            {({
                width, 
                height, 
                registerChild, 
                onChildScroll, 
                isScrolling, 
                scrollTop
            }) => (
                <div 
                    className={classNames(cls.ArticleList, {}, [className, cls[view]])}
                    //@ts-ignore
                    ref={registerChild}
                >
                    {virtualized
                    ? (
                        <List
                            height={height ?? 700}
                            rowCount={rowCount}
                            rowHeight={isBig ? 700 : 330}
                            rowRenderer={rowRender}
                            width={width ? width - 80 : 700} 
                            autoHeight
                            onScroll={onChildScroll}
                            isScrolling={isScrolling}
                            scrollTop={scrollTop}
                        />
                    )
                    : (
                        articles.map(item => (
                            <ArticleListItem 
                                article={item}
                                target={target}
                                className={cls.card}
                                view={view}
                                key={item.id}
                            />
                        ))
                    )}
                    {isLoading && getSkeletons(view)}                     
                </div>
            )}
        </WindowScroller>
    )
})