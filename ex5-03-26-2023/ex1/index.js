const button = document.querySelector('button');

const convertHexToRgb = (color) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
  return result
    ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )})`
    : null;
};

button.onclick = () => {
  const body = document.querySelector('body');
  const firstInput = document.querySelector('#firstInput').value;
  const secondInput = document.querySelector('#secondInput').value;
  const text = document.querySelector('.text');

  const rgbFirst = convertHexToRgb(firstInput);
  const rgbSecond = convertHexToRgb(secondInput);
  console.log({ rgbFirst, rgbSecond });

  const bg = `linear-gradient(to right, ${rgbFirst}, ${rgbSecond})`;
  body.style.backgroundImage = bg;
  text.innerHTML = bg;
};
