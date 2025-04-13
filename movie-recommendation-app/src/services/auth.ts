interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthResponse {
    user: User;
    token: string;
}

// Simulated auth service (replace with real backend integration later)
class AuthService {
    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_KEY = 'user_data';

    async login(email: string, password: string): Promise<AuthResponse> {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    const user = {
                        id: '1',
                        email,
                        name: email.split('@')[0],
                    };
                    const token = 'mock_jwt_token';
                    this.setToken(token);
                    this.setUser(user);
                    resolve({ user, token });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }

    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (name && email && password) {
                    const user = {
                        id: '1',
                        email,
                        name,
                    };
                    const token = 'mock_jwt_token';
                    this.setToken(token);
                    this.setUser(user);
                    resolve({ user, token });
                } else {
                    reject(new Error('Invalid registration data'));
                }
            }, 1000);
        });
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

    getUser(): User | null {
        const userData = localStorage.getItem(this.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    private setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    private setUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
}

export const authService = new AuthService(); 