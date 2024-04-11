import { useEffect } from "react";

export function useInitialEffect(callback: () => void, [...dependencies]){
    useEffect(() => {
        if(__PROJECT__ !== 'storybook'){
            callback();
        }
    }, [...dependencies]);
}