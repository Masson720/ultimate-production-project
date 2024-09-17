import { renderHook, screen } from "@testing-library/react";
import { useAppToolbar } from "./useAppToolbar";
import { useRouteChange } from "@/shared/lib/router/useRouteChange";
import { AppRoutes } from "@/shared/const/router";
import { ScrollToolbar } from "@/widgets/ScrollToolbar";

jest.mock('@/shared/lib/router/useRouteChange');

describe('app/lib/useAppToolbar', () => {
    test('Должен вернуть компонент <ScroolToolbar/> для роута ARTICLE', () => {

        (useRouteChange as jest.Mock).mockReturnValue(AppRoutes.ARTICLES);

        const { result } = renderHook(() => useAppToolbar());
        
        expect(result?.current?.type).toBe(ScrollToolbar);
    })

    test('Должен вернуть undefined для роута MAIN', () => {
        (useRouteChange as jest.Mock).mockReturnValue(AppRoutes.MAIN);

        const { result } = renderHook(() => useAppToolbar());

        expect(result.current).toBeUndefined();
    })
})