import { FC, memo, useCallback } from "react"
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss'
import { useTheme } from "@/app/providers/ThemeProvider";
import ThemeIcon from '@/shared/assets/icons/theme-light.svg';
import { ThemeButton, Button } from "@/shared/ui/Button/Button";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";
import { Icon } from "@/shared/ui/Icon/Icon";

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = memo((props) => {
    const {className} = props;
    const {theme, toggleTheme} = useTheme();
    const dispatch = useAppDispatch();

    const onToggleHandler = useCallback(() => {
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({theme: newTheme}));
        })
    }, [dispatch, toggleTheme])

    return (
        <Button theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={onToggleHandler}>
            <Icon Svg={ThemeIcon} width={40} height={40} inverted/>
            
        </Button>)
})
