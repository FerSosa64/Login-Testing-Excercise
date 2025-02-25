<template>
    <nav class="nav-bar">
        <div class="nav-content">
            <div class="nav-brand">
                <router-link to="/" class="nav-link">
                    <h2>Login Test</h2>
                </router-link>
            </div>
            <div class="nav-links">
                <template v-if="!isLoggedIn">
                    <button class="nav-button" @click="showLoginModal = true">
                        Login
                    </button>
                    <button class="nav-button" @click="showSignupModal = true">
                        Sign Up
                    </button>
                </template>
                <template v-else>
                    <button class="nav-button" @click="handleLogout">
                        Logout
                    </button>
                </template>
            </div>
        </div>

        <!-- Login Modal -->
        <div v-if="showLoginModal" class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>Login</h3>
                    <button class="close-btn" @click="showLoginModal = false">×</button>
                </div>
                <form @submit.prevent="handleLogin" class="modal-form">
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" v-model="loginEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" v-model="loginPassword" required>
                    </div>
                    <button type="submit" class="submit-btn">Login</button>
                </form>
            </div>
        </div>

        <!-- Signup Modal -->
        <div v-if="showLoginModal" class="modal-overlay">
            <div class="modal">
                <div class="modal-header">
                    <h3>Sign Up</h3>
                    <button class="close-btn" @click="showSignupModal = false">×</button>
                </div>
                <form @submit.prevent="handleSignup" class="modal-form">
                    <div class="form-group">
                        <label>Name:</label>
                        <input type="text" v-model="signupName" required>
                    </div>
                    <div class="form-group">
                        <label>Email:</label>
                        <input type="email" v-model="signupEmail" required>
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input type="password" v-model="signupPassword" required>
                    </div>
                    <button type="submit" class="submit-btn">Sign Up</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUsers } from '@/api/usersapi';
import homepage from '../view/HomePage.vue';

export default defineComponent({
    name: 'nav-bar',
    setup() {
        const { getUsers, verifyUser, users } = useUsers();
        const isLoggedIn = ref(false);

        const showLoginModal = ref(false);
        const showSignupModal = ref(false);
        const loginEmail = ref('');
        const loginPassword = ref('');
        const signupName = ref('');
        const signupEmail = ref('');
        const signupPassword = ref('');

        const handleLogin = async () => {
            await getUsers(); // Fetch users first
            const result = verifyUser(loginEmail.value, loginPassword.value);
            
            if (result.success) {
                isLoggedIn.value = true;
                showLoginModal.value = false;
                homepage.currentimage.value = require('@/assets/blurryopeneye.jpg');
                // Emit login event
                window.dispatchEvent(new CustomEvent('login-status-changed', { 
                    detail: { isLoggedIn: true } 
                }));
            } else {
                alert(result.message);
            }
        };

        const handleSignup = () => {
            console.log('Signup:', {
                name: signupName.value,
                email: signupEmail.value,
                password: signupPassword.value
            });
            showSignupModal.value = false;
        };

        const handleLogout = () => {
            isLoggedIn.value = false;
            
            homepage.currentimage.value = require('@/assets/blurryclosedeye.jpg');
            
            window.dispatchEvent(new CustomEvent('login-status-changed', { 
                detail: { isLoggedIn: false } 
            }));
        };

        return {
            showLoginModal,
            showSignupModal,
            loginEmail,
            loginPassword,
            signupName,
            signupEmail,
            signupPassword,
            handleLogin,
            handleSignup,
            isLoggedIn,
            handleLogout
        };
    }
});
</script>
<style scoped>
.nav-bar {
    background-color: #d23b32;
    padding: 1rem 2rem;
    color: #000000;
}

.nav-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
}

.nav-brand h2 {
    margin: 0;
    font-size: 1.5rem;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: opacity 0.3s;
}

.nav-link:hover {
    opacity: 0.8;
}

.nav-button {
    background-color: white;
    color: #a4322b;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
}

.nav-button:hover {
    background-color: #d0cc79;
    transform: translateY(-2px);
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #666;
}

.modal-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.form-group label {
    color: #333;
    font-weight: 500;
}

.form-group input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.submit-btn {
    background-color: #d23b32;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #b32e26;
}
</style>
