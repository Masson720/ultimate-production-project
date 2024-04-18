import { BugButton } from "app/providers/ErrorBoundary";
import { Counter } from "entities/Counter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { HStack } from "shared/ui/Stack";
import { Page } from "widgets/Page/Page";

const people = [
    { value: 'Durward Reynolds', content: 'Durward Reynolds', disabled: false },
    { value: 'Kenton Towne', content: 'Kenton Towne', disabled: false },
    { value: 'Therese Wunsch', content: 'Therese Wunsch', disabled: false },
    { value: 'Benedict Kessler', content: 'Benedict Kessler', disabled: true },
    { value: 'Katelyn Rohan', content: 'Katelyn Rohan', disabled: false },
]


const MainPage = () => {
    const {t} = useTranslation('main');
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val)
    }

    return (
        <Page>
            {t('Главная страница')}
            <HStack>
                <ListBox items={people} value={undefined} defaultValue="Выберите значение" onChange={((string) => console.log(string))}/>
                <div>hdhqdhqwhd</div>
            </HStack>
        </Page>
    )
}

export default MainPage;