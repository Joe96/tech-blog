const commentFormHandler = async function(event) {
  event.preventDefault();

  const book_id = document.querySelector('#book_id').value;
  let body = document.querySelector('#comment').value;

  if (body) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        book_id,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    document.querySelector('#comment').value = '';
    document.location.reload();
  }
};

const cartFormHandler = async function(event) {
  event.preventDefault();

  const book_id = document.querySelector('#book1_id').value;
  const book_price = document.querySelector('#book1_price').value;
  const user_id = document.querySelector('#qty_user_id').value;
  let quantity = document.querySelector('#quantity').value;

  console.log(book_price + "|" + user_id + "|" + quantity)

  if (quantity) {
    await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        book_id,
        book_price,
        user_id,
        quantity,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    document.querySelector('#quantity').value = '';
    document.location.replace('/profile');
  }
};


document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);

document
  .querySelector('#new-cart-form')
  .addEventListener('submit', cartFormHandler )