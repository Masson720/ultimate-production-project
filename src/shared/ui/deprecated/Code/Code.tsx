import { memo, useCallback } from "react";
import cls from './Code.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ThemeButton } from "../Button/Button";
import CopyIcon from '@/shared/assets/icons/copy-20-20.svg';

interface CodeProps {
    className?: string
    text: string
}

/**
 * Устарел, используйте новые компоненты из папки redesigned
 * @deprecated
 */

export const Code = memo((props: CodeProps) => {
    const {
        className, 
        text 
    } = props;

    const onCopy = useCallback(() => {
        navigator.clipboard.writeText(text)
    }, [text])

    return (
        <pre className={classNames(cls.Code, {}, [className])}>
            <Button 
                className={cls.copyBtn} 
                theme={ThemeButton.CLEAR} 
                onClick={onCopy}
            >
                <CopyIcon className={cls.copyIcon}/>
            </Button>
            <code>
                {text}
            </code>
        </pre>

    )
});
