import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { SidebarItemType } from "../types/SidebarTypes";
import { RoutePath } from "shared/config/routeConfig/RouteConfig";
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import ArticleIcon from 'shared/assets/icons/article-20-20.svg';


export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: RoutePath.main,
                Icon: MainIcon,
                text: 'Главная страница'
            },
            {
                path: RoutePath.about,
                Icon: AboutIcon,
                text: 'О сайте'
            }
        ]
        if(userData){
            sidebarItemsList.push(
                {
                    path: RoutePath.profile + userData?.id,
                    Icon: ProfileIcon,
                    authOnly: true,
                    text: 'Профиль'
                },
                {
                    path: RoutePath.articles,
                    Icon: ArticleIcon,
                    authOnly: true,
                    text: 'Статьи'
                }
            )
        }
        return sidebarItemsList;
    }
)