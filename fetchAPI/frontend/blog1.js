document.addEventListener('DOMContentLoaded', async () => {
  // Adicionar ouvinte de evento ao botão de adicionar postagem
  const addPostButton = document.getElementById('add-post');
  addPostButton.addEventListener('click', addPost);

  // Chamar a função para buscar os posts existentes
  await getPosts();
});


const getPosts = async () => {
  try {
    const response = await fetch('http://localhost:3000/posts');
    if (!response.ok) {
      throw new Error('Erro ao carregar os posts');
    }
    const data = await response.json();
    const postsArray = data;

    if (!Array.isArray(postsArray)) {
      throw new Error('Os posts não são uma lista válida');
    }

    postsArray.forEach((post) => {
      appendPost(post);
    });
  } catch (error) {
    console.error(error);
  }
};

const addPost = async () => {
  try {
    const newPost = {
      title: document.getElementById('post-title').value,
      text: document.getElementById('post-text').value,
      likes: 0,
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    };

    const response = await fetch('http://localhost:3000/posts', config);
    const post = await response.json();

    appendPost(post);
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (postId, postElement) => {
  const confirmed = confirm('Tem certeza que deseja excluir o post?');
  if (!confirmed) {
    return;
  }

  try {
    const config = {
      method: 'DELETE',
    };

    const response = await fetch(`http://localhost:3000/posts/${postId}`, config);
    if (response.ok) {
      postElement.remove();
      console.log('Post excluído com sucesso!');
    } else {
      throw new Error('Erro ao excluir o post');
    }
  } catch (error) {
    console.error(error);
  }
};

const appendPost = (post) => {
  const template = document.getElementById('post-template');
  const postElement = template.content.cloneNode(true);

  const postTitle = postElement.querySelector('h3');
  postTitle.innerText = post.title;

  const postText = postElement.querySelector('.post-text');
  postText.innerText = post.text;

  const postLikes = postElement.querySelector('.post-likes');
  postLikes.innerText = `${post.likes} like(s)`;

  const deleteLink = postElement.querySelector('.delete-link');
  deleteLink.addEventListener('click', () => deletePost(post.id, postElement));

  document.getElementById('timeline').appendChild(postElement);
};

