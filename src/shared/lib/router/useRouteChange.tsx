import { AppRouterByPathPattern, AppRoutes } from "@/shared/const/router";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { matchPath } from 'react-router';

export function useRouteChange(){
    const location = useLocation();

    const [appRoute, setAppRoute] = useState<AppRoutes>(AppRoutes.MAIN);

    useEffect(() => {
        Object.entries(AppRouterByPathPattern).forEach(([pattern, route]) => {
            if(matchPath(pattern, location.pathname)?.pattern.end){
                setAppRoute(route);
            }
        })
    }, [location.pathname]);

    return appRoute;
}