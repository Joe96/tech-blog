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

document
  .querySelector('#new-comment-form')
  .addEventListener('submit', commentFormHandler);
