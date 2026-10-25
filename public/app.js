const form = document.querySelector('#converter-form');
const input = document.querySelector('#input');
const status = document.querySelector('#status');
const result = document.querySelector('#result');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  status.textContent = '';
  result.hidden = true;

  try {
    const response = await fetch(`/api/convert?input=${encodeURIComponent(input.value.trim())}`);
    const data = await response.json();

    if (!response.ok) {
      status.textContent = data.error;
      return;
    }

    result.textContent = JSON.stringify(data, null, 2);
    result.hidden = false;
  } catch {
    status.textContent = 'Unable to reach the converter. Please try again.';
  }
});
