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
		let t, days, hours, minutes,seconds;
		t = Date.parse(endtime) - Date.parse(new Date());

		if (t<=0) {
			days = 0;
			hours =0,
			minutes=0,
			seconds =0;
		} else {
			days = Math.floor(t /(1000*60*60*24)),
			hours = Math.floor(t /(1000*60*60) % 24),
			minutes = Math.floor(t /(1000*60) % 60),
			seconds = Math.floor(t /(1000) % 60);
		}
		

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


	const modalTrigger = document.querySelectorAll('[data-modal]'),
		modalElem = document.querySelector('.modal');
		

	function openModal() {
		modalElem.classList.add('show');
		modalElem.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(setTimerModal);
	}


	modalTrigger.forEach((item)=>{
		item.addEventListener('click', openModal);
	});


	function closesModal() {
		modalElem.classList.remove('show');
		modalElem.classList.add('hide');
		document.body.style.overflow = '';
	}


	modalElem.addEventListener('click', (e) => {
		if(e.target === modalElem  || e.target.getAttribute('data-close') == '') {
			closesModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modalElem.classList.contains('show')) {
			closesModal();
		}
	});

	const setTimerModal = setTimeout(openModal, 10000);


	function showModalByScroll() {
		if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
			openModal();
			window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);



	class MenuCard {
		constructor(src, alt, title, descr, price,parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
			
		}
		changeToUAH() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement('div');

			if(this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			
			element.innerHTML = `
                    <img src=${this.src} alt=4{this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>`;
				
			this.parent.append(element);
		}
	}

	new MenuCard(
		'img/tabs/vegy.jpg',
		'vegy', 
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',

	).render();
	new MenuCard(
		'img/tabs/elite.jpg',
		'elite', 
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		20,
		'.menu .container',

	).render();
	new MenuCard(
		'img/tabs/post.jpg',
		'post', 
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		16,
		'.menu .container',

	).render();


	//FORMS

	const forms = document.querySelectorAll('form');

	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Мы скоро с Вами свяжемся',
		fail: 'Что-то пошло не так'
	};

	forms.forEach(it => {
		postData(it);
	});

	function postData(form) {
		form.addEventListener('submit',(e) => {
			e.preventDefault();

			let statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
			form.insertAdjacentElement('afterend', statusMessage);

			const request = new XMLHttpRequest();
			request.open('POST', 'server.php');
			request.setRequestHeader('Content-Type', 'application/json');

			const formData = new FormData(form);
			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			});
			const json = JSON.stringify(object);
			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					form.reset();
					statusMessage.remove();
				} else {
					showThanksModal(message.fail);
				}
			});
		});
	}
	
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();
		
		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message}</div>
		</div>
		`;
		
		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closesModal();
		}, 4000);
	}
});



