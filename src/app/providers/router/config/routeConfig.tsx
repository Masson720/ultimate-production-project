import { UserRole } from "@/entities/User";
import { AboutPage } from "@/pages/AboutPage";
import { AdminPanelPage } from "@/pages/AdminPanelPage";
import { ArticleDetailsPage } from "@/pages/ArticleDetailsPage";
import { ArticleEditPage } from "@/pages/ArticleEditPage";
import { ArticlesPage } from "@/pages/ArticlesPage";
import { ForbiddenPage } from "@/pages/ForbiddenPage";
import { MainPage } from "@/pages/MainPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { 
    AppRoutes, 
    getRouteAbout, 
    getRouteAdminPanel, 
    getRouteArticleDetails, 
    getRouteArticleEdit, 
    getRouteArticles, 
    getRouteArticlesCreate, 
    getRouteForbidden, 
    getRouteMain, 
    getRouteNotFound, 
    getRouteProfile 
} from "@/shared/const/router";
import { AppRoutesProps } from "@/shared/types/router";

export const RouteConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <MainPage/>
    },
    [AppRoutes.ABOUT]: {
        path: getRouteAbout(),
        element: <AboutPage/>
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLES]: {
        path: getRouteArticles(),
        element: <ArticlesPage />,
        authOnly: true
    },
    [AppRoutes.ARTICLE_DETAILS]: { 
        path: getRouteArticleDetails(':id'),
        element: <ArticleDetailsPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_CREATE]: { 
        path: getRouteArticlesCreate(),
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ARTICLE_EDIT]: { 
        path: getRouteArticleEdit(':id'),
        element: <ArticleEditPage/>,
        authOnly: true
    },
    [AppRoutes.ADMIN_PANEL]: { 
        path: getRouteAdminPanel(),
        element: <AdminPanelPage/>,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN]
    },
    [AppRoutes.FORBIDDEN]: {
        path: getRouteForbidden(),
        element: <ForbiddenPage/>
    },
    //last
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage/>
    }
}