import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";

const reducers: ReducersList = {

}

const AdminPanelPage = () => {
    const {t} = useTranslation();
    return (
        <DynamicModuleLoader reducers={reducers} >
            <Page data-testid="AdminPanelPage">
                {t('Админ панель')}
            </Page>            
        </DynamicModuleLoader>

    )
}

export default AdminPanelPage;
