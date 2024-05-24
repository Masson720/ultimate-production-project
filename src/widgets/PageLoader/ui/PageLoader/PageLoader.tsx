import { Loader } from '@/shared/ui/deprecated/Loader/Loader';
import cls from './PageLoader.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";

export const PageLoader = () => {
    return (<div className={classNames(cls.PageLoader, {}, [])}>
        <Loader/>
    </div>)
}