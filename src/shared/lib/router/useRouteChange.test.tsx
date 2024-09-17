import { act, renderHook } from "@testing-library/react";
import { useLocation } from "react-router-dom";
import { useRouteChange } from "./useRouteChange";
import { AppRoutes } from "@/shared/const/router";

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn(),
}));

describe('shared/lib/routeruseRouteChange', () => {
    test('Должен вернуть правильный маршрут на основе location.pathname', () => {

        (useLocation as jest.Mock).mockReturnValue({ pathname: '/articles' });

        const { result } = renderHook(() => useRouteChange());

        expect(result.current).toBe(AppRoutes.ARTICLES);
    })

    test('Должен вернуть Not Found если не находит совпадение', () => {
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/unknown-path' });

        const { result } = renderHook(() => useRouteChange());

        expect(result.current).toBe(AppRoutes.MAIN);
    });

    test('Должен обновлять маршрут когда он изменился', () => {
        (useLocation as jest.Mock).mockReturnValue({ pathname: '/articles'});

        const { result, rerender } = renderHook(() => useRouteChange());

        expect(result.current).toBe(AppRoutes.ARTICLES);

        act(() => {
            (useLocation as jest.Mock).mockReturnValue({ pathname: '/articles/1' });
            rerender();
        });
        
        expect(result.current).toBe(AppRoutes.ARTICLE_DETAILS);

    })
})