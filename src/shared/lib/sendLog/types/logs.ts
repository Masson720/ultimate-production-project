export enum UserActions {
    DELETE_ARTICLE = 'DELETE_ARTICLE',
    CREATE_ARTICLE = 'CREATE_ARTICLE',
    EDIT_ARTICLE = 'EDIT_ARTICLE',
    SEND_COMMENT = 'SEND_COMMENT',
    REGISTRATION_USER = 'REGISTRATION_USER'
}

export interface DetailsLog {
    userName?: string
    userId?: string
    articleName?: string
    articleId?: string
}