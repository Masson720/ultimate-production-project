import { useState, useMemo, ReactNode, useEffect } from "react";
import { ThemeContext } from "../../../../shared/lib/context/ThemeContext";
import { Theme } from "@/shared/const/theme";
import { useJsonSettings } from "@/entities/User/model/selectors/jsonSettingsSelector";

interface ThemeProviderProps {
    initialTheme?: Theme
    children: ReactNode
}

const ThemeProvider = (props: ThemeProviderProps) => {
    const { theme: defaultTheme } = useJsonSettings();
    const {
        initialTheme,
        children
    } = props;
    const [isThemeInited, setIsThemeInited] = useState(false);
    const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme || Theme.LIGHT);

    useEffect(() => {
        if(!isThemeInited && defaultTheme){
            setTheme(defaultTheme);
            setIsThemeInited(true);            
        }
    }, [defaultTheme, isThemeInited]);

    const defaultProps = useMemo(() => ({
        theme: theme,
        setTheme: setTheme
    }), [theme])
    
    return (<ThemeContext.Provider value={defaultProps}>
        {children}
    </ThemeContext.Provider>)
}

export default ThemeProvider;