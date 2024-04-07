import { BugButton } from "app/providers/ErrorBoundary";
import { Counter } from "entities/Counter";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "shared/ui/Input/Input";
import { Page } from "shared/ui/Page/Page";


const MainPage = () => {
    const {t} = useTranslation('main');
    const [value, setValue] = useState('');

    const onChange = (val: string) => {
        setValue(val)
    }

    return (
        <Page>
            {t('Главная страница')}
            <BugButton/>
            <Counter/>
            <Input value={value} onChange={onChange} placeholder={'Введите текст'}/>
        </Page>
    )
}

export default MainPage;