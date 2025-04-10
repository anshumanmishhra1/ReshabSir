document.getElementById('credential-form').addEventListener('submit', addCredential);
document.getElementById('generate-password').addEventListener('click', generatePassword);
document.addEventListener('DOMContentLoaded', displayCredentials);
const searchText = document.querySelector('#search');
function addCredential(e) {
    e.preventDefault();
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
    credentials.push({ website, username, password });
    localStorage.setItem('credentials', JSON.stringify(credentials));

    document.getElementById('credential-form').reset();
    displayCredentials();
}

function displayCredentials() {
    const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
    const credentialsList = document.getElementById('credentials-list');
    credentialsList.innerHTML = '';

    credentials.forEach((credential, index) => {
        const div = document.createElement('div');
        div.classList.add('credential');
        div.innerHTML = `
            <div>
                <strong>${credential.website}</strong><br>
                Username: ${credential.username}<br>
                Password: <span id="password-${index}">${credential.password}</span>
                <button onclick="togglePassword(${index})">Show/Hide</button>
            </div>
            <div>
                <button onclick="copyPassword('${credential.password}')">Copy</button>
                <button onclick="deleteCredential(${index})">Delete</button>
            </div>
        `;
        credentialsList.appendChild(div);
    });
}

function togglePassword(index) {
    const passwordField = document.getElementById(`password-${index}`);
    const currentText = passwordField.innerText;
    const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
    
    passwordField.innerText = currentText === credentials[index].password ? '••••••••' : credentials[index].password;
}

function copyPassword(password) {
    navigator.clipboard.writeText(password).then(() => {
        alert('Password copied to clipboard!');
    });
}

function deleteCredential(index) {
    const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
    credentials.splice(index, 1);
    localStorage.setItem('credentials', JSON.stringify(credentials));
    displayCredentials();
}

function generatePassword() {
    const length = prompt("Enter password length (minimum 8 characters):");
    if (length < 8) {
        alert("Password length must be at least 8 characters.");
        return;
    }

    const includeUppercase = confirm("Include uppercase letters?");
    const includeLowercase = confirm("Include lowercase letters?");
    const includeNumbers = confirm("Include numbers?");
    const includeSymbols = confirm("Include symbols?");

    const password = createPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    document.getElementById('password').value = password;
}

function createPassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

    let characterSet = lowercase;
    if (includeUppercase) characterSet += uppercase;
    if (includeNumbers) characterSet += numbers;
    if (includeSymbols) characterSet += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        password += characterSet[randomIndex];
    }
    return password;
}


function searchCredentials(e){
    const searchInput = e.target.value;
    const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
    credentials.filter((ele)=>{
        return ele === credentials;       
    })
    console.log(searchInput);
}