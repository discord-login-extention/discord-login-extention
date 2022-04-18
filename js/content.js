const $ = (element = String()) => document.querySelector(element);
const $$ = (element = String()) => document.querySelectorAll(element);

const createBox = (html) => {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.removeChild(div.firstElementChild);
};

const main = createBox(`<div style="margin-top: 20px">
  <h5 class="title-token">Token</h5>
  <div class="inputWrapper-token">
    <input
      class="inputDefault-token"
      name="Token"
      placeholder=""
      aria-label="Token"  
      autocomplete="off"
      maxlength="999"
      spellcheck="false"
      value
    />
  </div>
  <br />
  <div class="loginToken-btn">
    <div class="content-button">Login with token</div>
  </div>
</div>`);

const sel = (selector) => {
  return main.querySelector(selector);
};

const responeBox = () => {
  const boxLogin = $("[class^=block]");
  if (boxLogin) boxLogin.appendChild(main);
};

const observer = new MutationObserver(() => {
  if (!document.body.contains(main)) responeBox();
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

responeBox();

const tokenBtn = sel(".loginToken-btn");

const tokenElement = sel(".inputDefault-token");

const h5element = sel(".title-token");

const contentsBtn = sel(".content-button");

const spinnerElement = spinner();

const invaildToken = errorElement("Token is invaild");

const emptyToken = errorElement("This field is required");

const ChangeToError = (Type) => {
  h5element.classList.add("title-error");
  h5element.appendChild(Type);
  spinnerElement.remove();
  contentsBtn.innerHTML = "Login with token";
  tokenElement.focus();
};
const noToken = () => {
  return setTimeout(ChangeToError(emptyToken), 500);
};

const noRes = () => {
  return ChangeToError(invaildToken);
};

const onclickBtn = async () => {
  contentsBtn.innerHTML = "";

  tokenBtn.appendChild(spinnerElement);

  h5element.classList.remove("title-error");

  invaildToken.remove();

  emptyToken.remove();

  let token = tokenElement.value.trim().replace(/ +/ , '');

  if (!token) return noToken();

  const res = await checkToken(token);

  if (!(res == 200)) return noRes();

  return login(token);
};

tokenBtn.onclick = async () => await onclickBtn();
///////////////////////////////////////////////////////////////
function spinner() {
  const mainSpinner = document.createElement("span");

  mainSpinner.className = "spinner-loading";

  const nodeSpinner = document.createElement("span");

  nodeSpinner.className = "spinner-loading";

  const spains = [];

  for (let i = 0; i < 3; i++) {
    let element = document.createElement("span");

    element.className = "pulsingEllipsisItem-loading";

    spains.push(element);
  }
  for (let el of spains) nodeSpinner.appendChild(el);

  mainSpinner.appendChild(nodeSpinner);

  return mainSpinner;
}
function errorElement(message) {
  const mainSpan = document.createElement("span");

  mainSpan.className = "errorMessage-login";

  const nodeSpan = document.createElement("span");

  nodeSpan.className = "errorSeparator-login";

  nodeSpan.appendChild(document.createTextNode("-"));

  mainSpan.appendChild(nodeSpan);

  mainSpan.appendChild(document.createTextNode(message));

  return mainSpan;
}
async function checkToken(token) {
  const res = await fetch("https://discord.com/api/v9/users/@me", {
    headers: {
      authorization: token,
    },
  });

  return res.status;
}
function login(token) {

  window.localStorage = document.body.appendChild(
    document.createElement`iframe`
  ).contentWindow.localStorage;

  window.setInterval(() => (window.localStorage.token = `"${token}"`));

  window.location.reload();
}
