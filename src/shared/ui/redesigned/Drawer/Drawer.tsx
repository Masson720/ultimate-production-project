import { useTheme } from "@/app/providers/ThemeProvider";
import { ReactNode, memo, useCallback, useEffect } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from './Drawer.module.scss';
import { AnimationProvider, useAnimationLibs } from "../../../lib/components/AnimationProvider";
import { Overlay } from "../../redesigned/Overlay/Overlay";
import { Portal } from "../../redesigned/Portal/Portal";
import { toggleFeatures } from "@/shared/features";

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
    const {
        className,
        children,
        isOpen,
        onClose,
        lazy
    } = props;

    const {Spring, Gesture } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
        api.start({y: 0, immediate: false})
    }, [api]);

    useEffect(() => {
        if(isOpen){
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity},
            onResolve: onClose
        })
    }

    const bind = Gesture.useDrag(
        ({last, velocity: [, vy], direction: [, dy], movement: [, my], cancel}) => {
            if(my < -70)cancel();
            if(last){
                if(my > height * 0.5 || (vy > 0.5 && dy > 0)){
                    close();
                }else {
                    openDrawer();
                }
            }else {
                api.start({y: my, immediate: true});
            }
        },
        {
            from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
        }
    )
   
    const { theme } = useTheme();

    if(!isOpen){
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    console.log(theme);

    return (
        <Portal element={document.getElementById('app') ?? document.body}>
            <div className={classNames(cls.Drawer, {}, [className, theme, 'add_drawer', toggleFeatures({
                name: 'isAppRedesigned',
                off: () => cls.modalOld,
                on: () => cls.modalNew
            })])}>
                <Overlay onClick={close} />
                <Spring.a.div 
                    className={cls.sheet} 
                    style={{display, bottom: `calc(-100vh + ${height - 100}px)`, y}} 
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    )
})


const DrawerAsync = (props: DrawerProps) => {
    const {isLoaded} = useAnimationLibs();

    if(!isLoaded){
        return null
    }

    return <DrawerContent  {...props}/>
}

export const Drawer = (props: DrawerProps) => {

    return (
        <AnimationProvider>
            <DrawerAsync  {...props}/>
        </AnimationProvider>
    )
}