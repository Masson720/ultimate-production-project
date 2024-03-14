import { classNames } from "shared/lib/classNames/classNames";
import cls from './Navbar.module.scss';
import { useTranslation } from "react-i18next";
import { Button, ThemeButton } from "shared/ui/Button/Button";
import { useCallback, useState } from "react";
import { Modal } from "shared/ui/Modal/Modal";

interface NavbarProps {
    className?: string

}

export const Navbar = ({className}: NavbarProps) => {
    const {t} = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);

    const onToggleModal = useCallback(() => {
        setIsAuthModal(prev => !prev);
    }, [])

    return (<div className={classNames(cls.Navbar, {}, [className])}>
        <Button theme={ThemeButton.CLEAR_INVERTED} className={cls.links} onClick={onToggleModal}>
            {t('Войти')}
        </Button>
        <Modal isOpen={isAuthModal} onClose={onToggleModal}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem voluptate eligendi quis necessitatibus rerum? Optio neque expedita sed vitae corrupti laudantium quasi aspernatur quam, in dolore laborum illum possimus ab.
                    Reiciendis labore corporis repellendus, nisi odit fugiat consectetur odio rerum nam delectus impedit dolor nostrum eveniet deleniti doloribus eaque repellat blanditiis dolorum modi ipsam natus voluptas quibusdam doloremque. Unde, porro.
        </Modal>
    </div>)
}


