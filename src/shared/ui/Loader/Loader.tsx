import { FC } from "react";
import './Loader.scss';
import { classNames } from "shared/lib/classNames/classNames";

interface LoaderProps{
    className?: string
}

export const Loader: FC<LoaderProps> = (props) => {
  const {className} = props  

  return (<div className={classNames("loadingio-spinner-rolling-3tam98acosv", {}, [className])}>
            <div className="ldio-dacacyrrx15">
                <div>
                </div>
            </div>
        </div>
    )
}