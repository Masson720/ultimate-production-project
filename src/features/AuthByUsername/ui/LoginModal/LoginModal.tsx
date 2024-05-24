import { Suspense } from "react";
import { LoginFormAsync } from "../LoginForm/LoginForm.async";
import { Modal } from "@/shared/ui/deprecated/Modal/Modal";
import { Loader } from "@/shared/ui/deprecated/Loader/Loader";

interface LoginModalProps {
    className?: string
    isOpen: boolean
    onClose: () => void
}

export const LoginModal = (props: LoginModalProps) => {
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
                <LoginFormAsync onSuccess={onClose}/> 
            </Suspense>
        </Modal>
    )
}
