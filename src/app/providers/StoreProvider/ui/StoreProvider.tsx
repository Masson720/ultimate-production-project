import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateSchema } from "../config/StateSchema";
import { DeepPartial, ReducersMapObject } from "@reduxjs/toolkit";

interface StoreProvidersProps {
    children: ReactNode
    initialState?: DeepPartial<StateSchema> 
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider = (props: StoreProvidersProps) => {
    const {
        children,
        initialState,
        asyncReducers
    } = props;

    const store = createReduxStore(
        initialState as StateSchema, 
        asyncReducers as ReducersMapObject<StateSchema>);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
