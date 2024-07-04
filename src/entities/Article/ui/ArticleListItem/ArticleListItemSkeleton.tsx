import cls from './ArticleListItem.module.scss';
import { Skeleton as SkeletonDeprecated } from "@/shared/ui/deprecated/Skeleton/Skeleton";
import { Skeleton as SkeletonRedesigned } from "@/shared/ui/redesigned/Skeleton/Skeleton";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card as CardDeprecated } from "@/shared/ui/deprecated/Card/Card";
import { Card as CardRedesigned } from '@/shared/ui/redesigned/Card/Card';
import { ArticleView } from '@/entities/Article/model/consts/articleConsts';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';

interface ArticleListItemSkeletonProps {
    className?: string
    view?: string
}

export const ArticleListItemSkeleton = (props: ArticleListItemSkeletonProps) => {
    const {
        className,
        view = ArticleView.SMALL
    } = props;

    const Skeleton = toggleFeatures({name: 'isAppRedesigned', on: () => SkeletonRedesigned, off: () => SkeletonDeprecated});
    const Card = toggleFeatures({name: 'isAppRedesigned', on: () => CardRedesigned, off: () => CardDeprecated});

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned', 
        off: () => cls.ArticleListItem, 
        on: () => cls.ArticleListItemRedesigned
    })

    if(view === ArticleView.BIG){
        return (
            <div 
                className={classNames(mainClass, {}, [className, cls[view]])}
            >
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Skeleton border={'50%'} width={30} height={30}/>
                        <Skeleton width={150} height={16} className={cls.username}/>
                        <Skeleton width={150} height={16} className={cls.username}/>
                    </div>
                    <Skeleton width={250} height={24} className={cls.title} />
                    <Skeleton height={200} className={cls.img} />
                    <div className={cls.footer} >
                        <Skeleton height={36} width={200} />
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleListItem, {}, [className, cls[view]])}>
            <Card className={cls.card} >
                <div className={cls.imageWrapper}>
                    <Skeleton width={200} height={200} className={cls.img}/>
                </div>
                <div className={cls.infoWrapper} >
                    <Skeleton width={130} height={16} />
                </div>
                <Skeleton width={160} height={16} className={cls.title} />
            </Card>
        </div>
    )
}
