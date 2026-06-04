const token = localStorage.getItem("token");

async function createPost() {

  const content =
    document.getElementById("postContent").value;

  if (!token) {
    alert("Please login first");
    return;
  }

  const res = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      content
    })
  });

  const data = await res.json();

  console.log(data);

  if (res.ok) {
    alert("Post Created");
    loadPosts();
    document.getElementById("postContent").value = "";
  } else {
    alert(data.message);
  }
}

async function loadPosts() {

  const res = await fetch("/api/posts");
  const posts = await res.json();

  const feed =
    document.getElementById("feed");

  feed.innerHTML = "";

  posts.forEach(post => {

    feed.innerHTML += `
      <div class="post-card">

        <h3>${post.user.username}</h3>

        <p>${post.content}</p>

        <button onclick="likePost('${post._id}')">
          ❤️ ${post.likes.length}
        </button>

      </div>
    `;

  });

}

async function likePost(id) {

  await fetch(`/api/posts/like/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  loadPosts();
}

loadPosts();