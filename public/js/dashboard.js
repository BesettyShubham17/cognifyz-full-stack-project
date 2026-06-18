// public/js/dashboard.js
let allUsers = [];
let currentPage = 1;
const rowsPerPage = 5;
let sortAsc = true;

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
    checkRedisStatus();
    
    if(document.getElementById('github-username')){
        document.getElementById('fetch-github').addEventListener('click', fetchGithubProfile);
    }

    const searchInput = document.getElementById('searchUser');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            currentPage = 1;
            renderTable();
        });
    }

    const createForm = document.getElementById('createUserForm');
    if (createForm) {
        createForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('createName').value;
            const email = document.getElementById('createEmail').value;
            const password = document.getElementById('createPassword').value;
            const msg = document.getElementById('createMsg');

            try {
                await axios.post('/api/users', { name, email, password });
                msg.innerHTML = '<span class="text-success">User created!</span>';
                fetchUsers();
                createForm.reset();
                setTimeout(() => {
                    const modal = bootstrap.Modal.getInstance(document.getElementById('createUserModal'));
                    modal.hide();
                    msg.innerHTML = '';
                }, 1000);
            } catch (error) {
                msg.innerHTML = `<span class="text-danger">${error.response?.data?.message || 'Failed to create user'}</span>`;
            }
        });
    }
});

async function fetchUsers() {
    try {
        const response = await axios.get('/api/users');
        allUsers = response.data;
        renderTable();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function sortUsers() {
    sortAsc = !sortAsc;
    allUsers.sort((a, b) => {
        if (a.name < b.name) return sortAsc ? -1 : 1;
        if (a.name > b.name) return sortAsc ? 1 : -1;
        return 0;
    });
    renderTable();
}

function renderTable() {
    const userTable = document.getElementById('user-table-body');
    if (!userTable) return;

    const searchTerm = document.getElementById('searchUser')?.value.toLowerCase() || '';
    
    const filteredUsers = allUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm) || 
        user.email.toLowerCase().includes(searchTerm)
    );

    const startIndex = (currentPage - 1) * rowsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + rowsPerPage);

    userTable.innerHTML = '';
    paginatedUsers.forEach(user => {
        userTable.innerHTML += `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="badge bg-primary">${user.role}</span></td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editUser('${user._id}', '${user.name}', '${user.email}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteUser('${user._id}')">Delete</button>
                </td>
            </tr>
        `;
    });

    const totalPages = Math.ceil(filteredUsers.length / rowsPerPage) || 1;
    document.getElementById('pageIndicator').innerText = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevPage').disabled = currentPage === 1;
    document.getElementById('nextPage').disabled = currentPage === totalPages;
}

function changePage(direction) {
    currentPage += direction;
    renderTable();
}

async function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            await axios.delete(`/api/users/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}

async function editUser(id, oldName, oldEmail) {
    const newName = prompt("Enter new name:", oldName);
    if (!newName) return;
    const newEmail = prompt("Enter new email:", oldEmail);
    if (!newEmail) return;

    try {
        await axios.put(`/api/users/${id}`, { name: newName, email: newEmail });
        fetchUsers();
    } catch (error) {
        alert('Failed to update user');
    }
}

async function fetchGithubProfile() {
    const username = document.getElementById('github-username').value;
    const profileDiv = document.getElementById('github-profile');
    
    if (!username) return;
    
    profileDiv.innerHTML = '<div class="spinner-border text-info"></div>';
    
    try {
        const response = await axios.get(`/api/github/${username}`);
        const data = response.data;
        
        profileDiv.innerHTML = `
            <div class="d-flex align-items-center mt-3">
                <img src="${data.avatar_url}" width="60" class="rounded-circle me-3" alt="Profile">
                <div>
                    <h5>${data.name || data.login}</h5>
                    <p class="mb-0">Repos: ${data.public_repos} | Followers: ${data.followers} | Following: ${data.following}</p>
                </div>
            </div>
        `;
    } catch (error) {
        profileDiv.innerHTML = '<p class="text-danger mt-2">User not found or rate limit exceeded.</p>';
    }
}

async function checkRedisStatus() {
    const redisStatusEl = document.getElementById('redis-status');
    if (!redisStatusEl) return;
    try {
        const response = await axios.get('/api/redis-status');
        if (response.data.connected) {
            redisStatusEl.innerHTML = '<span class="text-success"><i class="fa-solid fa-circle"></i> Connected</span>';
        } else {
            redisStatusEl.innerHTML = '<span class="text-danger"><i class="fa-solid fa-circle"></i> Disconnected (Bypassed)</span>';
        }
    } catch (error) {
        redisStatusEl.innerHTML = '<span class="text-danger"><i class="fa-solid fa-circle"></i> Error Checking</span>';
    }
}
