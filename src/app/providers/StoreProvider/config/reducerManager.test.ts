import { Action, ReducersMapObject } from "@reduxjs/toolkit";
import { createReducerManager } from "./reducerManager";
import { StateSchema } from "./StateSchema";

type InitialStateType = ReducersMapObject<StateSchema>

describe('app/StoreProvider/reducerManager', () => {
    const reducerName = 'loginForm';

    test('Инициализация reducerManager', () => {
        const initialReducers = {
            loginForm: (state = {}, action: Action) => state
        }
        const reducerManager = createReducerManager(initialReducers as InitialStateType);
        expect(reducerManager.getReducerMap()).toEqual(initialReducers);
    });

    test('Должен добавить новый редьюсер', () => {
        const reducerManager = createReducerManager({} as InitialStateType);
        const newReducer = (state = {}, action: Action) => state;
        reducerManager.add(reducerName, newReducer);

        const reducerMap = reducerManager.getReducerMap();
        expect(reducerMap).toHaveProperty(reducerName);
        expect(reducerMap[reducerName]).toBe(newReducer);
    });

    test('Должен удалить существующий редьюсер', () => {
        const initialReducers = {
            loginForm: (state = {}, action: Action) => state
        }
        const reducerManager = createReducerManager(initialReducers as InitialStateType);

        reducerManager.remove('loginForm');

        const reducerMap = reducerManager.getReducerMap();

        expect(reducerMap).not.toHaveProperty(reducerName);
    });

    test('Должен обработать состояние после удаления редьюсера', () => {
        const initialReducers = {
            loginForm: (state = {}, action: Action) => state
        }
        const reducerManager = createReducerManager(initialReducers as InitialStateType);

        let state = reducerManager.reduce(undefined as any, {type: 'INIT'});
        expect(state).toEqual({ loginForm: { value: 1 }});
        reducerManager.remove(reducerName);
        state = reducerManager.reduce(state, { type: 'INIT'});
        expect(state).toEqual({});
    });

    test('Редьюсер добавлен снова', () => {
        const reducerManager = createReducerManager({} as InitialStateType);
        const newReducer = ( state = {}, action: Action ) => state;
        reducerManager.add(reducerName, newReducer);
        reducerManager.add(reducerName, newReducer);
        const reducerMap = reducerManager.getReducerMap();
        expect(Object.keys(reducerMap)).toHaveLength(1);
    });

    test('Должен пометить редьюсер как монтированный/немонтированный', () => {
        const reducerManager = createReducerManager({} as InitialStateType);
        const newReducer = ( state = {}, action: Action ) => state;
        reducerManager.add(reducerName, newReducer);
        expect(reducerManager.getMountedReducers()).toEqual({ loginForm: true });
        reducerManager.remove( reducerName );
        expect(reducerManager.getMountedReducers()).toEqual({ loginForm: false });
    })
})