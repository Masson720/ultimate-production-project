import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "@/entities/User";
import { SidebarItemType } from "../types/SidebarTypes";
import AboutIconDeprecated from '@/shared/assets/icons/about-20-20.svg';
import MainIconDeprecated from '@/shared/assets/icons/main-20-20.svg';
import ProfileIconDeprecated from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIconDeprecated from '@/shared/assets/icons/article-20-20.svg';
import AboutIcon from '@/shared/assets/icons/Info.svg';
import MainIcon from '@/shared/assets/icons/home.svg';
import ProfileIcon from '@/shared/assets/icons/avatar.svg';
import ArticleIcon from '@/shared/assets/icons/article.svg';
import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from "@/shared/const/router";
import { toggleFeatures } from "@/shared/features";


export const getSidebarItems = createSelector(
    getUserAuthData,
    (userData) => {
        const sidebarItemsList: SidebarItemType[] = [
            {
                path: getRouteMain(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => MainIcon,
                    off: () => MainIconDeprecated
                }),
                text: 'Главная страница'
            },
            {
                path: getRouteAbout(),
                Icon: toggleFeatures({
                    name: 'isAppRedesigned',
                    on: () => AboutIcon,
                    off: () => AboutIconDeprecated
                }),
                text: 'О сайте'
            }
        ]
        if(userData){
            sidebarItemsList.push(
                {
                    path: getRouteProfile(userData?.id),
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => ProfileIcon,
                        off: () => ProfileIconDeprecated
                    }),
                    authOnly: true,
                    text: 'Профиль'
                },
                {
                    path: getRouteArticles(),
                    Icon: toggleFeatures({
                        name: 'isAppRedesigned',
                        on: () => ArticleIcon,
                        off: () => ArticleIconDeprecated
                    }),
                    authOnly: true,
                    text: 'Статьи'
                }
            )
        }
        return sidebarItemsList;
    }
)