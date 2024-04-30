import { StateSchema } from "@/app/providers/StoreProvider";
import { getArticleDetailsData, getArticleDetailsError, getArticleDetailsIsLoading } from "./articleDetailsSelectors";

describe('articleDetailsSelector test', () => {
    test('getArticleDetailsData should return data ', () => {
        const data = {
            id: '1',
            title: 'subtitle',
        }
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                data: data
            }
        }
        expect(getArticleDetailsData(state as StateSchema)).toEqual(data);
    });
    test('getArticleDetailsData should return error ', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleDetailsData(state as StateSchema)).toEqual(undefined);
    });

    test('getLoading should return isLoading ', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                isLoading: true
            }
        }
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(true);
    });
    test('getArticleDetailsData should work with empty state ', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleDetailsIsLoading(state as StateSchema)).toEqual(undefined);
    });

    test('getArticleDetailsError should return error', () => {
        const state: DeepPartial<StateSchema> = {
            articleDetails: {
                error: 'error'
            }
        }
        expect(getArticleDetailsError(state as StateSchema)).toEqual('error');
    });
    test('getArticleDetailseError should return undefined ', () => {
        const state: DeepPartial<StateSchema> = {}
        expect(getArticleDetailsError(state as StateSchema)).toEqual(undefined);
    });
})