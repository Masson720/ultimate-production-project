import { render, screen } from '@testing-library/react';
import { Button, ButtonVariant } from './Button';


describe('Button', () => {
    test('render button ', () => {
        render(<Button>TEST</Button>)
        expect(screen.getByText('TEST')).toBeInTheDocument();
    })
    test('have class clear', () => {
        render(<Button variant={'clear'}>TEST</Button>)
        expect(screen.getByText('TEST')).toHaveClass('clear');
        screen.debug();
    })
})