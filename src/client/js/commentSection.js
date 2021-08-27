import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");

const addComment = (text, id, username) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const userName = document.createElement("a");
  console.log(text, id, username);
  // userName.href = `/users/${comment.owner._id}`;
  userName.innerText = "💥";
  // userName.innerText = ` ${comment.name}`;
  const span = document.createElement("span");
  span.innerText = ` ${text}`;
  const span2 = document.createElement("a");
  span2.href = `/api/videos/${id}/comment-delete`;
  span2.innerText = "❌";
  newComment.appendChild(icon);
  newComment.appendChild(userName);
  newComment.appendChild(span);
  newComment.appendChild(span2);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId, userName } = await response.json();
    addComment(text, newCommentId, userName);
    console.log(newCommentId, userName);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
