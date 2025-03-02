
const completeButtons = document.querySelectorAll(".complete-btn");
const taskRemain = document.getElementById("task-remain");
const completedTask = document.getElementById("task-completed");
const activityLog = document.getElementById("activity-log");
const historyButton = document.getElementById("History-btn");
const discoverButton = document.getElementById("discover-btn");
const colorButton = document.getElementById("color-change");

const colors = [
    "bg-yellow-200",  
    "bg-purple-200",
    "bg-teal-300",
    "bg-red-200",
    "bg-blue-300",
    "bg-pink-400"
];
let currentIndex = 0; 

discoverButton.addEventListener("click", function(){
    window.location.href = "./learn.html"; 
});

colorButton.addEventListener("click", function(){
    document.body.classList.remove("bg-yellow-200", "bg-purple-200", "bg-teal-300", "bg-red-200", "bg-blue-300", "bg-pink-400");
    document.body.classList.add(colors[currentIndex]);
    currentIndex = (currentIndex + 1) % colors.length;
});

function updateRealDate(){
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('real-date').textContent = formattedDate;
}

updateRealDate();

completeButtons.forEach(function(button){
    button.addEventListener("click", function() {
        alert("Board updated successfully!");  

        button.disabled = true; 

        button.classList.remove("bg-blue-600");
        button.classList.add("bg-gray-400");

        let remaining = parseInt(taskRemain.textContent);
        let completed = parseInt(completedTask.textContent);

        if (remaining > 0) {
            taskRemain.textContent = remaining - 1;
        }
        completedTask.textContent = completed + 1;

        if (taskRemain.textContent === "0") {
            alert("Congrats!!! You have completed all the current tasks!"); 
        }

        let taskTitleElement = button.closest(".card").querySelector(".card-title");
        
        if (taskTitleElement) {
            let taskTitle = taskTitleElement.textContent;
            let currentTime = new Date().toLocaleTimeString();

            let logs = document.createElement("p");
            logs.textContent = `You have completed the task: ${taskTitle} at ${currentTime}`;
            logs.classList.add("task-log", "p-2", "text-black", "m-2", "bg-blue-100", "font-semibold", "rounded-md");

            activityLog.appendChild(logs);
        } else {
            console.log("no task");
        }
    });
});

historyButton.addEventListener("click", function () {
    const taskLogs = document.querySelectorAll(".task-log");
    taskLogs.forEach((log) => {
        log.remove();
    });
});
