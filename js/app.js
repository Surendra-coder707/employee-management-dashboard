// ==========================================
// APPLICATION STATE
// ==========================================

let allUsers = [];
// ==========================================
// LOADING SKELETON
// ==========================================

function showLoadingSkeleton() {

    const tableBody = document.getElementById("employee-table-body");

    if (!tableBody) {
        return;
    }

    tableBody.innerHTML = `
        <tr>
            <td colspan="5">
                <div class="skeleton-row"></div>
            </td>
        </tr>

        <tr>
            <td colspan="5">
                <div class="skeleton-row"></div>
            </td>
        </tr>

        <tr>
            <td colspan="5">
                <div class="skeleton-row"></div>
            </td>
        </tr>

        <tr>
            <td colspan="5">
                <div class="skeleton-row"></div>
            </td>
        </tr>

        <tr>
            <td colspan="5">
                <div class="skeleton-row"></div>
            </td>
        </tr>
    `;
}

// ==========================================
// LOAD USERS FROM API
// ==========================================

async function loadUsers() {

    showLoadingSkeleton();

    const loadingMessage = document.getElementById("loading-message");
    const errorMessage = document.getElementById("error-message");

    if (loadingMessage) {
        loadingMessage.hidden = false;
    }

    if (errorMessage) {
        errorMessage.hidden = true;
    }

    try {

        const users = await fetchUsers();

        console.log("Users received from API:", users);

        allUsers = users;

        // API data browser mein cache karo
        localStorage.setItem(
            "cachedUsers",
            JSON.stringify(users)
        );

        // Loading message hide
        if (loadingMessage) {
            loadingMessage.hidden = true;
        }

        // Users table mein show
        renderUsers(allUsers);

    } catch (error) {

        console.error("Could not load users:", error);

        // Loading message hide
        if (loadingMessage) {
            loadingMessage.hidden = true;
        }

        const cachedUsers = localStorage.getItem("cachedUsers");

        if (cachedUsers) {

            allUsers = JSON.parse(cachedUsers);

            renderUsers(allUsers);

        } else {

            const tableBody =
                document.getElementById("employee-table-body");

            if (tableBody) {
                tableBody.innerHTML = "";
            }

            if (errorMessage) {
                errorMessage.hidden = false;
            }
        }
    }
}
 
// ==========================================
// RENDER USERS IN TABLE
// ==========================================

// ==========================================
// RENDER USERS IN TABLE
// ==========================================

function renderUsers(users) {

    const tableBody = document.getElementById("employee-table-body");

    if (!tableBody) {
        console.error("Employee table body not found.");
        return;
    }

    tableBody.innerHTML = "";

    users.forEach((user) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.id}</td>

            <td>${user.name}</td>

            <td>${user.email}</td>

            <td>${user.company.name}</td>

            <td>${user.username}</td>

            <td>
                <span class="status-badge active">
                    Active
                </span>
            </td>

            <td>
                <button
                    type="button"
                    class="employee-action"
                    data-user-id="${user.id}">
                    View
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// ==========================================
// REAL-TIME SEARCH
// ==========================================

const searchInput = document.getElementById("employee-search");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const searchTerm = this.value.toLowerCase().trim();

        // Search empty hai to saare users dikhao
        if (searchTerm === "") {
            renderUsers(allUsers);
            return;
        }

        // Users filter karo
        const filteredUsers = allUsers.filter((user) => {

            return (
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.company.name.toLowerCase().includes(searchTerm)
            );

        });

        renderUsers(filteredUsers);
    });
}


// ==========================================
// SORTING
// ==========================================

const sortSelect = document.getElementById("employee-sort");

if (sortSelect) {

    sortSelect.addEventListener("change", function () {

        const sortValue = this.value;

        // allUsers ki copy banao
        let sortedUsers = [...allUsers];

        // Name A to Z
        if (sortValue === "name-asc") {

            sortedUsers.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

        }

        // Name Z to A
        else if (sortValue === "name-desc") {

            sortedUsers.sort((a, b) =>
                b.name.localeCompare(a.name)
            );

        }

        // ID Low to High
        else if (sortValue === "id-asc") {

            sortedUsers.sort((a, b) =>
                a.id - b.id
            );

        }

        // ID High to Low
        else if (sortValue === "id-desc") {

            sortedUsers.sort((a, b) =>
                b.id - a.id
            );

        }

        // Default
        else {

            sortedUsers = [...allUsers];

        }

        renderUsers(sortedUsers);
    });
}

// ==========================================
// COMPANY FILTER + LOCAL STORAGE
// ==========================================

const companyFilter = document.getElementById("company-filter");

if (companyFilter) {

    // Saved filter browser se nikalo
    const savedCompany = localStorage.getItem("selectedCompany");

    if (savedCompany) {
        companyFilter.value = savedCompany;
    }

    companyFilter.addEventListener("change", function () {

        const selectedCompany = this.value;

        // Filter ko browser mein save karo
        localStorage.setItem("selectedCompany", selectedCompany);

        if (selectedCompany === "all") {
            renderUsers(allUsers);
            return;
        }

        const filteredUsers = allUsers.filter((user) => {
            return user.company.name === selectedCompany;
        });

        renderUsers(filteredUsers);
    });
}

// ==========================================
// START APPLICATION
// ==========================================

loadUsers();
// ==========================================
// RETRY BUTTON
// ==========================================

const retryButton = document.getElementById("retry-button");

if (retryButton) {
    retryButton.addEventListener("click", function () {
        loadUsers();
    });
}
const loadingMessage = document.getElementById("loading-message");

if (loadingMessage) {
    loadingMessage.hidden = false;
}
if (loadingMessage) {
    loadingMessage.hidden = true;
}