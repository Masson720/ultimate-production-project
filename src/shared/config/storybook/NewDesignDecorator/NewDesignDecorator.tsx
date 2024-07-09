import { setFeatureFlags } from '@/shared/features';
import { getAllFeatureFlags } from '@/shared/features/lib/setGetFeatures';
import { StoryFn } from '@storybook/react';


export const NewDesignDecorator = (StoryComponent: StoryFn) => {
    setFeatureFlags({...getAllFeatureFlags(), isAppRedesigned: true})

    return (
        <div className='app_redesigned'>
            <StoryComponent/>
        </div>
    )
}