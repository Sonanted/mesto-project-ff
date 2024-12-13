(()=>{"use strict";var t={baseUrl:"https://nomoreparties.co/v1/cohort-mag-4",headers:{authorization:"73e89214-0c23-43f4-86c2-2071a55d95ef","Content-Type":"application/json"}};function e(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,o={method:n,headers:t.headers};return r&&(o.body=r),fetch("".concat(t.baseUrl,"/").concat(e),o).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status," ").concat(t.url))})).then((function(t){return Promise.resolve(t)})).catch((function(t){return console.error(t)}))}var n="card",r="card__like-button_is-active",o="card__like-count",c="card__delete-button",a=document.querySelector("#card-template").content;function i(t,e,i,u,l){var s=a.querySelector(".".concat(n)).cloneNode(!0),d=s.querySelector(".".concat("card__image")),p=s.querySelector(".".concat("card__like-button"));return s.dataId=t._id,s.querySelector(".".concat("card__title")).textContent=t.name,d.src=t.link,d.alt=t.name,s.querySelector(".".concat(c)).addEventListener("click",i),p.addEventListener("click",u),t.likes.find((function(t){return t._id==e}))&&p.classList.add(r),d.addEventListener("click",(function(){return l(t.name,t.link)})),s.querySelector(".".concat(o)).textContent=t.likes.length,e!==t.owner._id&&s.querySelector(".".concat(c)).classList.add("card__delete-button_is-hidden"),s}var u,l="popup_is-opened";function s(t){"Escape"===t.key&&f(document.querySelector(".".concat(l)))}function d(t){t.classList.add(l),document.addEventListener("keydown",s)}function p(t){t.target.classList.contains("popup")&&f(t.target)}function f(t){t.classList.remove(l),document.removeEventListener("keydown",s)}function m(t,e){var n=t.querySelector(".".concat(e.id,"-error"));e.classList.remove(u.inputErrorClass),n.textContent=""}function v(t,e){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?e.classList.remove(u.inactiveButtonClass):e.classList.add(u.inactiveButtonClass)}function y(t){u=t,Array.from(document.querySelectorAll(u.formSelector)).forEach((function(t){t.addEventListener("submit",(function(t){t.preventDefault()})),function(t){var e=Array.from(t.querySelectorAll(u.inputSelector)),n=t.querySelector(u.submitButtonSelector);v(e,n,u.inactiveButtonClass),e.forEach((function(r){r.addEventListener("input",(function(){(function(t,e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.error):e.setCustomValidity(""),e.validity.valid?m(t,e):function(t,e,n){var r=t.querySelector(".".concat(e.id,"-error"));e.classList.add(u.inputErrorClass),r.textContent=n}(t,e,e.validationMessage)})(t,r),v(e,n)}))}))}(t)}))}function _(t,e){u=e;var n=Array.from(t.querySelectorAll(u.inputSelector));n.forEach((function(e){m(t,e)})),v(n,t.querySelector(u.submitButtonSelector))}function S(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var q,E=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),L=document.querySelector(".profile__image"),g=document.querySelectorAll(".popup__close"),k=document.querySelectorAll(".popup"),C=document.querySelector(".popup_type_image"),A=C.querySelector(".popup__image"),x=C.querySelector(".popup__caption"),T=document.querySelector(".popup_type_edit"),w=document.querySelector(".popup_type_new-card"),B=document.querySelector(".popup_type_avatar"),I=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),D=document.forms["edit-profile"],j=D.elements.name,O=D.elements.description,N=document.forms["new-place"],U=N.elements["place-name"],J=N.elements.link,M=document.forms["edit-avatar"],G=M.elements.avatar,H={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button-inactive",inputErrorClass:"popup__input-type-error"},V=[function(t){var r=t.target.closest(".".concat(n));!function(t){e("cards/".concat(t),"DELETE")}(r.dataId),r.remove()},function(t){var c=t.target.closest(".".concat(n));(t.target.classList.toggle(r)?function(t){return e("cards/likes/".concat(t),"PUT")}(c.dataId):function(t){return e("cards/likes/".concat(t),"DELETE")}(c.dataId)).then((function(t){c.querySelector(".".concat(o)).textContent=t.likes.length}))},function(t,e){A.src=e,A.alt=t,x.textContent=t,d(C)}];function z(t,e){var n=t.querySelector(".popup__button");n.textContent=e?"Сохранение...":"Сохранить",n.disabled=e,e||f(t.closest(".popup"))}function $(t){document.querySelector(".profile__title").textContent=t.name,document.querySelector(".profile__description").textContent=t.about,F(t.avatar),q=t._id}function F(t){document.querySelector(".profile__image").style="background-image: url('".concat(t,"')")}g.forEach((function(t){return t.addEventListener("click",(function(){return f(t.closest(".popup"))}))})),k.forEach((function(t){t.classList.add("popup_is-animated"),t.addEventListener("mousedown",p)})),h.addEventListener("click",(function(){_(D,H),j.value=I.textContent,O.value=P.textContent,d(T)})),b.addEventListener("click",(function(){N.reset(),_(N,H),d(w)})),L.addEventListener("click",(function(){M.reset(),_(M,H),d(B)})),D.addEventListener("submit",(function(t){return function(t){var n;t.preventDefault(),z(D,!0),(n=JSON.stringify({name:j.value,about:O.value}),e("users/me","PATCH",n)).then((function(t){$(t)})).finally((function(){return z(D,!1)}))}(t)})),N.addEventListener("submit",(function(t){return function(t){var n;t.preventDefault(),z(N,!0),(n=JSON.stringify({name:U.value,link:J.value}),e("cards","POST",n)).then((function(t){E.prepend(i.apply(void 0,[t,q].concat(V)))})).finally((function(){z(N,!1),N.reset()}))}(t)})),M.addEventListener("submit",(function(t){return function(t){var n;t.preventDefault(),z(M,!0),(n=JSON.stringify({avatar:G.value}),e("users/me/avatar","PATCH",n)).then((function(t){F(t.avatar)})).finally((function(){z(M,!1),M.reset()}))}(t)})),Promise.all([e("users/me","GET"),e("cards","GET")]).then((function(t){var e,n=function(t){if(Array.isArray(t))return S(t)}(e=t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return S(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?S(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),r=n[0],o=n[1];y(H),$(r),o.forEach((function(t){return E.append(i.apply(void 0,[t,q].concat(V)))}))}))})();