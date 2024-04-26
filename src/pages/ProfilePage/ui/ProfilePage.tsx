import { Page } from "widgets/Page/Page";
import { VStack } from "shared/ui/Stack";
import { EditableProfileCard } from "features/editableProfileCard";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Text } from 'shared/ui/Text/Text';


const ProfilePage = () => {
    const {id} = useParams<{id: string}>();
    
    return (
        <Page>
            <VStack gap='16' max>
                <EditableProfileCard id={id}/>
            </VStack>
        </Page>
)}

export default ProfilePage;