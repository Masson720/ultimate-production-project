import { Input } from '@/shared/ui/Input/Input';
import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from '@/shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getAddCommentFormText, getCommentFormError } from '@/features/AddCommentForm/model/selectors/addCommentFormSelectors';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentFormReducer, addCommentFormActions } from '@/features/AddCommentForm/model/slice/addCommentFormSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { HStack } from '@/shared/ui/Stack';

export interface AddCommentFormProps {
    className?: string
     onSendComment: (text: string) => void
}

const reducers: ReducersList = {
    addCommentForm: AddCommentFormReducer
}

const AddCommentForm = (props: AddCommentFormProps) => {
    const {
        className,
        onSendComment
    } = props;

    const {t} = useTranslation();
    const text = useSelector(getAddCommentFormText);
    const error = useSelector(getCommentFormError); 
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string ) => {
        dispatch(addCommentFormActions.setText(value))
    }, [dispatch]);

    const onSendhandler = useCallback(() => {
        onSendComment(text || '');
        onCommentTextChange('')
    }, [onCommentTextChange, onSendComment, text])

    return (
        <DynamicModuleLoader reducers={reducers }>
            <HStack 
                data-testid='AddCommentForm'
                justify='between' max 
                className={cls.AddCommentForm}
            >
                <Input
                    className={cls.input}
                    data-testid='AddCommentForm.input'
                    placeholder={t('Введите текст комментария')}
                    value={text}
                    onChange={onCommentTextChange}
                />
                <Button 
                    theme={ThemeButton.OUTLINE}
                    data-testid='AddCommentForm.button'
                    onClick={onSendhandler}
                >{
                    t('Отправить')}
                </Button>
            </HStack>
        </DynamicModuleLoader>

    )
}


export default memo(AddCommentForm); 