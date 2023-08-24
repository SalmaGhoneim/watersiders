import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';
import { LATITUDE, LOCATE, LONGITUDE } from '../constants';
import userEvent from '@testing-library/user-event';

describe('Dashboard tests', () => {
    it('renders input fields and locate button', () => {
        render(<Dashboard />);
        
        expect(screen.getByPlaceholderText(LONGITUDE)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(LATITUDE)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: LOCATE })).toBeInTheDocument();
    });

    it('shows map and features table upon clicking locate', async () => {
        render(<Dashboard />);
        
        userEvent.type(screen.getByPlaceholderText(LONGITUDE), '30');
        userEvent.type(screen.getByPlaceholderText(LATITUDE), '31');
        userEvent.click(screen.getByRole('button', { name: LOCATE }));
    
        const map = await screen.findByTestId('map-id');
        const table = await screen.findByTestId('table-id');
    
        expect(map).toBeInTheDocument();
        expect(table).toBeInTheDocument();
    });
});
