// добавление юзеров
document.forms.addUser.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/admin/administratorpanel/user', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      emailCustomer: document.getElementById('emailCustomer').value,
      phoneCustomer: document.getElementById('phoneCustomer').value,
      nameCustomer: document.getElementById('nameCustomer').value,
      aboutCustomer: document.getElementById('aboutCustomer').value,
    }),
  });
  const result = await res.text();
  if (res.status === 400) {
    document.getElementById('registerStatusCustomer').innerText = result;
  } else {
    alert('Customer added');
    window.location.href = '/admin/administratorpanel';
  }
});

// удаление юзеров

// document.getElementById('customersFun').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const res = await fetch('/admin/administratorpanel/delete')
//   console.log(e.target);
// });

// добавление товара
document.forms.addProduct.addEventListener('submit', async (e) => {
  e.preventDefault();
  const res = await fetch('/admin/administratorpanel/product', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      title: document.getElementById('title').value,
      diameter: document.getElementById('diameter').value,
      quality: document.getElementById('quality').value,
      price: document.getElementById('price').value,
    }),
  });
  const result = await res.text();
  if (res.status === 400) {
    document.getElementById('registerStatusProduct').innerText = result;
  } else {
    alert('Product added');
    window.location.href = '/admin/administratorpanel';
  }
});

document.getElementById('result').addEventListener('click', async (e) => {
  e.preventDefault();
  console.log(e.target.innerText);
  console.log(e.target.id);
  if (e.target.innerText === 'send price') {
    const resp = await fetch('/admin/administratorpanel/sendPrice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        custemail: e.target.value,
      }),
    });
    if (resp.status === 200) {
      alert('Message sended');
    } else {
      console.log('miss SEND button');
    }
  } else if (e.target.innerText === 'delete') {
    const delResp = await fetch('/admin/administratorpanel/user/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: e.target.id,
      }),
    });
    const delResult = await delResp.text();
    console.log(delResp.status);
    if (delResp.status === 200) {
      alert('delete success');
      window.location.href = '/admin/administratorpanel';
    } else {
      alert('something went wrong');
    }
  } else if (e.target.innerText === 'edit') {
    document.getElementById('editDiv').classList.remove('hidden');
    const resId = fetch('/admin/administratorpanel/user/edit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: e.target.id,
      }),
    });
  }
});

document.forms.editFormCustomer.addEventListener('submit', async (e) => {
  e.preventDefault();
  // console.log(e.target);
  const editResp = await fetch('/admin/administratorpanel/user/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: document.getElementById('editEmailCustomer').value,
      phone: document.getElementById('editPhoneCustomer').value,
      name: document.getElementById('editNameCustomer').value,
      about: document.getElementById('editAboutCustomer').value,
    }),
  });
  if (editResp.status === 200) {
    alert('edit success');
    window.location.href = '/admin/administratorpanel';
  } else {
    alert('something went wrong');
  }
});
