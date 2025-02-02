

export const loginUser = async (body: {name:string, email:string}): Promise<void> => {

    console.log("backendBaseUrl rr", process.env.BACKEND_ADDRESS);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        cache: 'no-store',
        body: JSON.stringify(body),
    });

    console.log("response", response);
    console.log("response status", response.status);

    if (!response.ok) {
        throw new Error('Login failed');
    }
};

export const logoutUser = async (): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ADDRESS}/auth/logout`, {
        method: 'POST',
        mode: "cors",
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }
};
