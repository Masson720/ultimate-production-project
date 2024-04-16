import { Suspense, memo, useCallback } from "react";
import { AppRoutesProps, RouteConfig } from "shared/config/routeConfig/RouteConfig";
import { PageLoader } from "widgets/PageLoader/PageLoader";
import { RequireAuth } from "./RequireAuth";
import { Routes, Route } from "react-router-dom";

const AppRouter = () => {

    const renderWithWrapper = useCallback((route: AppRoutesProps) => {

        const element = (
            <Suspense fallback={<PageLoader/>}>
                {route.element} 
            </Suspense>
        )

        return (
            <Route 
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />)
    }, [])

    return (
        <Routes>
            {Object.values(RouteConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
