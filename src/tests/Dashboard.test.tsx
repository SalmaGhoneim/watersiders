import { render, screen, waitFor } from '@testing-library/react';
import { LATITUDE, LOCATE, LONGITUDE } from '../constants';
import userEvent from '@testing-library/user-event';
import mockAxios from 'jest-mock-axios';
import { act } from '@testing-library/react';
import App from '../App';
import axios from "axios";
import { succesfullMock } from './mocks'
jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Dashboard tests', () => {
    afterEach(() => {
        mockAxios.reset();
    });

    it('renders input fields and locate button', () => {
        render(<App />);
        const incompleteMessage = screen.getByTestId('incomplete-id');
        const locateButton = screen.getByRole('button', { name: LOCATE });
        
        expect(screen.getByPlaceholderText(LONGITUDE)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(LATITUDE)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: LOCATE })).toBeInTheDocument();
        expect(incompleteMessage).toBeInTheDocument();
        expect(locateButton).toBeDisabled();
    });


    it('shows map and features table upon clicking locate using mock axios request - success', async () => {
        
        render(<App />);
        const incompleteMessage = screen.getByTestId('incomplete-id');
        const locateButton = screen.getByRole('button', { name: LOCATE });
        mockedAxios.get.mockResolvedValue({data: succesfullMock});
        
        await act(async () => {
            userEvent.type(screen.getByPlaceholderText(LONGITUDE), '12');
            userEvent.type(screen.getByPlaceholderText(LATITUDE), '12');
        });

        await waitFor(() => {
            expect(locateButton).toBeEnabled();    
        });

        await act(async () => {
            userEvent.click(locateButton);
        });
        
        const map = await screen.findByTestId('map-id');
        const table = await screen.findByTestId('table-id');
        expect(incompleteMessage).not.toBeInTheDocument();
        expect(map).toBeInTheDocument();
        expect(table).toBeInTheDocument();
        // count table rows to be 3 as mock data other than th
    });

    // TODO
    // it('should display error if input is too large', async () => {
    // });

    // TODO
    // it('should display error if axios returns 400', async () => {
    // });

    //TODO snapshot compare

});
