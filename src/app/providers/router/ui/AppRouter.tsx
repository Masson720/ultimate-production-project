
import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { RouteConfig } from "shared/config/routeConfig/RouteConfig";
import { PageLoader } from "shared/ui/PageLoader/PageLoader";

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader/>}>
      <Routes>
        {Object.values(RouteConfig).map(({element, path}) => (
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

export default AppRouter;
