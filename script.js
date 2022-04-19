const likes = document.querySelectorAll('.dish_day-stat-like');

// В каждом элементе выбираем плюс и минус. Навешиваем на событие клик функцию render()
likes.forEach(like => {
	const plus = like.querySelector('.dish_day-like_pic');
	const counter_element = like.querySelector('.dish_day-like');

    let counter = 0;

    plus.addEventListener('click', () => {
        if(counter === 0){
        	render(++counter, counter_element);
        }
        else if (counter > 0) {
        	render(--counter, counter_element);
        }
  	});
});
// Функция обновляет текст
const render = (counter, counter_element) => counter_element.innerText = counter;


//POP-UP login start
const popupLinks = document.querySelectorAll('.btn-open-form'); //получаем все объекты с классом popup-link

let unlock = true; //чтобы не было двойных нажатий

if (popupLinks.length > 0) { //проверка на наличие ссылок с классом popup-link на странице
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index]; //записываем каждую найденную ссылку в переменную
		popupLink.addEventListener("click", function (e) { //вешаем событие при клике на ссылку
			const popupName = popupLink.getAttribute('href').replace('#', ''); // удаление решетки из адресной строки
			const curentPopup = document.getElementById(popupName); // замена этой решетки на имена записанное в id
			popupOpen(curentPopup); // отправка полученной ссылки в функцию popupOpen для открытия окна popup
			e.preventDefault(); // запрет на перезагрузки страницы при переходе в popup
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.button-form-close');
if (popupCloseIcon.length > 0) { //проверка на наличие ссылок с классом popup-link на странице
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index]; //записываем каждую найденную ссылку в переменную
		el.addEventListener('click', function (e) { //вешаем событие при клике на ссылку
			popupClose(el.closest('.popup')); // отправка полученной ссылки в функцию popupClose для закрытия (ищет ближайшего родителя с классом popup)
			e.preventDefault(); // запрет на перезагрузки страницы при переходе в popup
		});
	}
}

//когда в popup есть ссылка на другой popup
function popupOpen(curentPopup) { //передаем готовый объект по его id
	if (curentPopup && unlock) { //проверка на наличие такого объекта и открыт ли unlock (по умолчанию она открыта "true")
		const popupActive = document.querySelector('.popup.open'); //получаем открытый popup у которого есть класс open
		if (popupActive) { //если он существует...
			popupClose(popupActive, false); //закрыть его
		} 
		curentPopup.classList.add('open'); //добавляем открывшемуся popup класс open
		curentPopup.addEventListener("click", function (e) { // для открывшегося popup вешаем событие при клике
			if (!e.target.closest('.pop-up_body')) { // если у нажатого объекта в родителях нет объекта с классом popup__content, то (для закрытия popup при нажатии на область вне формы)
				popupClose(e.target.closest('.popup')); // закрываем popup
			}
		});
	}
}

//закрытие формы
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
	}
}

//закрытие popup при нажатии на ESC
document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup.open');
		popupClose(popupActive);
	}
});
// POP-Up login end
