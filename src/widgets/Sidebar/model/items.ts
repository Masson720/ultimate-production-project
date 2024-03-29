import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import { RoutePath } from 'shared/config/routeConfig/RouteConfig';


 export interface SidebarItemType {
    path: string
    text: string
    Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>
    authOnly?: boolean
 }

export const SidebarItemsList: SidebarItemType[] = [
    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Главная страница'
    },
    {
        path: RoutePath.about,
        Icon: AboutIcon,
        text: 'О сайте'
    },
    {
        path: RoutePath.profile,
        Icon: ProfileIcon,
        authOnly: true,
        text: 'Профиль'
    },
]