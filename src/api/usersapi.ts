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
        }catch(err) {
            console.error(err);
        }
    }

    function verifyUser(email: string, password: string) {
        const user = users.value.find(user => user.email === email && user.password === password);
        return user;
    }
}