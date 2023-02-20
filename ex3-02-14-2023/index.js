const button = document.querySelector('button');

button.onclick = () => {
  const score = +document.querySelector('#score').value;
  const par = +document.querySelector('#par').value;

  if (!score || score < 0) alert('Khong hop le');
  if (score === 1) console.log('Hole-in-one');
  if (score <= par - 2) console.log('Eagle');
  if (score <= par - 1) console.log('Birdy');
  if (score === par) console.log('Par');
  if (score === par + 1) console.log('Bogey');
  if (score === par + 2) console.log('Double Bogey');
  if (score >= par + 3) console.log('You lost!');
};
