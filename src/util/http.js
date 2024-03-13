export async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error('Something went wrong, failed to send request.');
  }

  const resData = await response.json();
  // console.log('OVDE', resData);

  return resData;
}

export async function fetchMeals() {
  const response = await fetch('http://localhost:3000/meals');

  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  const resData = await response.json();

  return resData;
}

export async function postOrder(customerData, items) {
  const response = await fetch('http://localhost:3000/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order: {
        items: items,
        customer: customerData,
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch meals');
  }

  console.log(response);

  const resData = await response.json();

  return resData;
}
