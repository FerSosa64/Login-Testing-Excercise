import axios from 'axios';
import { ref } from 'vue';

const userapi = "https://dummyjson.com/users"

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

// Add interface for API response
interface ApiUser {
    id: number;
    firstName: string;
    email: string;
    password: string;
    // ... other properties from API that we don't need
}

interface ApiResponse {
    users: ApiUser[];
    total: number;
    skip: number;
    limit: number;
}

export function useUsers() {
    const users = ref<User[]>([]);
    const error = ref<string | null>(null);

    const getUsers = async () => {
        try {
            const response = await axios.get<ApiResponse>(userapi);
            
            // Map directly to our User interface
            users.value = response.data.users.map(apiUser => ({
                id: apiUser.id,
                name: `${apiUser.firstName}`,
                email: apiUser.email,
                password: apiUser.password
            }));

            // Add verification logs
            console.log('Total users fetched:', users.value.length);
            console.log('First 3 users:', users.value.slice(0, 3));
            console.table(users.value);
            
        } catch (err) {
            console.error('Error fetching users:', err);
            error.value = 'Failed to fetch users';
        }
    }

    function addUser(name: string, email: string, password: string) {
        const newUser: User = {
            id: users.value.length + 1,
            name,
            email,
            password
        };
        users.value.push(newUser);
        console.log('New user added:', newUser);
        console.table(users.value);
    }

    function verifyUser(email: string, password: string): { success: boolean, message: string, user?: User } {
        const user = users.value.find(user => user.email === email);
        if (!user) {
            return { success: false, message: 'User not found' };
        }
        if (user.password !== password) {
            return { success: false, message: 'Incorrect password' };
        }
        return { success: true, message: 'User verified', user };
    }

    return {
        users,
        error,
        getUsers,
        verifyUser,
        addUser
    }
}