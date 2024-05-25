import { FC, memo, useCallback } from "react"
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './ThemeSwitcher.module.scss'
import { useTheme } from "@/app/providers/ThemeProvider";
import ThemeIconDeprecated from '@/shared/assets/icons/theme-light.svg';
import ThemeIcon from '@/shared/assets/icons/theme.svg';
import { ThemeButton, Button as ButtonDeprecated } from "@/shared/ui/deprecated/Button/Button";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { saveJsonSettings } from "@/entities/User";
import { Icon as IconDeprecated } from "@/shared/ui/deprecated/Icon/Icon";
import { ToggleFeatures } from "@/shared/features";
import { Icon } from "@/shared/ui/redesigned/Icon/Icon";

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
        <ToggleFeatures
            feature="isAppRedesigned"
            off={
                <ButtonDeprecated theme={ThemeButton.CLEAR} className={classNames(cls.ThemeSwitcher, {}, [className])} onClick={onToggleHandler}>
                    <IconDeprecated Svg={ThemeIconDeprecated} width={40} height={40} inverted/>
                </ButtonDeprecated>
            }
            on={
                <Icon 
                    Svg={ThemeIcon} 
                    clickable 
                    onClick={onToggleHandler}
                />
            }
        />

        )
})
