const URL = 'http://localhost:3000'
const modal = document.querySelector('[data-open-modal="myModal"]')

function renderPost () {
  return fetch(`${URL}/posts`)
    .then(response => response.json())
    .then(data => {
      data.forEach(post => {
        let cardHTML = `
          <div class="card col-4">
            <div class="card-body">
              <h5 class="card-title">${post.title}</h5>
              <p class="card-text">${post.body}</p>
              <a
                href="#"
                class="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#modalTemplate"
                data-id="${post.id}"
                >Go somewhere</a
              >
            </div>
          </div>
        `
      document.getElementById('postFeed').innerHTML += cardHTML
    })
  })
}

document.getElementById('postFeed').addEventListener('click', async (e) => {
  let targetId = target.dataset.id
  let post = await fetch(`${URL}/posts/${targetId}`).then(response => response.json())
  let user = await fetch(`${URL}/users/${post.userId}`).then(response => response.json())

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
    <h3>comments</h3>
    <p>comment 1 (name, body, email)</p>
    <p>comment 2 (name, body, email)</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-primary">
      Load comments
    </button>
  </div>
  `
  
  document.getElementById('myModal').innerHTML = modalHTML

})

renderPost()
