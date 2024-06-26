//@ts-ignore
import React from 'react';
import { EditableProfileCard } from '../../src/features/editableProfileCard/index';
import {TestProvider} from '../../src/shared/lib/tests/componentWithRender/componentWithRender';

const USER_ID = '1'

describe('EditableProfileCard.cy.tsx', () => {
    it('playground', () => {
        cy.intercept('GET', '**/profile/*', {fixture: 'profile.json'});
        cy.mount(
            <TestProvider options={{
                initialState: {
                    user: {
                        authData: {
                            id: USER_ID
                        }
                    }
                }
            }}>
                <EditableProfileCard id={USER_ID}/>
            </TestProvider>  
        )
        //Описываем тест кейс
    })
})