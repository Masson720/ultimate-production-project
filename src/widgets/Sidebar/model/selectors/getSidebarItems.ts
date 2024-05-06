import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../types/SidebarTypes";
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";


export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: MainIcon,
                text: 'Главная страница'
            },
            {
                path: getRouteAbout(),
                Icon: AboutIcon,
                text: 'О сайте'
            }
        ]
        if(userData){
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData?.id),
                    Icon: ProfileIcon,
                    authOnly: true,
                    text: 'Профиль'
                },
                {
                    path: getRouteArticles(),
                    Icon: ArticleIcon,
                    authOnly: true,
                    text: 'Статьи'
                }
            )
        }
        return sidebarItemsList;
    }
)