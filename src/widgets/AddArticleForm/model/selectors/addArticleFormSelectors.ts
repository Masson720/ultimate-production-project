import { StateSchema } from "@/app/providers/StoreProvider";


export const getFormData = (state: StateSchema) => state.addArticleForm?.articleForm;