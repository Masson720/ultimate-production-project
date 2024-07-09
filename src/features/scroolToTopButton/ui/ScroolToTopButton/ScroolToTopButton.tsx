import { Icon } from "@/shared/ui/redesigned/Icon/Icon";
import cls from './ScroolToTopButton.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { memo } from "react";
import CircleIcon from '@/shared/assets/icons/circle-up.svg';

interface ScrollToTopButtonProps {
    className?: string
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
    const {
        className
    } = props;

    const onClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }

    return (
        <Icon
            clickable
            Svg={CircleIcon}
            onClick={onClick}
            width={32} 
            height={32} 
            className={classNames(cls.ScrollToTopButton, {}, [className])}
        />
    )
})
