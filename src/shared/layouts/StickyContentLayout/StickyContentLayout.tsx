import { ReactElement, memo } from 'react';
import cls from './StyckyContentLayout.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';


interface StyckyLayoutContetnProps {
    className?: string
    left?: ReactElement
    content: ReactElement
    right?: ReactElement
}

export const StickyContentLayout = memo((props: StyckyLayoutContetnProps) => {
    const { className, left, content, right } = props;
    return (
        <div className={classNames(cls.MainLayout, {}, [className])}>
            {right && <div className={cls.left}>{left}</div>}
            <div className={cls.content} >{content}</div>
            {left && <div className={cls.right}>{right}</div>}
        </div>
    )
})
