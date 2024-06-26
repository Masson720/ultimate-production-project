import { fireEvent, screen } from "@testing-library/react";
import { Sidebar } from '../Sidebar/Sidebar'; 
import { componentRender } from "@/shared/lib/tests/componentWithRender/componentWithRender";

describe('Sidebar', () => {
    test('test sidebar', () => {
        componentRender(<Sidebar/>)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    })

    test('test toggle ', () => {
        componentRender(<Sidebar/>);
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    })
})