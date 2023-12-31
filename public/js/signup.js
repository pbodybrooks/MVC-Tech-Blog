const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();

  if (name && email && password && confirmPassword) {
    if (confirmPassword !== password) {
      return alert("Passwords don't match! :(");
    }
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, confirmPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }

  } else {
    alert("Missing fields")
  }
};
  
document.addEventListener('DOMContentLoaded', () => {
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
});