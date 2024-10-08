
import { MutableRefObject, ReactNode, useRef, UIEvent } from 'react';
import cls from './Page.module.scss';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getUIScrollByPath, uiActions } from '@/features/ScrollSave';
import { useLocation } from 'react-router-dom';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';
import { useTrottle } from '@/shared/lib/hooks/useTrottle/useTrottle';
import { toggleFeatures } from '@/shared/features';
import { TestProps } from '@/shared/types/testProps';

interface PageProps extends TestProps {
    className?: string
    children: ReactNode
    onScrollEnd?: () => void
}

export const PAGE_ID = 'page_id';

export const Page = (props: PageProps) => {
    const {
        className,
        children,
        onScrollEnd
    } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

    useInfiniteScroll({
        triggerRef,
        wrapperRef: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => undefined,
            off: () => wrapperRef
        }),
        callback: onScrollEnd
    });

    useInitialEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, []);

    const onScroll = useTrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(uiActions.setScrollPosition({
            position: e.currentTarget.scrollTop,
            path: pathname
        }))
    }, 500); 

    toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.PageRedesigned,
        off: () => cls.Page
    })

    return (
        <main
            ref={wrapperRef} 
            onScroll={onScroll}
            className={classNames(toggleFeatures({
                name: 'isAppRedesigned',
                on: () => cls.PageRedesigned,
                off: () => cls.Page
            }), {}, [className])}
            id={PAGE_ID}
            data-testid={props["data-testid"] ?? 'Page'}
        >
            {children}
           {onScrollEnd ? <div className={cls.trigger} ref={triggerRef}/> : null}
        </main>
    )
}