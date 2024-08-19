import { Suspense } from "react";
import { Modal } from "@/shared/ui/redesigned/Modal/Modal";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";
import { RegistrationFormAsync } from "../RegistrationForm/RegistrationForm.async";

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const RegistrationModal = (props: LoginModalProps) => {
    const {
        className,
        isOpen,
        onClose
    } = props;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >   <Suspense fallback={<Loader/>}>
                <RegistrationFormAsync onClose={onClose}/>
            </Suspense>
        </Modal>
    )
}