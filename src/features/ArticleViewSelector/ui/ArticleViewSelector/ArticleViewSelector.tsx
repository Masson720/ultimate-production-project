import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button/Button';
import cls from './ArticleViewSelector.module.scss';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TilesIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TilesIcon from '@/shared/assets/icons/tile.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon/Icon';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ArticleView } from '@/entities/Article/model/consts/articleConsts';
import { ToggleFeatures, toggleFeatures } from '@/shared/features';
import { Icon } from '@/shared/ui/redesigned/Icon/Icon';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [ 
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated
        })
    },
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TilesIcon,
            off: () => TilesIconDeprecated 
        })
    }
]

export const ArticleViewSelector = memo((props: ArticleViewSelectorProps) => {
    const { 
        className,
        view,
        onViewClick
    } = props;

    const onClick = (newView: ArticleView) => {
        return () => {
            onViewClick?.(newView)
        }
    }

    return (
        <div>
            <ToggleFeatures
                feature='isAppRedesigned'
                on={
                    <Card className={classNames(cls.ArticleViewSelectorRedesigned, {}, [className])} border='round'>
                        <HStack gap='8'>
                            {viewTypes.map(viewType => (
                                <Icon
                                    clickable
                                    key={viewType.view}
                                    onClick={onClick(viewType.view)}
                                    Svg={viewType.icon}
                                    className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                                />
                            ))}                            
                        </HStack>
                    </Card>                  
                }
                off={
                    <div>
                        {viewTypes.map(viewType => (
                            <ButtonDeprecated
                                theme={ThemeButton.CLEAR}
                                key={viewType.view}
                                onClick={onClick(viewType.view)}
                            > 
                                <IconDeprecated
                                    Svg={viewType.icon}
                                    key={viewType.view}
                                    className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                                    width={24}
                                    height={24}
                                />
                            </ButtonDeprecated>
                        ))}                         
                    </div>
                }
            />
        </div>
    )
})
