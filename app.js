$(function () {
  let postButton = $("#create-post");
  let imgPreview = $("#image-preview");
  let isImg = [];
  
  $(postButton).prop("disabled", true).addClass("create-post-off");

  $("#text-zone").keyup(function() {
    if ($(this).val() != 0 || imgPreview.children().length > 0) { 
      $(postButton).prop("disabled", false).addClass("create-post-on");
    } else if ($("#text-zone").val() == 0 || imgPreview.children().length == 0 ) {
      $(postButton).removeClass("create-post-on");
      $(postButton).prop("disabled", true).addClass("create-post-off");
      $(this).height(65);
    }
  });

  $("#text-zone").focus(function() {
    $(this).height(130);
  });

  $("#text-zone").focusout(function() {
    if($(this).val() != 0) {
      $(this).height(130);
    } else {
      $(this).height(65);
    }
  });

  $("#text-zone").keyup(function() {
    if( $(this).val() != 0  || $(this).val() !=  "") {
      $(this).height(130);
    } else {
      $(this).height(65);
    }
  });

  $("#text-zone").keyup(function() {
    let max = 500;
    let textLenght = $(this).val().length;
    if (textLenght >= max) {
      $("#char-num").text("You have reached the limit!");
      } else {
      let char = max - textLenght;
      $("#char-num").text("Characters remaining: " + char);
    }
  });

  $("#upload-button").change(function (event) {
    let gallery = $("<div></div>").addClass("img-gallery");
    let file = event.target.files[0];
    let fileReader = new FileReader();
    if (file.type.match(/^image\//)) {
      imgPreview.append(gallery);
      gallery.append($("<div>❌</div>").addClass("remove-img"));
      let img = document.createElement("img");
      fileReader.onload = function () {
        img.src = fileReader.result;
        gallery.append(img);
        $(postButton).prop("disabled", false).addClass("create-post-on");
      } 
      isImg.push(true);
    } else if (file.type.match('video')) {
      imgPreview.append(gallery);
      gallery.append($("<div>❌</div>").addClass("remove-img"));
      let video = document.createElement("video");
      fileReader.onload = function () {
        video.src = fileReader.result;
        video.autoplay = true;
        gallery.append(video);
        $(postButton).prop("disabled", false).addClass("create-post-on");
      } 
      isImg.push(false);
    } else {
      alert("Upload an image or a video.")
    }
    fileReader.readAsDataURL(file);
    $("#upload-button").val("");
  });
  
  $(".widget").click(".remove-img", function (e) {
    if (!e.target.classList.contains("remove-img"))
      return;
    $(e.target).parent().remove();
    if ($("#text-zone").val() != "" || imgPreview.children().length > 0 ){
      $(postButton).addClass("create-post-on");
    } else {
      $("#text-zone").height(65);
      $(postButton).removeClass("create-post-on");
      $(postButton).addClass("create-post-off");
    }
  }); 

  let attributeCounter = 0;
  let resultBox = $(".result-box");

  $(postButton).click(function() {
    let textLog = $("#text-zone").val();
    if (textLog.value != "" || textLog.length != 0) {
      let currentDate = new Date().toLocaleString();
      let postResult = $("<div></div>").addClass("post-result");
      let topSide = $("<div></div>").addClass("top-side");
      let profileImage = $("<div></div>").addClass("profile-image");
      let profilePicture = $("<img>").addClass("profilePicture");
      let infoNameDate = $("<div></div>").addClass("info-name-date");
      let userName = $("<div></div>").addClass("user-name");
      let postDate = $("<div></div>").addClass("post-date");
      let line = $("<div></div>").addClass("line");
      let informationBody = $("<div></div>").addClass("information-body");
      let textArea = $("<p></p>").text(textLog).addClass("text-area")
      let pictureFromForm = $("<div></div>").addClass("pictures-from-form")
      let arrowHolder = $("<div></div>").addClass("arrow-holder");
      let leftArrow = $("<button>⏪</button>").addClass("left-arrow arrow-design");
      let rightArrow = $("<button>⏩</button>").addClass("right-arrow arrow-design");
      let testSpace = $("<div></div>").addClass("just-space");
      let photosDiv = $(".img-gallery");
      
      resultBox.prepend(postResult);
      postResult.append(topSide);
      topSide.append(profileImage);
      profileImage.append(profilePicture);
      profilePicture.attr("src", "1.png");
      topSide.append(infoNameDate);
      infoNameDate.append(userName);
      userName.text("Ilie Ionut");
      infoNameDate.append(postDate);
      postDate.html(currentDate);
      postResult.append(line);
      postResult.append(informationBody);
      textArea.html(textLog.replace(/\n/g, "<br"));
      informationBody.append(textArea);
      informationBody.append(pictureFromForm);
      pictureFromForm.attr("data-x", attributeCounter);

      if(photosDiv.length > 1) {
        informationBody.append(arrowHolder);
        arrowHolder.append(leftArrow);
        arrowHolder.append(rightArrow);
        informationBody.append(testSpace);
      }

      for (let i = 0; i < photosDiv.length; i++) {
        if (i == 0) {
          imagePosition = $("<div></div>").addClass("image-position active");
        } else {
          imagePosition = $("<div></div>").addClass("image-position");
        }
        pictureFromForm.append(imagePosition);
        if (isImg[i]) {
          imagePosition.append($("<img>").attr({
            src: photosDiv.eq(i).children().eq(1).attr("src")
          }).addClass("showPictures"));
        } else if (!isImg[i]) {
          imagePosition.append($("<video controls>").attr({
            src: photosDiv.eq(i).children().eq(1).attr("src")
          }).addClass("showPictures"));
        }
      }
      isImg = [];
      $("#text-zone").height(65);
      $("#text-zone").val("");
      $("#image-preview").empty();
      $(postButton).removeClass("create-post-on");
      $(postButton).prop("disabled", true).addClass("create-post-off");
      $("#char-num").text("Characters remaining: 500");
      attributeCounter++;
    }
  });

  $(".result-box").click(".left-arrow", function (e) {
    if (!e.target.classList.contains("left-arrow"))
      return;

    let dataSetAttirbute = $(e.target).parent().parent().children().eq(1).attr("data-x");
    let currentSlide = $(".pictures-from-form[data-x='" + dataSetAttirbute + "'] > .image-position.active")
    let prevSlide = currentSlide.prev();
    currentSlide.hide();
    currentSlide.removeClass("active");
    prevSlide.show().addClass("active");

    if (prevSlide.length == 0) {
      $(".pictures-from-form[data-x='" + dataSetAttirbute + "'] > .image-position").last().show().addClass("active");
    }
  });

  $(".result-box").click(".right-arrow", function (e) {
    if (!e.target.classList.contains("right-arrow"))
      return;

    let dataSetAttirbute = $(e.target).parent().parent().children().eq(1).attr("data-x");
    let currentSlide = $(".pictures-from-form[data-x='" + dataSetAttirbute + "'] > .image-position.active")
    let nextSlide = currentSlide.next();
    currentSlide.hide();
    currentSlide.removeClass("active");
    nextSlide.show().addClass("active");

    if (nextSlide.length == 0) {
      $(".pictures-from-form[data-x='" + dataSetAttirbute + "'] > .image-position").first().show().addClass("active");
    }
  });
});









    

