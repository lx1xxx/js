document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // 加载本地存储中的任务
    loadTasks();

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            e.target.parentElement.remove();
            saveTasks();
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${taskText}</span>
            <button>Delete</button>
        `;
        taskList.appendChild(li);
    }
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item span').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => addTask(taskText));
    }
});