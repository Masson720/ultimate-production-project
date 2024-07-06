import { memo, useCallback } from "react";
import cls from './Code.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button as ButtonDeprecated, ThemeButton } from "../../deprecated/Button/Button";
import CopyIconNew from '../../../assets/icons/copy.svg';
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';
import { ToggleFeatures } from "@/shared/features";
import { Icon } from "../Icon/Icon";

interface CodeProps {
    className?: string
    text: string
}

export const Code = memo((props: CodeProps) => {
    const {
        className, 
        text 
    } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={
                <pre className={classNames(cls.CodeRedesigned, {}, [className])}>
                        <Icon
                            clickable
                            onClick={onCopy} 
                            className={cls.copyBtn}
                            Svg={CopyIconNew} 
                        />
                    <code>
                        {text}
                    </code>
                </pre>                
            }
            off={
                <pre className={classNames(cls.Code, {}, [className])}>
                    <ButtonDeprecated
                        className={cls.copyBtn} 
                        theme={ThemeButton.CLEAR} 
                        onClick={onCopy}
                    >
                        <CopyIcon className={cls.copyIcon}/>
                    </ButtonDeprecated>
                    <code>
                        {text}
                    </code>
                </pre>
            }
        />

    )
});
