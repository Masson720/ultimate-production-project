import cls from './PageLoader.module.scss';
import { classNames } from "@/shared/lib/classNames/classNames";
import { Loader } from "@/shared/ui/Loader/Loader";

export const PageLoader = () => {
    return (<div className={classNames(cls.PageLoader, {}, [])}>
        <Loader/>
    </div>)
}