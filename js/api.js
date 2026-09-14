// ==========================================
// REST API CLIENT
// ==========================================

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function fetchUsers() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        return users;
    } catch (error) {
        console.error("API Error:", error);
        throw error;
    }
}