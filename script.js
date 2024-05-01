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
//
