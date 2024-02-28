import { AboutPage } from "pages/AboutPage";
import { MainPage } from "pages/MainPage";
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
                element={element}
                path={path}
            />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
