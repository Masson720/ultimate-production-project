import { useEffect } from "react";

export function useInitialEffect(callback: () => void, [...dependencies]){
    useEffect(() => {
        if(__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest'){
            callback();
        }
    }, [...dependencies]);
}