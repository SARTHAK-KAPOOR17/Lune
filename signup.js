document.getElementById('signupForm').addEventListener('submit', function(event) {  
    event.preventDefault();  
    
    const name = this[0].value;  
    const email = this[1].value;  
    const password = this[2].value;  
    
    console.log("Name:", name);  
    console.log("Email:", email);  
    console.log("Password:", password);  
    
    alert(`Welcome, ${name}! You've signed up successfully.`);  
});  