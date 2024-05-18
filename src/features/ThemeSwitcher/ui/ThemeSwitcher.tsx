import { FC, memo, useCallback } from "react"
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss'
import { Theme, useTheme } from "@/app/providers/ThemeProvider";
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import { ThemeButton, Button } from "@/shared/ui/Button/Button";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";

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

    return (<Button theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={onToggleHandler}>
            {theme === Theme.DARK ? <DarkIcon/> : <LightIcon/>}
        </Button>)
})
