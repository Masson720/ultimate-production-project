import { useJsonSettings } from "@/entities/User/model/selectors/jsonSettingsSelector"
import ThemeProvider from "./ThemeProvider"

export const withTheme = (Component: React.ComponentType) => {
    return () => {
        const { theme: defaultTheme } = useJsonSettings();
        return <ThemeProvider initialTheme={defaultTheme}>
            <Component/>
        </ThemeProvider>
    }
}