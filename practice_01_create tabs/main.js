document.addEventListener('DOMContentLoaded', () => {

	const tabs = document.querySelectorAll('.tabheader__item'), // получаем вкладки
		tabsContent = document.querySelectorAll('.tabcontent'), // получаем контект вкладок
		tabsParent = document.querySelector('.tabheader__items'); // получаем родителя для делегирования

	tabsParent.addEventListener('click', (event) => { // делегирование события
		const target = event.target;

		if(target && target.classList.contains('tabheader__item')) { // проверка на клик на таб
			tabs.forEach((item, i) => { // перебор табов
				if(target == item) { //проверка если элемент, на который кликнули совпадает с элементом, который перебирается
					hideTabContent(); // скрывается контент у всех табов
					showTabContent(i); // показывается контент i
				}
			});
		}
	});

	function hideTabContent() { // скрываем контент табов
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});

		tabs.forEach(tab => { // удаление класса активности у всех табов
			tab.classList.remove('tabheader__item_active');
		});
	}
 
	function showTabContent(i = 0) { // i = 0 параметр по умолчанию, дефолтное значение
		tabsContent[i].classList.add('show', 'fade'); // назначаем display: block
		tabsContent[i].classList.remove('hide'); // удаляем скрытие контента 
		tabs[i].classList.add('tabheader__item_active'); // назначаем класс активности
	}
    
	hideTabContent();
	showTabContent();

	const deadline = '2023-5-20';

	function calculateTime(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date()),
			days = Math.floor(t /(1000*60*60*24)),
			hours = Math.floor(t /(1000*60*60) % 24),
			minutes = Math.floor(t /(1000*60) % 60),
			seconds = Math.floor(t /(1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function getZero(num) {
		if(num>=0 && num<10) {
			return `0${num}`;
		} else {
			return num;
		}
	}

	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minutes = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);
		
		updateClock();

		
		
		function updateClock() {
			const t = calculateTime(endtime);
				
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);
			
			if (t.total <=0) {
				clearInterval(timeInterval);
			}
		}
	}

	setClock('.timer', deadline);
});



