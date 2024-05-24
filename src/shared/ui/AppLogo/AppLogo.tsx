import { memo } from "react";
import cls from './AppLogo.module.scss';
import { HStack } from "../Stack";
import { classNames } from "@/shared/lib/classNames/classNames";
import AppSvg from '../../assets/icons/app-image.svg';


interface AppLogoProps {
    className?: string
}

export const AppLogo = memo((props: AppLogoProps) => {
    const { className } = props;
    return (
        <HStack max justify="center" className={classNames(cls.AppLogo, {}, [className])}>
            <div className={cls.gradientBig}></div>
            <div className={cls.gradientSmall}></div>
            <AppSvg className={cls.appLogo} />
        </HStack>
    )
})
