const API = "http://localhost:5000";

/* --------------------------
   SHOW USERNAME ON DASHBOARD
--------------------------- */

document.addEventListener("DOMContentLoaded", () => {

    const welcomeText =
        document.getElementById("welcomeText");

    if (welcomeText) {

        const user =
            localStorage.getItem("user");

        if (!user) {
            window.location.href =
                "login.html";
            return;
        }

        welcomeText.textContent =
            `Welcome, ${user}`;
    }

    if (document.getElementById("taskList")) {
        loadTasks();
    }
});

/* --------------------------
   REGISTER
--------------------------- */

async function register() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    try {

        const response =
            await fetch(`${API}/auth/register`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            });

        const data =
            await response.json();

        alert(data.message);

        if (response.ok) {

            window.location.href =
                "login.html";
        }

    } catch (error) {

        alert("Unable to connect to server");
        console.error(error);
    }
}

/* --------------------------
   LOGIN
--------------------------- */

async function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    if (!username || !password) {

        alert("Please fill all fields");
        return;
    }

    try {

        const response =
            await fetch(`${API}/auth/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })
            });

        const data =
            await response.json();

        if (response.ok) {

            localStorage.setItem(
                "user",
                data.username
            );

            window.location.href =
                "dashboard.html";

        } else {

            alert(data.message);
        }

    } catch (error) {

        alert("Unable to connect to server");
        console.error(error);
    }
}

/* --------------------------
   LOGOUT
--------------------------- */

function logout() {

    localStorage.removeItem("user");

    window.location.href =
        "login.html";
}

/* --------------------------
   LOAD TASKS
--------------------------- */

async function loadTasks() {

    try {

        const response =
            await fetch(`${API}/tasks`);

        const tasks =
            await response.json();

        const taskList =
            document.getElementById("taskList");

        taskList.innerHTML = "";

        if (tasks.length === 0) {

            taskList.innerHTML = `
                <p style="text-align:center;color:gray;">
                    No tasks available
                </p>
            `;

            return;
        }

        tasks.forEach(task => {

            taskList.innerHTML += `

                <div class="task-card">

                    <div class="task-title">
                        ${task.title}
                    </div>

                    <button
                        class="delete-btn"
                        onclick="deleteTask(${task.id})">

                        Delete

                    </button>

                </div>

            `;
        });

    } catch (error) {

        console.error(error);
    }
}

/* --------------------------
   ADD TASK
--------------------------- */

async function addTask() {

    const taskInput =
        document.getElementById("taskInput");

    const title =
        taskInput.value.trim();

    if (!title) {

        alert("Please enter a task");
        return;
    }

    try {

        await fetch(`${API}/tasks`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title
            })
        });

        taskInput.value = "";

        loadTasks();

    } catch (error) {

        console.error(error);
    }
}

/* --------------------------
   DELETE TASK
--------------------------- */

async function deleteTask(id) {

    const confirmDelete =
        confirm("Delete this task?");

    if (!confirmDelete) return;

    try {

        await fetch(
            `${API}/tasks/${id}`,
            {
                method: "DELETE"
            }
        );

        loadTasks();

    } catch (error) {

        console.error(error);
    }
}