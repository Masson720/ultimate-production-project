import { Page } from "widgets/Page/Page";
import { VStack } from "shared/ui/Stack";
import { EditableProfileCard } from "features/editableProfileCard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Text } from 'shared/ui/Text/Text';
import { EditableProfileCardHeader } from "features/editableProfileCard/ui/EditableProfileCardHeader/EditableProfileCardHeader";


const ProfilePage = () => {
    const {id} = useParams<{id: string}>();
    const {t} = useTranslation('profile')

    if(!id){
        return <Text text={t('Профиль не найден')}/> 
    }
    
    return (
        <Page>
            <VStack gap='16' max>
                <EditableProfileCardHeader/>
                <EditableProfileCard id={id}/>
            </VStack>
        </Page>
)}

export default ProfilePage;