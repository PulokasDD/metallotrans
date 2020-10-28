const resultDiv = document.getElementById('result');

document.forms.showProduct.addEventListener('click', async (event) => {
  event.preventDefault();

  const data = await fetch('/show');
  const dataParsed = await data.json();

  for (let i = 0; i < dataParsed.length; i += 1) {
    resultDiv.innerText += `${JSON.stringify(dataParsed[i])}\n`;
  }
});
