import { FC } from "react";
import cls from './PageLoader.module.scss';
import { classNames } from "shared/lib/classNames/classNames";
import { Loader } from "../Loader/Loader";

export const PageLoader: FC = () => {
  return (<div className={classNames(cls.PageLoader, {}, [])}>
    <Loader/>
  </div>)
}