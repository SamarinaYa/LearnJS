document.addEventListener('DOMContentLoaded', () => {

	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContent = document.querySelectorAll('.tabcontent');
	const tabsParent = document.querySelector('.tabheader__items');

	tabsParent.addEventListener('click', (event) => {
		if(event.target && event.target.classList.contains('tabheader__item')) {
			tabs.forEach((tab, i) => {
				if(event.target === tab) {
					hideTabContent();
					showTabContent(i);
				}
			});
		}
	});


	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');

		});
		tabs.forEach((item) => {
			item.classList.remove('.tabheader__item_active');
		});
	}

	function showTabContent(i =0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add('.tabheader__item_active');
	}

	hideTabContent();
	showTabContent();

});