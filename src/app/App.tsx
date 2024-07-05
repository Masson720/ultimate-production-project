import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from '@/widgets/Navbar';
import { FC, Suspense, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { getUserInited, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { PageLoader } from '@/widgets/PageLoader';
import { ToggleFeatures } from '@/shared/features';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { Sidebar } from '@/widgets/Sidebar';

const App: FC = () => {
    const {theme} = useTheme();
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);

    useEffect(() => {
        dispatch(initAuthData());
    }, [dispatch]);

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={
                <div id='app' className={classNames('app_redesigned', {}, [theme])}>
                    <Suspense fallback={<PageLoader/>}>
                        <MainLayout
                            header={<Navbar/>}
                            content={<AppRouter/>}
                            sidebar={<Sidebar/>}
                        />             
                    </Suspense>
                </div>                  
            }
            off={
                <div id='app' className={classNames('app', {}, [theme])}>
                    <Suspense fallback={<PageLoader/>}>
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

export default App;
