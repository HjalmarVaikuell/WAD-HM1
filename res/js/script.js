/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropdownFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



// Fetch json on window load
window.onload = async () => {
  let posts = await promise;
  createPostsFromJSON(posts)
}

const promise = fetch("https://api.npoint.io/f54f6407e20e2593188c").then(response => response.json()).then(data => {
  return data;
});


function createPostsFromJSON(postsObj) {

  let posts = postsObj.posts;
  let parent = document.getElementById("postContainer");

  for(let index in posts){
    let post = posts[index];
    let user = post.user;
    let date = post.date;
    let content = post.content;

    let picturePath = post.picture;

    //create node for post
    let div = document.createElement("div");
    div.setAttribute("class", "flexbox-post post");

    //create node for header
    let header = document.createElement("div");
    header.setAttribute("class", "post post-header");

    //create node for profile picture
    let profileImage = document.createElement("img");
    profileImage.setAttribute("class", "post_profile");
    profileImage.setAttribute("src", "res" + user.profilePicture);

    //create node for date
    let dateElement = document.createElement("p");
    let dateText = document.createTextNode(date);
    dateElement.appendChild(dateText);

    header.append(profileImage, dateElement);

    //create node for post content
    let postContents = document.createElement("div");
    postContents.setAttribute("class", "post post-contents");

    // add image to content node if this post has a picture
    if(picturePath != null){
      let imageNode = document.createElement("img");
      imageNode.setAttribute("class", "img");
      imageNode.setAttribute("src", "res" + picturePath);
      postContents.appendChild(imageNode);
    }

    //create node for post caption (text)
    let postCaption = document.createElement("div");
    postCaption.setAttribute("class", "post post-caption");
     let contentNode = document.createElement("p");
     let contentText = document.createTextNode(content);
     contentNode.appendChild(contentText);
     postCaption.appendChild(contentNode)

     div.append(header, postContents, postCaption);

     parent.appendChild(div)
  }
}