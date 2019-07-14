/*jshint esversion: 6 */
const DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
const DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
const DETAIL_FRAME_SELECTOR ='[data-image-role="frame"]';
const THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
const HIDDEN_DETAIL_CLASS = "hidden-detail";
const TINY_EFFECT_CLASS = 'is-tiny';
const ESC_KEY = 27;

let setDetails = (imageUrl, titleText)=>{
  let detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
  let detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
  detailImage.setAttribute('src',imageUrl);
  detailTitle.textContent = titleText;
};

let imageFromThumb = (thumbnail)=>{
  return thumbnail.getAttribute('data-image-url');
};

let titleFromThumb = (thumbnail)=>{
  return thumbnail.getAttribute('data-image-title');
};

let setDetailsFromThumbnail = (thumbnail)=>{
  setDetails(imageFromThumb(thumbnail), (titleFromThumb(thumbnail)));
};

let addThumbClickHandler = (thumb)=>{
  thumb.addEventListener('click',(event)=>{
    event.preventDefault();
    setDetailsFromThumbnail(thumb);
    showDetails();
  });
};

let getThumbnailsArray = ()=>{
  let thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  //let thumbnailArray = [].slice.call(thumbnails);
  let thumbnailArray = Array.from(thumbnails);
  
  return thumbnailArray;
};
let hideDetails = ()=>{
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
};

let showDetails = ()=>{
  let frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(()=>{
    frame.classList.remove(TINY_EFFECT_CLASS);
  },50);
    
 
};

let addKeyPressHandler = ()=>{
  document.body.addEventListener('keyup', (event)=>{
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY) {
      hideDetails();
    }
  });
};


let initializeEvents = ()=>{
  let thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
};

initializeEvents();

