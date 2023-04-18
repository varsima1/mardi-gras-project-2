// Get data
const nameInput = document.querySelector("#name");
const lastname = document.querySelector("#lastname");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const success = document.querySelector("#success");
const errorNodes = document.querySelectorAll(".error");
//  Validate data
function validateForm() {
  clearMessages();
  let errorFlag = false;
  // name
  if (nameInput.value.length < 1) {
    errorNodes[0].innerText = "Name cannot be blank";
    nameInput.classList.add("error-border");
    errorFlag = true;
  }
  // lastname
  if (lastname.value.length < 1) {
    errorNodes[1].innerText = "last name cannot be blank";
    lastname.classList.add("error-border");
    errorFlag = true;
  }

  // email
  if (!emailIsValid(email.value)) {
    errorNodes[2].innerText = "Invalid Email address";
    email.classList.add("error-border");
    errorFlag = true;
  }
  //   message
  if (message.value.length < 1) {
    errorNodes[3].innerText = "Please enter message";
    message.classList.add("error-border");
    errorFlag = true;
  }

  if (!errorFlag) {
    success.innerText = "Success !";
  }
}
// validation date
//Clear error / success messages
function clearMessages() {
  for (let i = 0; i < errorNodes.length; i++) {
    errorNodes[i].innerText = "";
  }
  nameInput.classList.remove("error-border");
  lastname.classList.remove("error-border");
  email.classList.remove("error-border");
  message.classList.remove("error-border");
}

// check if email is valid
function emailIsValid(email) {
  let pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}
