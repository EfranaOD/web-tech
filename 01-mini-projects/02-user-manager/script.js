const users = [];

const formTwo = document.querySelector("#formTwo");
const nameInputTwo = document.querySelector("#nameInputTwo");
const userAgeInput = document.querySelector("#userAge");
const messageParaTwo = document.querySelector("#msgParaTwo");
const resultParaTwo = document.querySelector("#resultParaTwo");
const usersDetails = document.querySelector("#usersDetails");
const clearUsers = document.querySelector("#clearUsers");
const searchBar = document.querySelector("#searchBar");
const search = document.querySelector("#search");
const searchResult = document.querySelector("#searchResult");
const adultsOnlyFilter = document.querySelector("#adultsOnlyFilter");
const resultAdultsFilter = document.querySelector("#resultAdultsFilter");
const summaryOfUsers = document.querySelector("#summaryOfUsers");
const resultOfSummary = document.querySelector("#resultOfSummary");
const searchDelete = document.querySelector("#searchDelete");
const deleteButton = document.querySelector("#deleteButton");
const resultDeleteBtn = document.querySelector("#resultDeleteBtn");
const findUserToEdit = document.querySelector("#findUserToEdit");
const editUserButton = document.querySelector("#editUserButton");
const editUserResult = document.querySelector("#editUserResult");
const newUserName = document.querySelector("#newUserName");
const newUserAge = document.querySelector("#newUserAge");
const saveEditedUser = document.querySelector("#saveEditedUser");
const saveEditedResult = document.querySelector("#saveEditedResult");

[usersDetails.disabled, clearUsers.disabled, adultsOnlyFilter.disabled, summaryOfUsers.disabled, deleteButton.disabled, newUserName.disabled, newUserAge.disabled, saveEditedUser.disabled].forEach(el => el.disabled = true);

let indexOfEditUser = -1;

//reusable functions
function toggleButtons() {
  const active = users.length>0;
  [usersDetails.disabled, clearUsers.disabled, adultsOnlyFilter.disabled, summaryOfUsers.disabled, deleteButton.disabled, newUserName.disabled, newUserAge.disabled, saveEditedUser.disabled].forEach(b => b.disabled = !active);
}

//add user 

formTwo.addEventListener("submit", (event) => {
  event.preventDefault();

  const userName = nameInputTwo.value.trim();
  const userAge = Number(userAgeInput.value);

  if (userName === "") {
    messageParaTwo.innerText = "Name is required.";
    return;
  }

  if (userName.length < 3) {
    messageParaTwo.innerText = "Name must be atleast 3 characters.";
    return;
  }

  const userDataTwo = {
    fullName: userName,
    age: userAge,
    isAdult: userAge >= 18
  };

  users.push(userDataTwo);
  toggleButtons();

  messageParaTwo.innerText = `User data stored for ${userDataTwo.fullName} and they ${userDataTwo.isAdult?"are an adult." : "are a minor."}`;
  nameInputTwo.value = userAgeInput.value = "";
});

//list users

usersDetails.addEventListener("click", () => {
  resultParaTwo.innerHTML = "";
  let allUsersText = "";

  users.forEach((user, index) => {
    allUsersText += `${index + 1}. ${user.fullName}, age ${user.age}<br>`;
  });

  resultParaTwo.innerHTML = allUsersText;
});

//clear list

clearUsers.addEventListener("click", () => {
  users.length = 0;
  toggleButtons();

  [resultParaTwo, messageParaTwo, resultAdultsFilter, resultOfSummary, resultDeleteBt].forEach(el => el.innerText = "");
});

//live search

searchBar.addEventListener("input", () => {
  const searchBarValue = searchBar.value.trim().toLowerCase();
  if (searchBarValue === "") {
    searchResult.innerHTML = "";
    return;
  }
  let searchLiveResult = "";
  users.forEach(user => {
    const fullNameLower = user.fullName.toLowerCase();
    if (fullNameLower.includes(searchBarValue)) {
      searchLiveResult += `${user.fullName}<br>`;
    }  
  });
  searchResult.innerHTML = searchLiveResult;
});

//search result

