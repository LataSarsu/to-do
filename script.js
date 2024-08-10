const apiUrl = "https://jsonplaceholder.typicode.com/todos";
const addItemtoDOM = (todo) => {
  const div = document.createElement("div");
  div.classList.add("todo");
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id);

  if (todo.completed) {
    div.classList.add("done");
  }

  document.getElementById("todo-list").appendChild(div);
};
const listItems = () => {
  // Specify the API endpoint for user data

  // Make a GET request using the Fetch API
  fetch(apiUrl + "?_limit=10")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((userData) => {
      for (let i = 0; i < userData.length; i++) {
        addItemtoDOM(userData[i]);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const createTodo = (e) => {
  e.preventDefault();

  const newTodo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(newTodo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => addItemtoDOM(data));
    document.getElementById("title").value = " ";
};
const updateTodo = (id, completed) => {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
const toggleCompleted = (e) => {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");

    updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
  }
};
const deleteTodo = (e) => {
  if (e.target.classList.contains("todo")) {
    const id = e.target.dataset.id;
    fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => e.target.remove());
  }
};
document.addEventListener("DOMContentLoaded", listItems);
document.querySelector("#todo-form").addEventListener("submit", createTodo);
document.querySelector("#todo-list").addEventListener("click", toggleCompleted);
document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo);
