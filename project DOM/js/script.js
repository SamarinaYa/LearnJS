/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

/* ========================================================================================================

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */


'use strict';

document.addEventListener('DOMContentLoaded', () => {
	const movieDB = {
		movies: [
			'Логан',
			'Лига справедливости',
			'Ла-ла лэнд',
			'Одержимость',
			'Скотт Пилигрим против...'
		]
	};
	
	const adv = document.querySelectorAll('.promo__adv img');
	const poster = document.querySelector('.promo__bg');
	const genre = poster.querySelector('.promo__genre');
	const movieList = document.querySelector('.promo__interactive-list');
	const addForm = document.querySelector('form.add');
	const addInput = addForm.querySelector('.adding__input');
	const checkbox = addForm.querySelector('[type="checkbox"]');
	
	const deleteAdv = (arr) => {
		arr.forEach(elem => {
			elem.remove();
		});
	};
	
	
	const makeChanges = () => {
		genre.innerHTML = 'Драма';
		poster.style.cssText = 'background: url(img/bg.jpg) center center/cover no-repeat';
	};
	
	
	const arrSort = (arr) => {
		arr.sort();
	};
	
	
	const createMovieList = (films, parent) => {
		parent.innerHTML = '';
		arrSort(films);
		
		films.forEach((film, i) => {
			parent.innerHTML += `
			<li class="promo__interactive-item">${i+1} ${film}
				<div class="delete"></div>
			</li>
			`;
		});

		document.querySelectorAll('.delete').forEach((btn, i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				films.splice(i,1);
				createMovieList(films, parent);
			});
		});
	};

	deleteAdv(adv);
	makeChanges();
	arrSort(movieDB.movies);
	createMovieList(movieDB.movies, movieList);
	
	addForm.addEventListener('submit', (e) => {
		e.preventDefault();

		let newFilm = addInput.value;
		let favorite = checkbox.checked;
		let array = movieDB.movies;

		for(let i=0; i<array.length; i++) {
			if(newFilm.toLowerCase() === array[i].toLowerCase()) {
				alert('Такой фильм уже добавлен');
				addForm.reset();
				return;
			}
		}

		if(newFilm) {
			if(newFilm.length > 21) {
				newFilm = `${newFilm.substr(0, 22)}...`;
			} 
			if(favorite) {
				console.log('Добавляем любимый фильм');
			} 
	
			movieDB.movies.push(newFilm);
			arrSort(movieDB.movies);
			createMovieList(movieDB.movies, movieList);
		} 
		
		addForm.reset();
	});

	
});




