import { FeatureFlags } from "../types/featureFlags";

//Фичи не мняются в ходе сессии, их необязательно делать реактивными
let featureFlags: FeatureFlags;

export function setFeatureFlags(newFeatureFlags? : FeatureFlags){
    if(newFeatureFlags){
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags){
    return featureFlags[flag];
}

