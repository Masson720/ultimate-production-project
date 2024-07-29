import { StateSchema } from "@/app/providers/StoreProvider";


export const getFormData = (state: StateSchema) => state.addArticleForm?.articleForm;
export const getSuccess = (state: StateSchema) => state.addArticleForm?.success;
export const getErrors = (state: StateSchema) => state.addArticleForm?.errors;