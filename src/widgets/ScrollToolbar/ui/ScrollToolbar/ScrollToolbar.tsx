import { ScrollToTopButton } from '@/features/scroolToTopButton';
import cls from './ScrollToolbar.module.scss';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ScrollToolbarProps {
    className?: string
}

export const ScrollToolbar = (props: ScrollToolbarProps) => {
    const {
        className
    } = props;

    return (
        <VStack 
            justify='center' 
            align='center'
            max 
            className={classNames(cls.ScrollToolbar, {}, [className])}
        >
            <ScrollToTopButton/>
        </VStack>
    )
}
