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

    if(!inited){
        return <PageLoader/>
    }

    return (
        <ToggleFeatures
            feature='isAppRedesigned'
            on={
                <div className={classNames('app_redesigned', {}, [theme])}>
                    <Suspense fallback=''>
                        <MainLayout
                            header={<Navbar/>}
                            content={<AppRouter/>}
                            sidebar={<Sidebar/>}
                            toolbar={<div>hfwiuhfiowq</div>}
                        />             
                    </Suspense>
                </div>                  
            }
            off={
                <div className={classNames('app', {}, [theme])}>
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

export default App;
