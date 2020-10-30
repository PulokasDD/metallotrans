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

// добавление удаление отправка писем на почту
document.getElementById('result').addEventListener('click', async (e) => {
  e.preventDefault();
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
        id: e.target.dataset.id,
      }),
    });
    const delResult = await delResp.text();
    if (delResp.status === 200) {
      alert('delete success');
      window.location.href = '/admin/administratorpanel';
    } else {
      alert('something went wrong');
    }
  } else if (e.target.innerText === 'edit') {
    const editDiv = document.getElementById('editDiv');
    editDiv.querySelector('#hiddenInput').value = e.target.dataset.id;
    editDiv.classList.remove('hidden');
    document.forms.editFormCustomer.addEventListener('submit', async (e) => {
      e.preventDefault();
      const editResp = await fetch('/admin/administratorpanel/user/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: document.getElementById('hiddenInput').value,
          email: document.getElementById('editEmailCustomer').value,
          phone: document.getElementById('editPhoneCustomer').value,
          name: document.getElementById('editNameCustomer').value,
          about: document.getElementById('editAboutCustomer').value,
        }),
      });
      const editResult = await editResp.text();
      if (editResp.status === 200) {
        alert('edit success');
        window.location.href = '/admin/administratorpanel';
      } else {
        document.getElementById('editUsersStatus').innerText = editResult;
      }
    });
  }
});

// редактирование и удаление товара
document
  .getElementById('resultProducts')
  .addEventListener('click', async (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    if (e.target.innerText === 'delete') {
      const delResp = await fetch('/admin/administratorpanel/product/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: e.target.dataset.id,
        }),
      });
      const delResult = await delResp.text();
      if (delResp.status === 200) {
        alert('delete success');
        window.location.href = '/admin/administratorpanel';
      } else {
        alert('something went wrong');
      }
    } else if (e.target.innerText === 'edit') {
      const editDivProduct = document.getElementById('editDivProduct');
      editDivProduct.querySelector('#hiddenInputProduct').value =
        e.target.dataset.id;
      editDivProduct.classList.remove('hidden');
      document.forms.editProductForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const editResp = await fetch('/admin/administratorpanel/product/edit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: document.getElementById('hiddenInputProduct').value,
            title: document.getElementById('editTitleProduct').value,
            diameter: document.getElementById('editDiameterProduct').value,
            quality: document.getElementById('editQualityProduct').value,
            price: document.getElementById('editPriceProduct').value,
          }),
        });
        const editResult = await editResp.text();
        if (editResp.status === 200) {
          alert('edit success');
          window.location.href = '/admin/administratorpanel';
        } else {
          alert('something went wrong');
        }
      });
    }
  });
