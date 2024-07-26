import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AddArticleFormSchema } from '../types/AddArticleFormSchema';
import { getDate } from '@/shared/lib/getDate/getDate';
import { ArticleBlockType, ArticleType } from '@/entities/Article';
import { ArticleBlock } from '@/entities/Article/model/types/article';
import { generateId } from '@/shared/lib/generateId/generateId';
import { addNewArticle } from '@/pages/ArticleCreatePage/model/services/addNewArticle';


const initialState: AddArticleFormSchema = {
    articleForm: {
        title: '',
        subtitle: '',
        img: '',
        views: 0,
        userId: '',
        type: [],
        blocks: [],
        //Дата и время обычно присваивается на бэке.
        id: generateId(),
        createdAt: getDate()
    },
    isLoading: false,
    error: ''
}

export const addArticleFormSlice = createSlice({
    name: 'addArticleForm',
    initialState,
    reducers: {
        setTitle: (state, action: PayloadAction<string>) => {
            state.articleForm.title = action.payload
        },
        setUserId: (state, action) => {
            state.articleForm.userId = action.payload
        },
        setType: (state, action: PayloadAction<ArticleType[]>) => {
            state.articleForm.type = [...action.payload];
        },
        setImg: (state, action: PayloadAction<string>) => {
            state.articleForm.img = action.payload;
        },
        createBlock: (state, action: PayloadAction<ArticleBlock>) => {
            state.articleForm.blocks = [...state.articleForm.blocks, action.payload]
        },
        changeBlock: (state, action: PayloadAction<ArticleBlock>) => {
            let replacedObject = state.articleForm.blocks
            for(let i = 0;i<replacedObject.length;i++){
                if(replacedObject[i].id != action.payload.id) continue;
                replacedObject[i] = action.payload;
            }
            state.articleForm.blocks = replacedObject;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewArticle.pending, (state) => {
                state.error = ''
                state.isLoading = true;
            })
            .addCase(addNewArticle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload
            })
    }
})

export const { actions: addArticleFormActions } = addArticleFormSlice;
export const { reducer: AddArticleFormReducer } = addArticleFormSlice;