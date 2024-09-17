import { ArticleBlockType, ArticleType } from "@/entities/Article"
import { ValidateErrors } from "../../consts/validateTypes"
import { ArticleForm } from "../../types/AddArticleFormSchema"
import { validateArticle } from "./validateArticle"
import { ArticleBlock } from "@/entities/Article/model/types/article"

describe('features/EditableArticleForm/validateArticle', () => {
    const defaultFormData: ArticleForm = {
        title: 'text',
        id: "11",
        subtitle: "text",
        img: "http",
        views: 1,
        createdAt: "01.09.24",
        type: [ArticleType.SCIENCE],
        blocks: [
            {title: 'text', type: ArticleBlockType.TEXT} as ArticleBlock
        ]
    }
    test('При пустом formData должен выдать массив с NO_DATA', () => {
        const formData = undefined
        expect(validateArticle(formData))
        .toMatchObject([ValidateErrors.NO_DATA]);
    })

    test('При пустом formData.title должен выдать массив с NO_TITLE', () => {
        const formData = {
            ...defaultFormData,
            title: '',

        } as ArticleForm
        expect(validateArticle(formData))
        .toMatchObject([ValidateErrors.NO_TITLE]);
    })

    test('При пустом formData.blocks должен выдать массив с NO_BLOCKS', () => {
        const formData = {
            ...defaultFormData,
            blocks: [],

        } as ArticleForm
        expect(validateArticle(formData))
        .toMatchObject([ValidateErrors.NO_BLOCKS]);
    })

    test('При пустом formData.type должен выдать массив с NO_TYPE', () => {
        const formData = {
            ...defaultFormData,
            type: [],

        } as ArticleForm
        expect(validateArticle(formData))
        .toMatchObject([ValidateErrors.NO_TYPE]);
    })

    test('При пустом formData.type, formData.blocks, formData.title должны быть все ошибки по валидации', () => {
        const formData = {
            ...defaultFormData,
            title: '',
            type: [],
            blocks: []

        } as ArticleForm
        expect(validateArticle(formData))
        .toMatchObject([ValidateErrors.NO_TITLE, ValidateErrors.NO_TYPE, ValidateErrors.NO_BLOCKS]);
    })
})