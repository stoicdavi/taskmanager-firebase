// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyB49Wqkm_ZQGFLn5e4gZ_bnh7jLI4j2-xM",
    authDomain: "taskmanager-230ef.firebaseapp.com",
    projectId: "taskmanager-230ef",
    
})
const db = firebase.firestore();
//function to add a task
function addTask(){
    const taskInput = document.getElementById('task_Input');
    const task = taskInput.value.trim();
    if (task !==''){
        db.collection('tasks').add({
            task: task,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        taskInput.value = '';
    }
}
// function to render tasks
function renderTasks(doc){
    const taskList = document.getElementById('task_List');
    const taskItem = document.createElement('li');
    taskItem.className = 'task_List';
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')" class="delete">Delete</button>
    `;
    taskList.appendChild(taskItem);
}

// realtime listener for tasks
db.collection('tasks').orderBy('timestamp').onSnapshot(snapshot =>{
    const changes = snapshot.docChanges();
    changes.forEach(change =>{
        if(change.type === 'added'){
            renderTasks(change.doc);
        }
    });
});