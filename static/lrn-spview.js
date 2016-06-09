'use strict';
import 'whatwg-fetch';

class LrnSpView extends HTMLElement {

  get route () {
    return this.getAttribute('route') || null;
  }

	get url () {
    return this.getAttribute('url') || null;
  }

  in (data) {
    return  new Promise((resolve, reject) => {
      const onTransitionEnd = () => {
        this.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      };

      this.classList.add('visible');
      this.addEventListener('transitionend', onTransitionEnd);
    });
  }

  out (data) {
    return  new Promise((resolve, reject) => {
      const onTransitionEnd = () => {
        this.removeEventListener('transitionend', onTransitionEnd);
        resolve();
      };

      this.classList.remove('visible');
      this.addEventListener('transitionend', onTransitionEnd);
    });
  }

  update (data) {
    return Promise.resolve();
  }

	attachedCallback() {
		let thisView = this;
		if(this.url){
			fetch(this.url)
			  .then(function(response) {
					return response.text();
			  }).then(function(body) {
			    thisView.innerHTML = body;
			  });
		}
	}
}

document.registerElement('lrn-spview', LrnSpView);
