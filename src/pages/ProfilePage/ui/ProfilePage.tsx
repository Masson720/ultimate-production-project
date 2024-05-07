import { VStack } from "@/shared/ui/Stack";
import { EditableProfileCard } from "@/features/editableProfileCard";
import { useParams } from "react-router-dom";
import { Page } from "@/widgets/Page";


const ProfilePage = () => {
    const {id} = useParams<{id: string}>();
    
    return (
        <Page data-testid="ProfilePage" >
            <VStack gap='16' max>
                <EditableProfileCard id={id}/>
            </VStack>
        </Page>
)}

export default ProfilePage;