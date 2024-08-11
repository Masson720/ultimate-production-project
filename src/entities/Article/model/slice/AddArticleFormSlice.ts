import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getDate } from '@/shared/lib/getDate/getDate';
import { ArticleType } from '@/entities/Article';
import { Article, ArticleBlock } from '@/entities/Article/model/types/article';
import { generateId } from '@/shared/lib/generateId/generateId';
import { addNewArticle } from '../services/fetchArticleById/addNewArticle';
import { AddArticleFormSchema } from '../types/AddArticleFormSchema';
import { fetchArticleById } from '@/entities/Article/model/services/fetchArticleById/fetchArticleById';

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
    errors: '',
    success: false
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
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.success = action.payload;
        },
        createBlock: (state, action: PayloadAction<ArticleBlock>) => {
            state.articleForm.blocks = [...state.articleForm.blocks, action.payload]
        },
        changeBlock: (state, action: PayloadAction<ArticleBlock>) => {
            let replacedObject = state.articleForm.blocks
            for(let i = 0; i < replacedObject.length; i++){
                if(replacedObject[i].id != action.payload.id) continue;
                replacedObject[i] = action.payload;
            }
            state.articleForm.blocks = replacedObject;
        },
        resetForm: (state) => {
            state.articleForm = {
                title: '',
                subtitle: '',
                img: '',
                views: 0,
                userId: '',
                type: [],
                blocks: [],
                id: generateId(),
                createdAt: getDate()
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNewArticle.pending, (state) => {
                state.errors = ''
                state.isLoading = true;
            })
            .addCase(addNewArticle.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addNewArticle.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload
            })
            .addCase(fetchArticleById.pending, (state) => {
                state.errors = ''
                state.isLoading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<Article>) => {
                state.isLoading = false;
                state.articleForm = {...action.payload};
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.errors = action.payload
            })
    }
})

export const { actions: addArticleFormActions } = addArticleFormSlice;
export const { reducer: AddArticleFormReducer } = addArticleFormSlice;