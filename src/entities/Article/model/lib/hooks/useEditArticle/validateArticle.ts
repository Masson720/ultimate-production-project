import { ArticleForm } from "../../../types/AddArticleFormSchema";
import { Errors } from "../../../types/articleHooksType";

export function validateArticle (formData: ArticleForm){
    const {
        title,
        type,
        blocks
    } = formData;

    const validateErrors: Errors = new Object();

    if(title === ''){
        console.log('Введите название статьи')
        validateErrors.title = 'Введите название статьи';
    }
    if(title === ' '){
        validateErrors.title = 'Название статьи не может состоять из пробела';
    }
    if(type.length === 0){
        validateErrors.type = 'Выберите хотя бы одну тему';
    }
    if(blocks.length === 0){
        validateErrors.blocks = 'Отсутствует тело статьи';
    }
    return validateErrors;
}