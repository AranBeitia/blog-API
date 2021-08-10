const URL = 'http://localhost:3000'
const modal = document.querySelector('[data-open-modal="myModal"]')

function renderPost () {
  fetch(`${URL}/posts`)
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

  document.getElementById('postFeed').addEventListener('click', (e) => {
    let target = e.target
    let targetId = target.dataset.id
    // let post = getPost(targetId)
    // document.getElementById('modalTitle').innerHTML = target.
    // getPost(targetId)
    console.log(getPost(targetId));
    
  })

  function getPost(id) {
    let postContent = {}
    fetch(`${URL}/posts`)
    .then(response => response.json())
    .then(data => {
      data.forEach(post => {
        if(id == post.id) {
          postContent = post
        }
      })
    })
    console.log(postContent);
    return postContent
  }

  renderPost()
