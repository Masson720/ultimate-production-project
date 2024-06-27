
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { classNames } from "@/shared/lib/classNames/classNames";
import { TabItem, Tabs as TabsDeprecated } from "@/shared/ui/deprecated/Tabs/Tabs";
import { ArticleType } from "@/entities/Article";
import { Tabs } from "@/shared/ui/redesigned/Tabs/Tabs";
import { ToggleFeatures } from "@/shared/features";

interface ArticleTabsTypeProps {
    className?: string
    value: ArticleType
    onChangeTab: (type: ArticleType) => void 
}

export const ArticleTabsType = (props: ArticleTabsTypeProps) => {
    const { className, value, onChangeTab } = props;
    const { t } = useTranslation('article');

    const onTabClick  = useCallback((tab: TabItem) => {
        onChangeTab(tab.value as ArticleType);
    }, []);

    const typeTabs = useMemo<TabItem[]>(() => [
        {
            value: ArticleType.ALL,
            content: t('Все')
        },
        {
            value: ArticleType.IT,
            content: t('Айти')
        },
        {
            value: ArticleType.ECONOMICS,
            content: t('Экономика')
        },
        {
            value: ArticleType.SCIENCE,
            content: t('Наука')
        },
    ], [t]);
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <TabsDeprecated
                    tabs={typeTabs} 
                    value={value}
                    className={classNames('', {}, [className])}
                    onTabClick={onTabClick} 
                />                
            }
            on={
                <Tabs 
                    tabs={typeTabs}
                    direction="column"
                    value={value}
                    className={classNames('', {}, [className])}
                    onTabClick={onTabClick} 
                />
            }
        />
    )
}
