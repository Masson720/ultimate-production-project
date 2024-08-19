export type Roles = "ADMIN" | "MANAGER" | "USER";

export interface Features {
    isArticleRatingEnabled: boolean
    isCounterEnabled: boolean
    isAppRedesigned: boolean
}

export interface JsonSettings {
    theme: string
    isFirstVisit: boolean
    settingsPageHasBeenOpen: boolean
    isArticlesPageWasOpened: boolean
    isArticlePageWasOpened: boolean
}

export interface UserData {
    id: string
    username: string
    password: string
    roles: Roles[]
    features: Features
    avatar: string
    jsonSettings: JsonSettings
}