const commentFormHandler = async (event) => {
    event.preventDefault();

    const postID = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;

    if (body) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ postID, body }),
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
