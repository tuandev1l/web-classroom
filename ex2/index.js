const firstNum = document.querySelector('#first');
const secNum = document.querySelector('#sec');
const ansNum = document.querySelector('#ans');
const button = document.querySelector('button');

button.onclick = () => {
  const ans = +firstNum.value + +secNum.value;
  ansNum.innerHTML = ans;
};
