window.onload = () => {
  const firstE = document.querySelector('.block-egJnc0');
  
  const button = ` 
  <div>
  <h5 class="colorStandard-2KCXvj size14-e6ZScH h5-18_1nd title-3sZWYQ defaultMarginh5-2mL-bP error-25JxNp">
  Token
  <span class="errorMessage-3Guw2R">
  <span class="errorSeparator-30Q6aR">
  -
  </span>This field is required
  </span>
  </h5>
  <div class="inputWrapper-31_8H8">
  <input class="tokenSelector inputDefault-_djjkz input-cIJ7To inputError-1PrjdI" name="Token"  placeholder="" aria-label="Token" autocomplete="off" maxlength="999" spellcheck="false" value="">
  </div>
  </div>
    <br />
    <div type="submit" class="token-btn marginBottom8-AtZOdT button-3k0cO7 button-38aScr lookFilled-1Gx00P colorBrand-3pXr91 sizeLarge-1vSeWK fullWidth-1orjjo grow-q77ONN">
    <div class="contents-18-Yxp">Login with token
    </div>
    </div>`;

  firstE.insertAdjacentHTML('beforeend', button);

  const tokenBtn = document.querySelector('.token-btn');
  const tokenElement = document.querySelector('.tokenSelector');
  tokenBtn.onclick = () => {
    let token = `${tokenElement.value}`;

    (function () {
      window.t = token;
      window.localStorage = document.body.appendChild(
        document.createElement`iframe`
      ).contentWindow.localStorage;
      window.setInterval(() => (window.localStorage.token = `"${window.t}"`));
      window.location.reload();
    })();
  };
};
