import { doc, setDoc, db, addDoc, collection, getDocs, deleteDoc } from "./fireconfig.js";
// --- Constants & State ---
// STORAGE_KEY is not used anywhere, so it is removed.
const THEME_KEY = 'TODO_APP_THEME';

let tasks = [];
let editingId = null;

// --- DOM Elements ---
const addTaskForm = document.getElementById('add-task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// --- Utility Functions ---

const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// --- Storage Logic ---
// Loads tasks from Firebase Firestore.
const loadState = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        tasks = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ ...doc.data(), id: doc.id });
        });
        const theme = localStorage.getItem(THEME_KEY) || 'light';
        applyTheme(theme);
    } catch (error) {
        console.error('Failed to load state from Firestore:', error);
        tasks = [];
    }
};

//  Saves the theme preference.
const saveTheme = (theme) => {
    localStorage.setItem(THEME_KEY, theme);
};

// --- Task Operations ---


// Creates and saves a new Task object to Firestore.
const addTask = async (title) => {
    const now = new Date().toISOString();
    const newTask = {
        title: title.trim(),
        status: 'pending',
        createdAt: now,
        updatedAt: now
    };
    try {
        await addDoc(collection(db, "tasks"), newTask);
        await loadState();
        render();
    } catch (error) {
        console.error('Failed to add task to Firestore:', error);
    }
};


// Toggles the completion status of a task in Firestore.
const toggleTaskStatus = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
        const updatedStatus = task.status === 'pending' ? 'completed' : 'pending';
        try {
            await setDoc(doc(db, "tasks", id), {
                ...task,
                status: updatedStatus,
                updatedAt: new Date().toISOString(),
            });
            await loadState();
            render();
        } catch (error) {
            console.error('Failed to update task status in Firestore:', error);
        }
    }
};

// Updates the title of an existing task in Firestore.
const updateTaskTitle = async (id, newTitle) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
        try {
            await setDoc(doc(db, "tasks", id), {
                ...task,
                title: newTitle.trim(),
                updatedAt: new Date().toISOString(),
            });
            editingId = null;
            await loadState();
            render();
        } catch (error) {
            console.error('Failed to update task title in Firestore:', error);
        }
    }
};

//Removes a task from Firestore.
const deleteTask = async (id) => {
    try {
        await deleteDoc(doc(db, "tasks", id));
        await loadState();
        render();
    } catch (error) {
        console.error('Failed to delete task from Firestore:', error);
    }
};

// --- UI Rendering & Themes ---

// Applies the selected theme to the document body.

const applyTheme = (theme) => {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.textContent = '🌙';
    }
};

// Creates the HTML structure for a single task card.

const createTaskElement = (task) => {
    const isEditing = task.id === editingId;
    const li = document.createElement('li');
    li.className = `task-card ${task.status === 'completed' ? 'completed' : ''}`;
    li.dataset.id = task.id;

    if (isEditing) {
        li.innerHTML = `
            <div class="task-content">
                <input type="text" class="edit-input" value="${task.title}" maxlength="200">
            </div>
            <div class="task-actions">
                <button class="btn-save" title="Save Changes">Save</button>
                <button class="btn-cancel" title="Cancel Editing">Cancel</button>
            </div>
        `;
    } else {
        li.innerHTML = `
            <div class="task-content">
                <button class="btn-toggle" title="Toggle Status">
                    ${task.status === 'completed' ? '✅' : '⭕'}
                </button>
                <div class="task-info">
                    <p class="task-title">${task.title}</p>
                    <p class="task-meta">Created: ${formatDate(task.createdAt)}</p>
                </div>
            </div>
            <div class="task-actions">
                <button class="btn-edit" title="Edit Task">Edit</button>
                <button class="btn-delete" title="Delete Task">Delete</button>
            </div>
        `;
    }

    return li;
};


// Main render function that updates the task list in the DOM.
 
const render = () => {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="text-muted" style="text-align: center;">No tasks yet. Add one above!</p>';
        return;
    }

    const fragment = document.createDocumentFragment();
    tasks.forEach(task => {
        fragment.appendChild(createTaskElement(task));
    });
    
    taskList.appendChild(fragment);
};

// --- Event Handlers ---

// Handles the theme toggle button click.
themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-theme');
    const newTheme = isDark ? 'light' : 'dark';
    saveTheme(newTheme);
    applyTheme(newTheme);
});


// Handles the add task form submission.
addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;
    await addTask(title);
    taskInput.value = '';
});


 // Event Delegation for Task Item Actions.
 // Handles Toggle, Delete, Edit, Save, and Cancel actions.
taskList.addEventListener('click', async (e) => {
    const target = e.target;
    const taskCard = target.closest('.task-card');
    if (!taskCard) return;
    
    const id = taskCard.dataset.id;

    // Toggle Status
    if (target.classList.contains('btn-toggle')) {
        await toggleTaskStatus(id);
    }

    // Delete Task
    if (target.classList.contains('btn-delete')) {
        await deleteTask(id);
    }

    // Enter Edit Mode
    if (target.classList.contains('btn-edit')) {
        editingId = id;
        render();
    }

    // Save Edit
    if (target.classList.contains('btn-save')) {
        const editInput = taskCard.querySelector('.edit-input');
        const newTitle = editInput.value.trim();
        if (newTitle) {
            await updateTaskTitle(id, newTitle);
        }
    }

    // Cancel Edit
    if (target.classList.contains('btn-cancel')) {
        editingId = null;
        render();
    }
});

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadState();
    render();
});
