const URL = 'http://localhost:3000'
const modal = document.querySelector('[data-open-modal="myModal"]')

function renderPost () {
  let cardHTML = ''
  return fetch(`${URL}/posts`)
    .then(response => response.json())
    .then(data => {
      data.forEach(post => {
        cardHTML = `
          <div class="col-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.body}</p>
                <a
                  href="#"
                  class="btn btn-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modalTemplate"
                  data-id="${post.id}"
                  >Go somewhere</a
                >
                <button id="editPost" class="btn btn-success" data-edit="${post.id}" data-bs-toggle="modal" data-bs-target="#exampleModal2">Edit</button>
                <button id="deletePost" class="btn btn-danger" data-delete="${post.id}">Delete</button>
              </div>
            </div>
          </div>
        `
      document.getElementById('postFeed').innerHTML += cardHTML
    })
  })
}

document.getElementById('postFeed').addEventListener('click', async (e) => {
  let targetId = e.target.dataset.id
  let targetDelete = e.target.dataset.delete
  let targetEdit = e.target.dataset.edit

  if (targetId) {
    let comments = []
    let post = await fetch(`${URL}/posts/${targetId}`).then(response => response.json())
    let user = await fetch(`${URL}/users/${post.userId}`).then(response => response.json())
    await fetch(`${URL}/comments/`).then(response => response.json()).then(data => {
      data.forEach(comment => {
        if(targetId == comment.postId) {
          comments.push(comment)
        }
      })
    })

    let modalHTML = `
    <div class="modal-header">
      <h2 class="modal-title" id="modalTitle">${post.title}</h2>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
      ></button>
    </div>
    <div id="modalBody" class="modal-body">
      <p>${post.body}</p>
      <h3>user</h3>
      <p>${user.name}</p>
      <a href="mailto:${user.email}">${user.email}</a>
      <div id="commentsContainer">
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" id="loadComments" class="btn btn-primary">
        Load comments
      </button>
    </div>
    `
    document.getElementById('myModal').innerHTML = modalHTML
    document.getElementById('loadComments').addEventListener('click', () => loadComments(comments))
  }

  if (targetDelete) {
    await fetch(`${URL}/posts/${targetDelete}`, {method: 'DELETE'})
      .then(response => response.json())
      renderPost()
  }

  if(targetEdit) {
    setForm(targetEdit)
  }
})

function loadComments (comments) {
  let commentHTML = ''
  let commentsContainer = document.getElementById('commentsContainer')
  commentsContainer.innerHTML = '<h3>comments</h3>'
  comments.forEach(comment => {
    commentHTML = `
      <p style="color: red">${comment.name}</p>
      <p style="color: blue">${comment.body}</p>
      <p style="color: pink">${comment.email}</p>
    `
    commentsContainer.innerHTML += commentHTML
  })
}

async function setForm(postId) {
  let post = await fetch(`${URL}/posts/${postId}`).then(response => response.json())
  let formHTML = `
    <form id="formEdit">
      <div class="form-group">
        <label for="titleName" class="col-form-label">Title:</label>
        <input type="text" class="form-control" id="titleName" name="titleName" value="${post.title}">
      </div>
      <div class="form-group">
        <label for="bodyName" class="col-form-label">Body:</label>
        <textarea type="text" class="form-control" id="bodyName" name="bodyName" cols="30" rows="10" value="${post.body}">${post.body}</textarea>
      </div>
      <button type="button" id="editPostBtn" class="btn btn-primary">Edit</button>
    </form>
  `

  document.getElementById('modalFormBody').innerHTML = formHTML
  document.getElementById('editPostBtn').addEventListener('click', () => editPost(postId))
}

 function editPost(id) {
  let titlePost = document.getElementById('titleName').value
  let bodyPost = document.getElementById('bodyName').value

   fetch(`${URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {"Content-type": "application/json"},
    body: JSON.stringify({
      title: `${titlePost}`,
      body: `${bodyPost}`
    })})
    .then(response => response.json())
    .then(alert(`Post updated: ${titlePost}`))
}

renderPost()
