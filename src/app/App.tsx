import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { FC, Suspense, memo, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Sidebar } from '@/widgets/Sidebar';
import { AppLoaderLayout } from '@/shared/layouts/AppLoaderLayout';
import { useAppToolbar } from './lib/useAppToolbar';

const App: FC = () => {
    const {theme} = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const toolbar = useAppToolbar();


    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    if(!inited){
        return (
            <div className='app_redesigned'><AppLoaderLayout/></div>
        )
    }

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={
                <div id='app' className={classNames('app_redesigned', {}, [theme])}>
                    <Suspense fallback=''>
                        <MainLayout
                            header={<Navbar/>}
                            content={<AppRouter/>}
                            sidebar={<Sidebar/>}
                            toolbar={toolbar}
                        />             
                    </Suspense>
                </div>                  
            }
            off={
                <div id='app' className={classNames('app', {}, [theme])}>
                    <Suspense fallback=''>
                        <Navbar/>
                        <div className="content-page">
                            <Sidebar/>
                            <AppRouter/>
                        </div>                
                    </Suspense>
                </div>                
            }
        />
    )
};

export default memo(App);
