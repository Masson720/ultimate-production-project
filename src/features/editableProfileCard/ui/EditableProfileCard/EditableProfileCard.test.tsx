import { fireEvent, screen } from "@testing-library/react";
import { componentRender } from "@/shared/lib/tests/componentWithRender/componentWithRender";
import { EditableProfileCard } from "./EditableProfileCard";
import { Profile } from "@/entities/Profile";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { profileReducer } from "../../model/slice/profileSlice";
import userEvent from '@testing-library/user-event';
import { $api } from "@/shared/api/api";

const profile: Profile = {
    id: '1',
    first: 'admin',
    lastname: 'admin',
    age: 147,
    country: Country.Kazakhstan,
    currency: Currency.USD,
    city: 'Moscow',
    username: 'admin123'
}

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: {id: '1', username: 'admin'}
        }
    },
    asyncReducers: {
        profile: profileReducer
    }
}

describe('features/EditableProfileCard', () => {
    test('Read only mode should switch', async () => {
        componentRender(<EditableProfileCard id='1'/>, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });

    test('when canceling the values ​​should be reset to zero', async () => {
        componentRender(<EditableProfileCard id='1'/>, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        await userEvent.clear(screen.getByTestId('ProfileCard.lastname'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        await userEvent.type(screen.getByTestId('ProfileCard.lastname'), 'user');

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('user');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('user');
        
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

        expect(screen.getByTestId('ProfileCard.firstname')).toHaveValue('admin');
        expect(screen.getByTestId('ProfileCard.lastname')).toHaveValue('admin');
    });

    test('An error should appear', async () => {
        componentRender(<EditableProfileCard id='1'/>, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.clear(screen.getByTestId('ProfileCard.firstname'));
        
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
    });

    test('If there are no validation errors, then the server should send a PUT request', async () => {
        const mockPutReq = jest.spyOn($api, 'put');
        componentRender(<EditableProfileCard id='1'/>, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

        await userEvent.type(screen.getByTestId('ProfileCard.firstname'), 'user');
        
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));
        expect(mockPutReq).toHaveBeenCalled();
    })
})