search.addEventListener("click", ()=> {
  const searchValue = searchBar.value.trim().toLowerCase();
  if (searchValue === "") {
    searchResult.innerText = "Please enter a name to search.";
    return;
  }

  const resultSearch = users.find(user => user.fullName.toLowerCase() === searchValue);

  if (resultSearch) {
    searchResult.innerText = `${resultSearch.fullName}, age ${resultSearch.age}`;
  } else {
    searchResult.innerText = "No result found.";
  }
  searchBar.value = "";
});

//adults filter

adultsOnlyFilter.addEventListener("click", () => {
  const filterResult = users.filter(user => user.age >= 18);

  if(filterResult.length === 0){
    resultAdultsFilter.innerText = "No adults found.";
    return;
  }

  let adultsText = "";

  filterResult.forEach((user, index) => {
    adultsText += `${index+1}. ${user.fullName}, age ${user.age}<br>`;
  });
  resultAdultsFilter.innerHTML = adultsText;
});

//summary

summaryOfUsers.addEventListener("click", () =>{
  const filterAdultResult = users.filter(user => user.age >= 18);

  const filterMinorResult = users.filter(user => user.age < 18);

  resultOfSummary.innerHTML = `Total users: ${users.length} | Adults: ${filterAdultResult.length} | Minors: ${filterMinorResult.length}`;

});

//delete user

deleteButton.addEventListener("click", () => {
  const deleteName = searchDelete.value.trim().toLowerCase();

  if(deleteName === ""){
    resultDeleteBtn.innerText = `Please enter a name to delete`;
    return;
  }

  const index = users.findIndex(user => user.fullName.trim().toLowerCase() === deleteName);

  if(index === -1){
    resultDeleteBtn.innerText = `User not found`;
  }
  else{
    users.splice(index, 1);
    resultDeleteBtn.innerText = `User ${deleteName} deleted`;

    resultParaTwo.innerHTML = "";
    let allUsersText = "";

    newUsers.forEach((user, index) => {
      allUsersText += `${index + 1}. ${user.fullName}, age ${user.age}<br>`;
    });
    resultParaTwo.innerHTML = allUsersText;

    searchDelete.value = "";
    toggleButtons();
    if(users.length === 0){      
      resultParaTwo.innerText = messageParaTwo.innerText = resultAdultsFilter.innerText = resultOfSummary.innerText = "";
    }
  }  
})

//edit user

editUserButton.addEventListener("click", () => {
  let findUser = findUserToEdit.value.trim();

  if(findUser === ""){editUserResult.innerText = "Enter a name to edit User."; return;}

  const foundUser = users.find(user => user.fullName.trim().toLowerCase() === findUser.toLowerCase());
  indexOfEditUser = users.findIndex(user => user.fullName.trim().toLowerCase() === findUser.toLowerCase());
  
  if(!foundUser){
    findUserToEdit.value = "";
    editUserResult.innerText = `User not found`;
  }
  else{
    findUserToEdit.value = "";
    editUserResult.innerHTML = `Found user: ${foundUser.fullName}, age ${foundUser.age}.<br>You may edit name/age details below.`;
    newUserName.disabled = false;
    newUserAge.disabled = false;
    saveEditedUser.disabled = false;
    newUserName.value = foundUser.fullName.trim();
    newUserAge.value = foundUser.age;
  }
});

//save edited user

saveEditedUser.addEventListener("click", () => {
    if(indexOfEditUser === -1){return};
    let editUserName = newUserName.value.trim();
    let editUserAge = Number(newUserAge.value);

    if((newUserName.value === "" && newUserAge.value === "")){saveEditedResult.innerText = `please enter something`; return;}

    if((editUserName.toLowerCase() === users[indexOfEditUser].fullName.trim().toLowerCase() && newUserAge.value === users[indexOfEditUser].age)){
      saveEditedResult.innerText = `Nothing to edit`;
      return;
    }
    else{
      if(editUserName.toLowerCase() !== users[indexOfEditUser].fullName.trim().toLowerCase() && newUserName.value !== ""){
        users[indexOfEditUser].fullName = newUserName.value;
      }
      if(editUserAge !== Number(users[indexOfEditUser].age) && newUserAge.value !== ""){
        users[indexOfEditUser].age = Number(newUserAge.value);
      }
      saveEditedResult.innerText = `User edit updated successfully`;
      newUserName.value = newUserAge.value = "";
      editUserResult.innerText = "";
      indexOfEditUser = -1;
    }
});