
import { getUserAuthData } from "entities/User";
import { Suspense, memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router";
import { RouteConfig } from "shared/config/routeConfig/RouteConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";

const AppRouter = () => {

    const isAuth = useSelector(getUserAuthData);

    const routes = useMemo(() => {
        return Object.values(RouteConfig).filter(route => {
            if(route.authOnly && !isAuth) {
                return false;
            }
            return true;
        })
    }, [isAuth])

    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {routes.map(({element, path}) => (
                    <Route 
                        key={path}
                        path={path}
                        element={<div className='page-wrapper'>{element}</div>}
                    />
                ))}
            </Routes>
        </Suspense>
    );
};

export default memo(AppRouter);
