import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Home from '@/app/page'

afterEach(() => {
    cleanup();
});

describe('Home', () => {

    test('temporary', () => {
        expect(true).toBe(true);
    })

    test('should have Admin text', () => {
        render(<Home />) // ARRANGE

        const myElem = screen.getByText(/admin/i) // ACT

        expect(myElem).toBeInTheDocument() // ASSERT
    });
});
