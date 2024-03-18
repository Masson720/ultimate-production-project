import { DeepPartial } from '@reduxjs/toolkit';
import { StoryFn, StoryObj } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (state : DeepPartial<StateSchema>) => (Story: StoryFn) => (
    <StoreProvider initialState={state}>
        <Story/>       
    </StoreProvider> 
); 