import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RegisterForm from '@/components/Account/RegisterForm'

describe('RegisterForm ', () => {
    describe('Render', () => {
        test('All input field exist', () => {
            render(<RegisterForm setIsLogin={jest.fn()} />);
    
            expect(screen.getByPlaceholderText('Email address')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
            expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
        });
    });
    
    describe('Validation', () => {
        test('Empty Email address', async () => {
            render(<RegisterForm setIsLogin={jest.fn()} />);
    
            // Input values
            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcde' } });
    
            fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
            expect(await screen.findByText(/Please enter your email/i)).toBeInTheDocument();
        });
    
        test('Empty Username', async () => {
            render(<RegisterForm setIsLogin={jest.fn()} />);
    
            // Input values
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcde' } });
    
            fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
            expect(await screen.findByText(/Please enter your username/i)).toBeInTheDocument();
        });
    
        test('Empty Password', async () => {
            render(<RegisterForm setIsLogin={jest.fn()} />);
    
            // Input values
            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
    
            fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
            expect(await screen.findByText(/Please enter your password/i)).toBeInTheDocument();
        });
    
        test('Password shorter than 5', async () => {
            render(<RegisterForm setIsLogin={jest.fn()} />);
    
            // Input values
            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abc' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abc' } });
        
            fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
            expect(await screen.findByText(/Password must be at least 5 characters long/i)).toBeInTheDocument();
        });
    
        test('Wrong confrim password', async () => {
            render(<RegisterForm setIsLogin={jest.fn()} />);
    
            // Input values
            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'aaaaa' } });
        
            fireEvent.click(screen.getByRole('button', { name: /register/i }));
    
            expect(await screen.findByText(/Passwords do not match/i)).toBeInTheDocument();
        });
    });
    
    describe('API Responses', () => {
        test('Successful fetch', async () => {
            const mockSetIsLogin = jest.fn();

            // Mocked fetch
            global.fetch = jest.fn(() => 
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({}),
                    headers: {
                        get: (key: string) => {
                            if (key === 'Content-Type') return 'application/json';
                            return null;
                        }
                    },
                })
            ) as jest.Mock;

            render(<RegisterForm setIsLogin={mockSetIsLogin} />);

            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcde' } });
            
            fireEvent.click(screen.getByRole('button', { name: /register/i }));

            await screen.findByText(/Login/i);
        });

        test('Failed to connect fetch', async () => {
            global.fetch = jest.fn(() => Promise.reject(new Error('Network error'))) as jest.Mock;

            render(<RegisterForm setIsLogin={jest.fn()} />);

            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcde' } });

            fireEvent.click(screen.getByRole('button', { name: /register/i }));

            expect(await screen.findByText(/Registration error: Network error/i)).toBeInTheDocument();
        });

        test('Server internal error', async () => {

            global.fetch = jest.fn(() => 
                Promise.resolve({
                    ok: false,
                    json: () => Promise.resolve({ error: 'Network error'}),
                    headers: {
                        get: (key: string) => {
                            if (key === 'Content-Type') return 'application/json';
                            return null;
                        }
                    },
                })
            ) as jest.Mock;

            render(<RegisterForm setIsLogin={jest.fn()} />);

            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcde' } });

            fireEvent.click(screen.getByRole('button', { name: /register/i }));

            expect(await screen.findByText(/Registration Failed: Network error/i)).toBeInTheDocument();
        });
    });

    describe('Interaction', () => {
        test('Login button', () => {
            const mockSetIsLogin = jest.fn();

            
            render(<RegisterForm setIsLogin={mockSetIsLogin} />);

            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcde' } });

            fireEvent.click(screen.getByText(/Login/i));

            expect(mockSetIsLogin).toHaveBeenCalledWith(true);
        });

        test('Move to organizer page', () => {
            delete (window as any).location;

            window.location = { href: ''} as any;

            render(<RegisterForm setIsLogin={jest.fn()} />);

            fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Test' } });
            fireEvent.change(screen.getByPlaceholderText('Email address'), { target: { value: 'test@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'abcde' } });
            fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'abcde' } });


            fireEvent.click(screen.getByText(/Move to organizer registration/i));

            expect(window.location.href).toBe('/org/register');
        });
    });
});

afterEach(() => {
    jest.resetAllMocks();
});