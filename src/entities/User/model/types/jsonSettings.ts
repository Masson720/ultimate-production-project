import { Theme } from "@/shared/const/theme";

export interface JsonSettings {
    theme?: Theme
    isFirstVisit?: boolean
    settingsHasBeenOpen?: boolean
    isArticlePageWasOpened?: boolean
}