import { generateId } from "@/shared/lib/generateId/generateId";
import { AddArticleFormSchema, ArticleForm } from "../types/AddArticleFormSchema";
import { getDate } from "@/shared/lib/getDate/getDate";
import { addArticleFormActions, AddArticleFormReducer } from "./AddArticleFormSlice";
import { ArticleBlockType, ArticleType } from "@/entities/Article";
import { ArticleBlock } from "@/entities/Article/model/types/article";
import { addNewArticle } from "../services/addNewArticle/addNewArticle";
import { editArticle } from "../services/editArticles/editArticles";
import { fetchArticleById } from "../services/fetchArticleById/fetchArticleById";

const articleForm: ArticleForm = {
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
}

const initialState: AddArticleFormSchema = {
    articleForm: articleForm,
    isLoading: false,
    errors: [],
    success: false
}


describe('features/EditableArticleForm/AddArticleFormSlice', () => {
    test('Меняется title', () => {
        expect(AddArticleFormReducer(initialState, addArticleFormActions.setTitle('ArticleName')))
        .toMatchObject({...initialState, articleForm: {...articleForm, title: 'ArticleName'}})
    });

    test('Меняется userId', () => {
        expect(AddArticleFormReducer(initialState, addArticleFormActions.setUserId('1')))
        .toMatchObject({...initialState, articleForm: {...articleForm, userId: '1'}})
    });

    test('Меняется img', () => {
        expect(AddArticleFormReducer(initialState, addArticleFormActions.setImg('https//:')))
        .toMatchObject({...initialState, articleForm: {...articleForm, img: 'https//:'}})
    });

    test('Меняется type', () => {
        expect(AddArticleFormReducer(initialState, addArticleFormActions.setType([ArticleType.ECONOMICS])))
        .toMatchObject({...initialState, articleForm: {...articleForm, type: [ArticleType.ECONOMICS]}})
    });

    test('Создается и изменяется  блок', () => {
        const payload = {
            type: ArticleBlockType.CODE,
            code: 'code',
            id: "1"
        }

        expect(AddArticleFormReducer(initialState, addArticleFormActions.createBlock(payload as ArticleBlock)))
        .toMatchObject({...initialState, articleForm: {...articleForm, blocks: [payload]}});


        const payloadNext = {
            type: ArticleBlockType.CODE,
            code: 'Code Changing',
            id: "1"
        }

        expect(AddArticleFormReducer(initialState, addArticleFormActions.changeBlock(payloadNext as ArticleBlock)))
        .toMatchObject({...initialState, articleForm: {...articleForm, blocks: []}});
        
    });
});

describe('features/EditableArticleForm/AddArticleFormSlice extraReducers addNewArticle', () => {
    test('isLoading должно быть true при addNewArticle.pending', () => {
        const action = { type: addNewArticle.pending.type }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(true);
        expect(newState.errors).toEqual([]);
    });

    test('isLoading должно быть false, a success true при addNewArticle.fulfilled', () => {
        const action = { type: addNewArticle.fulfilled.type }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.success).toBe(true);
    })
    
    test('isLoading должно быть false, а errors должно содержать ошибку при addNewArticle.rejected', () => {
        const action = { 
            type: addNewArticle.rejected.type,
            payload: ['NO_DATA']
        }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.errors).toEqual(['NO_DATA']);
    })
})

describe('features/EditableArticleForm/AddArticleFormSlice extraReducers editArticle', () => {
    test('isLoading должно быть true при addNewArticle.pending', () => {
        const action = { type: editArticle.pending.type }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(true);
        expect(newState.errors).toEqual([]);
    });

    test('isLoading должно быть false, a success true при addNewArticle.fulfilled', () => {
        const action = { type: editArticle.fulfilled.type }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.success).toBe(true);
    })
    
    test('isLoading должно быть false, а errors должно содержать ошибку при addNewArticle.rejected', () => {
        const action = { 
            type: editArticle.rejected.type,
            payload: ['NO_DATA']
        }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.errors).toEqual(['NO_DATA']);
    })
})

describe('features/EditableArticleForm/AddArticleFormSlice extraReducers fetchArticleById', () => {
    test('isLoading должно быть true при fetchArticleById.pending', () => {
        const action = { type: fetchArticleById.pending.type }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(true);
        expect(newState.errors).toEqual([]);
    });

    test('isLoading должно быть false, a success true при fetchArticleById.fulfilled', () => {
        const article = {
            title: 'text',
            subtitle: 'text',
            img: 'http',
            views: 61,
            userId: '1',
            type: [],
            blocks: [],
        }
        const action = { 
            type: fetchArticleById.fulfilled.type,
            payload: article
        }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.articleForm).toMatchObject(article);
    })
    
    test('isLoading должно быть false, а errors должно содержать ошибку при fetchArticleById.rejected', () => {
        const action = { 
            type: fetchArticleById.rejected.type,
            payload: ['NO_DATA']
        }
        const newState = AddArticleFormReducer(initialState, action);
        expect(newState.isLoading).toBe(false);
        expect(newState.errors).toEqual(['NO_DATA']);
    })
})