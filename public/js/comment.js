const commentFormHandler = async function(event) {
  event.preventDefault();

  const comment_id = document.querySelector('comment_id').value;
  let body = document.querySelector('#comment').value;

  if (body) {
    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        comment_id,
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