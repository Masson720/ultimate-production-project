import { useTranslation } from 'react-i18next';
import { memo, useEffect, useState } from 'react';
import { useJsonSettings } from '@/entities/User/model/selectors/jsonSettingsSelector';
import { saveJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { isMobile } from 'react-device-detect';
import { Text } from '@/shared/ui/deprecated/Text/Text';
import { Drawer } from '@/shared/ui/deprecated/Drawer/Drawer';
import { Modal } from '@/shared/ui/deprecated/Modal/Modal';



export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation();
    const [ isOpen, setIsOpen ] = useState(false);
    const { isArticlePageWasOpened } = useJsonSettings();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!isArticlePageWasOpened){
            setIsOpen(true);
            dispatch(saveJsonSettings({isArticlePageWasOpened: true}));
        }
    }, [dispatch, isArticlePageWasOpened]);

    const onClose = () => setIsOpen(false);

    const textModal = (
        <Text 
            title={t('Добро пожаловать на страницу статей')}
            text={t('Здесь вы можете искать и просматривать статьи на различные темы')}
        />        
    )

    if(isMobile){
        return (
            <Drawer>
                {textModal}
            </Drawer>
        )
    }
    
    return (
        <Modal isOpen={isOpen} lazy onClose={onClose}>
            {textModal}
        </Modal>
    );
});