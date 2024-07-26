import { useTranslation } from 'react-i18next';
import { useCallback, useMemo } from 'react';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { TabItem } from '@/shared/ui/redesigned/Tabs/Tabs';
import { ArticleType } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TabItemButton } from '@/shared/ui/redesigned/TabItem/TabItem';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface ArticletypeSelectProps {
    className?: string
    types: ArticleType[]
    onClick: (type: ArticleType[]) => void
}

export const ArticleTypeSelect = (props: ArticletypeSelectProps) => {
    const {
        className,
        types,
        onClick
    } = props;
    
    const { t } = useTranslation();
    let articleTypes: string[] = [...types];
    const typeTabs = useMemo<TabItem[]>(() => [
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
    const tabClickHandler = useCallback((tab: TabItem) => {
        //@ts-ignore
        if(!articleTypes.includes(tab.value)){
            articleTypes.push(tab.value);
            onClick(articleTypes as ArticleType[])
        }else{
            console.log(articleTypes.filter(e => e !== tab.value))
            articleTypes = articleTypes.filter(e => e !== tab.value);
            onClick(articleTypes as ArticleType[])
        }
    }, [typeTabs]);

    return (
        <HStack gap='16'>
            <Text text={t('Выберите тематику статьи:')}/>
            {typeTabs.map((tab) => {
                //@ts-ignore
                const isSelected = types.includes(tab.value);
                return <TabItemButton isSelected={isSelected} onClick={tabClickHandler} tab={tab}/>
            })}
        </HStack>
    )
}