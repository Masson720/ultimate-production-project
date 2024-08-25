 import cls from './AddCommentForm.module.scss';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAddCommentFormText, getCommentFormError } from '@/features/AddCommentForm/model/selectors/addCommentFormSelectors';
import { memo, useCallback } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentFormReducer, addCommentFormActions } from '@/features/AddCommentForm/model/slice/addCommentFormSlice';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModule/DynamicModuleLoader';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button/Button';
import { Button } from '@/shared/ui/redesigned/Button/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input/Input';
import { Input } from '@/shared/ui/redesigned/Input/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/features';
import { Card } from '@/shared/ui/redesigned/Card/Card';
import { UserActions } from '@/shared/lib/sendLog/types/logs';
import { getUserAuthData } from '@/entities/User';
import { sendLog } from '@/shared/lib/sendLog/sendLog';

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
    const user = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onCommentTextChange = useCallback((value: string ) => {
        dispatch(addCommentFormActions.setText(value))
    }, [dispatch]);

    const onSendhandler = useCallback(() => {
        onSendComment(text || '');
        sendLog(UserActions.SEND_COMMENT, {
            userName: user?.username,
            userId: user?.id
        })
        onCommentTextChange('')
    }, [onCommentTextChange, onSendComment, text])

    return (
        <DynamicModuleLoader reducers={reducers }>
            <ToggleFeatures
                feature='isAppRedesigned'
                off={
                    <HStack 
                        data-testid='AddCommentForm'
                        justify='between' max 
                        className={cls.AddCommentForm}
                    >
                        <InputDeprecated
                            className={cls.input}
                            data-testid='AddCommentForm.input'
                            placeholder={t('Введите текст комментария')}
                            value={text}
                            onChange={onCommentTextChange}
                        />
                        <ButtonDeprecated 
                            theme={ThemeButton.OUTLINE} 
                            data-testid='AddCommentForm.button'
                            onClick={onSendhandler}
                        >{
                            t('Отправить')}
                        </ButtonDeprecated>
                    </HStack>
                }
                on={ 
                    <Card padding='16' border='partial' max>
                        <HStack 
                            data-testid='AddCommentForm'
                            justify='between'
                            gap='16' 
                            max 
                            className={cls.AddCommentFormRedesigned}
                        >
                            <Input
                                className={cls.input}
                                data-testid='AddCommentForm.input'
                                placeholder={t('Введите текст комментария')}
                                value={text}
                                onChange={onCommentTextChange}
                            />
                            <Button 
                                data-testid='AddCommentForm.button'
                                onClick={onSendhandler}
                            >{
                                t('Отправить')}
                            </Button>
                        </HStack>
                    </Card>
                }
            />
        </DynamicModuleLoader>

    )
}


export default memo(AddCommentForm); 