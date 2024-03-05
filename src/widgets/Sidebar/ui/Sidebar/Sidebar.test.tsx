import { fireEvent, render, screen } from "@testing-library/react";
import { Sidebar } from './Sidebar'
import { withTranslation } from "react-i18next";
import { renderWithTranslation } from "../../../../shared/lib/tests/renderWithTranslation/renderWithTranslation";

describe('Sidebar', () => {
    test('test sidebar', () => {
        renderWithTranslation(<Sidebar/>)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    })

    test('test toggle ', () => {
        renderWithTranslation(<Sidebar/>);
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    })
})