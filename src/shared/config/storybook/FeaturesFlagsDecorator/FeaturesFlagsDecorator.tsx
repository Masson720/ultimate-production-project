import { setFeatureFlags } from "@/shared/features";
import { FeatureFlags } from "@/shared/types/featureFlags";
import { StoryFn } from "@storybook/react";


export const FeaturesFlagsDecorator = (features: FeatureFlags) => (StoryComponent: StoryFn) => {
    setFeatureFlags(features)
    
    return <StoryComponent/>
}