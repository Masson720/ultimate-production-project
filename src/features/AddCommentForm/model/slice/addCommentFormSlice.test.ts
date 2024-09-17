import { AddCommentFormSchema } from "../types/addCommentForm";
import { addCommentFormActions, AddCommentFormReducer } from "./addCommentFormSlice";


describe('features/AddCommentForm/addCommentFormSlice', () => {
    test('Должен задать текст комментария', () => {
        const state: DeepPartial<AddCommentFormSchema> = {
            text: ''
        }
        expect(AddCommentFormReducer(state as AddCommentFormSchema, addCommentFormActions.setText('Comment'))).toEqual({text: 'Comment'})
    })
})