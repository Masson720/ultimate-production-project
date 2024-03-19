import { Reducer } from "@reduxjs/toolkit";
import { ReduxStoreWithManager } from "app/providers/StoreProvider";
import { StateSchemaKey } from "app/providers/StoreProvider/config/StateSchema";
import { FC, ReactNode, useEffect } from "react"
import { useDispatch, useStore } from "react-redux";

export type ReducersList = {
    [name in StateSchemaKey]?: Reducer
}

type ReducersListEntry = [StateSchemaKey, Reducer];

interface DynamicModuleLoaderProps { 
    reducers: ReducersList
    children: ReactNode
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<DynamicModuleLoaderProps> = (props) => {
    const { 
        children,
        reducers,
        removeAfterUnmount
    } = props;

    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
            store.reducerManager.add(name, reducer);
            dispatch({ type: `@INIT ${name} reducer`});             
        })
        return () => {
            if(removeAfterUnmount){
                Object.entries(reducers).forEach(([name, reducer]: ReducersListEntry) => {
                    dispatch({ type: `@DESTROY ${name} reducer`});
                    store.reducerManager.remove(name);             
                })
            }
        }
    }, [])

    return (<>
            {children}
        </>)
}
function dispatch(arg0: { type: string; }) {
    throw new Error("Function not implemented.");
}

