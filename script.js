
// Initialize Firebase
firebase.initializeApp({
    apiKey: "",
    authDomain: "taskmanager-230ef.firebaseapp.com",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
});

// Initialize Firebase with your config

  
  const db = firebase.firestore();
  
  // Function to add a task
  function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      taskInput.value = "";
    }
  }
  
  // Function to render tasks
  function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
    
  }


  //LEGISTRATION
    function register() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log("Registered user: ", user);
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error registering user: ", errorCode, errorMessage);
        });
    }

    //LOGIN
    function login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed in
            const user = userCredential.user;
            console.log("Signed in user: ", user);
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error signing in user: ", errorCode, errorMessage);
        });
    }