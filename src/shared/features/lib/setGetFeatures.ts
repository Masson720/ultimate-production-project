import { LOCAL_STORAGE_LAST_DESIGN_KEY } from "@/shared/const/localStorage";
import { FeatureFlags } from "../../types/featureFlags";

const defaultFeatures: FeatureFlags = {
    isAppRedesigned: localStorage.getItem(LOCAL_STORAGE_LAST_DESIGN_KEY) === 'new' ? true : false
}

//Фичи не мняются в ходе сессии, их необязательно делать реактивными
let featureFlags: FeatureFlags = {
    ...defaultFeatures
};

export function setFeatureFlags(newFeatureFlags? : FeatureFlags){
    if(newFeatureFlags){
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(flag: keyof FeatureFlags){
    return featureFlags[flag];
}

//Сделать перезагрузку страницы в случае старого дизайна

export function getAllFeatureFlags(){
    return featureFlags;
}
