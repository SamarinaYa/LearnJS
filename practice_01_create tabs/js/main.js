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
});
