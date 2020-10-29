document.forms.adminAuth.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/admin', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      login: document.getElementById('adminLogin').value,
      password: document.getElementById('adminPass').value,
    }),
  });
  const result = await res.text();
  console.log(result);
  if (result === 'success') {
    window.location.href = '/admin/administratorpanel';
  } else if (result === 'incorrect') {
    alert('invalid data');
  }
});
