import { Suspense, memo, useCallback } from "react";
import { RequireAuth } from "./RequireAuth";
import { Routes, Route } from "react-router-dom";
import { PageLoader } from "@/widgets/PageLoader";
import { AppRoutesProps } from "@/shared/types/router";
import { RouteConfig } from "../config/routeConfig";
import { toggleFeatures } from "@/shared/features";
import { AppLoaderLayout } from "@/shared/layouts/AppLoaderLayout";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = ( 
            <Suspense fallback={toggleFeatures<any>({name: 'isAppRedesigned', off: ()=> {<PageLoader/>}, on: () => {<AppLoaderLayout/>} })}>
                {route.element} 
            </Suspense>
        )
        return (
            <Route 
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth roles={route.roles}>{element}</RequireAuth> : element}
            />
        )
    }, []);
    return (
        <Routes>
            {Object.values(RouteConfig).map(renderWithWrapper)}
        </Routes>
    );
};

export default memo(AppRouter);
