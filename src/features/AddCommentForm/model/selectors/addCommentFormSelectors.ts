import { StateSchema } from "@/app/providers/StoreProvider";

export const getAddCommentFormText = (state: StateSchema) => state.addCommentForm?.text ?? '';
export const getCommentFormError = (state: StateSchema) => state.addCommentForm?.error;