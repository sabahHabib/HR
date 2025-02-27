import { apiClient, api } from '../../api/apiClient';

interface LoginResponse {
    access_token: string;
    token_type: string;
}

interface ApiError {
    message: string;
}


export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await apiClient.post<LoginResponse>('/login', {
            username,
            password,
        });
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        throw new Error((error as ApiError).message || 'Login failed');
    }
};




export const registration = async(name:string,email:string,password:string)=>{
    try{
        const response = await api.post('/register',{
            name,
            email,
            password,

        });
        return response.data;
    }
    catch(error) {
        throw new Error((error as ApiError).message|| ' Registration failed');
        }
    };

export const logout = (): void => {
    localStorage.removeItem('token');
    window.location.href = '/login';
};


export type { LoginResponse };