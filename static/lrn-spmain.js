const router = document.querySelector('lrn-sprouter');

function spLinkClick(evt) {
  evt.preventDefault();
  router.go(evt.target.hash||"");
}
Array.from(document.querySelectorAll('a'), (link)=>{
  if (new RegExp(window.location.origin+'/($|#.*)', 'i').test(link.href)){
    link.addEventListener('click', spLinkClick);
  }
});
