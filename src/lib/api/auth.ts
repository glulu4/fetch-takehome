export const login = async (name: string, email: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({name, email}),
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
};

export const logout = async (): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
};
