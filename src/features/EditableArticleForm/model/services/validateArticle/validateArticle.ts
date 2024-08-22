import { ValidateErrors } from "../../consts/validateTypes";
import { ArticleForm } from "../../types/AddArticleFormSchema";

export function validateArticle(formData?: ArticleForm){
    const errors = [];
    if(!formData){
        return [ValidateErrors.NO_DATA];
    }    
    if(formData.title === '' || formData.title === ' '){
        errors.push(ValidateErrors.NO_TITLE);
    }
    if(formData.type.length === 0){
        errors.push(ValidateErrors.NO_TYPE)
    }
    if(formData.blocks.length === 0){
        errors.push(ValidateErrors.NO_BLOCKS)
    }

    return errors;
}