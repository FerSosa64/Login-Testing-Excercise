import axios from 'axios';
import { ref } from 'vue';

const userapi = "https://dummyjson.com/users"

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

export function useUsers() {
    const users = ref<User[]>([]);
    const error = ref<string | null>('');

    const getUsers = async () => {
        try {
            const response = await axios.get(userapi);
            const data = response.data.results

            const userlist = await Promise.all(
                data.map(async (user: any) => {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        password: user.password
                    }
                })
            )
            users.value = userlist
        } catch (err) {
            console.error(err);
            error.value = 'Failed to fetch users';
        }
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
        verifyUser
    }
}