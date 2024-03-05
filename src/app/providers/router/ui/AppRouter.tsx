
import { Suspense } from "react";
import { Routes, Route } from "react-router";
import { RouteConfig } from "shared/config/routeConfig/RouteConfig";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
