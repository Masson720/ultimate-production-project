import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { ArticleView } from '../../model/types/article';
import cls from './ArticleViewSelector.module.scss';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TilesIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';

interface ArticleViewSelectorProps {
    className?: string
    view: ArticleView
    onViewClick?: (view: ArticleView) => void
}

const viewTypes = [ 
    {
        view: ArticleView.BIG,
        icon: ListIcon
    },
    {
        view: ArticleView.SMALL,
        icon: TilesIcon
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
            {viewTypes.map(viewType => (
                <Button 
                    theme={ThemeButton.CLEAR}
                    key={viewType.view}
                    onClick={onClick(viewType.view)}
                > 
                    <Icon Svg={viewType.icon} 
                        className={classNames('', {[cls.notSelected]: viewType.view !== view})}
                    />
                </Button>
            ))}
        </div>
    )
})
