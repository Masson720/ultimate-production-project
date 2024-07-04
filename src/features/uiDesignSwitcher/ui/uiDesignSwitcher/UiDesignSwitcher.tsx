import { getUserAuthData } from "@/entities/User";
import { getFeatureFlag, updateFeatureFlag } from "@/shared/features";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { ListBox } from "@/shared/ui/redesigned/Popups"
import { HStack } from "@/shared/ui/redesigned/Stack";
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux";
import { Text } from '@/shared/ui/redesigned/Text/Text';
import { useState } from "react";
import { Skeleton } from "@/shared/ui/redesigned/Skeleton/Skeleton";

export const UiDesignSwitcher = () => {
    const { t } = useTranslation();
    const isAppRedesigned = getFeatureFlag('isAppRedesigned');
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isLoading, setIsLoading] = useState(false);
    const items = [
        {
            content: t('Новый'),
            value: 'new'
        },
        {
            content: t('Старый'),
            value: 'old'
        }
    ]; 

    const onChange = async (value: string) => {
        if(authData){
            setIsLoading(true)
            await dispatch(updateFeatureFlag({
                userId: authData.id,
                newFeatures: {
                    isAppRedesigned: value === 'new' ? true : false
                }
            })).unwrap(); 
            setIsLoading(false);           
        }
    }

    return (
        <HStack gap='16'>
            <Text text={t('Вариант интерфейса')}/>
            {isLoading ?
                <Skeleton width={100} height={30}/>
                :  
                <ListBox
                    onChange={onChange}
                    items={items}
                    value={isAppRedesigned ? 'new' : 'old'}   
                />           
            }
        </HStack>

    )
}
