const dailyButton = document.getElementById('dailyButton'),
      weeklyButton = document.getElementById('weeklyButton'),
      monthlyButton = document.getElementById('monthlyButton'),
      dayInfo = document.getElementsByClassName('dayInfo'),
      weeklyInfo = document.getElementsByClassName('weeklyInfo'),
      monthInfo = document.getElementsByClassName('monthInfo'),
      newInfo = document.getElementsByClassName('newInfo'),
      oldInfo = document.getElementsByClassName('oldInfo'),
      blockName = document.getElementsByClassName('blockName');

dailyButton.addEventListener('click', function(){
  for(i = 0; i < dayInfo.length; i++) {
    dayInfo[i].style.display = 'grid';
    weeklyInfo[i].style.display = 'none';
    monthInfo[i].style.display = 'none';
  }
  dailyButton.classList.add('active');
  weeklyButton.classList.remove('active');
  monthlyButton.classList.remove('active');
});

weeklyButton.addEventListener('click', function(){
  for(i = 0; i < dayInfo.length; i++) {
    weeklyInfo[i].style.display = 'grid';
    dayInfo[i].style.display = 'none';
    monthInfo[i].style.display = 'none';
  }
  weeklyButton.classList.add('active');
  dailyButton.classList.remove('active');
  monthlyButton.classList.remove('active');
});

monthlyButton.addEventListener('click', function(){
  for(i = 0; i < dayInfo.length; i++) {
    monthInfo[i].style.display = 'grid';
    weeklyInfo[i].style.display = 'none';
    dayInfo[i].style.display = 'none';
  }
  monthlyButton.classList.add('active');
  dailyButton.classList.remove('active');
  weeklyButton.classList.remove('active');
});

const fetchPromise = fetch(
    'data.json',
);

fetchPromise.then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Парсинг данных в формате JSON
  })
  .then(data => {
    // Проверка, что массивы newInfo и oldInfo и data инициализированы и имеют достаточную длину
    if (newInfo.length < data.length * 3 || oldInfo.length < data.length * 3) {
      console.error('Элементы массива newInfo или oldInfo не соответствуют количеству данных.');
      return;
    }
    for(i = 0; i < data.length; i++) {
      blockName[i].innerHTML = `${data[i].title}`;
      newInfo[i * 3].innerHTML = `${data[i].timeframes.daily.current} hrs`;
      oldInfo[i * 3].innerHTML = `Last day ${data[i].timeframes.daily.previous} hrs`;
      newInfo[i * 3 + 1].innerHTML = `${data[i].timeframes.weekly.current} hrs`;
      oldInfo[i * 3 + 1].innerHTML = `Last week ${data[i].timeframes.weekly.previous} hrs`;
      newInfo[i * 3 + 2].innerHTML = `${data[i].timeframes.monthly.current} hrs`;
      oldInfo[i * 3 + 2].innerHTML = `Last month ${data[i].timeframes.monthly.previous} hrs`;
    }
  })
  .catch(error => {
    console.error('Ошибка при получении данных:', error);
  });