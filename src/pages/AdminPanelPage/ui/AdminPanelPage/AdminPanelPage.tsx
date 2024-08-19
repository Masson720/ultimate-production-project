import { useTranslation } from "react-i18next";
import { Page } from "@/widgets/Page";
import { DynamicModuleLoader, ReducersList } from "@/shared/lib/components/DynamicModule/DynamicModuleLoader";
import { AdminPanelContainer } from "../AdminPanelContainer/AdminPanelContainer";

const reducers: ReducersList = {

}

const AdminPanelPage = () => {
    return (
        <DynamicModuleLoader reducers={reducers} >
            <Page data-testid="AdminPanelPage">
                <AdminPanelContainer/>
            </Page>            
        </DynamicModuleLoader>

    )
}

export default AdminPanelPage;
