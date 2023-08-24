import App from '../App';
import { render, screen, waitFor } from '@testing-library/react';
import { LATITUDE, LOCATE, LONGITUDE } from '../constants';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

describe('Dashboard real time tests', () => {
    it('shows map and features table upon clicking locate using real axios request', async () => {
        
        render(<App />);
        const incompleteMessage = screen.getByTestId('incomplete-id');
        const locateButton = screen.getByRole('button', { name: LOCATE });
        
        await act(async () => {
            userEvent.type(screen.getByPlaceholderText(LONGITUDE), '12');
            userEvent.type(screen.getByPlaceholderText(LATITUDE), '12');
            userEvent.click(locateButton);
        });
        await waitFor(() => {
            expect(locateButton).toBeEnabled();
        });
        
        const table = await screen.findByTestId('table-id');
        expect(incompleteMessage).not.toBeInTheDocument();
        expect(table).toBeInTheDocument();
    });
});