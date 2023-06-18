const commentFormHandler = async (event) => {
    event.preventDefault();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ post_id, body }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment.');
        }
    }
};

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
