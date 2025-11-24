// Только для анимации кнопок
document.querySelectorAll('.header-btn').forEach(btn => {
	btn.addEventListener('click', e => {
		e.preventDefault()
		btn.dataset.state = btn.dataset.state === 'closed' ? 'open' : 'closed'
	})
})
document.querySelectorAll('.toggle-video-btn').forEach(btn => {
	btn.addEventListener('click', function (e) {
		e.preventDefault()

		const slide = this.closest('.review-slide')
		const isOpen = this.dataset.state === 'open'

		// Переключаем состояние
		this.dataset.state = isOpen ? 'closed' : 'open'
		slide.classList.toggle('active', !isOpen)

		// Запускаем видео при открытии
		const video = slide.querySelector('.main-video')
		if (!isOpen) {
			video.play()
		} else {
			video.pause()
			video.currentTime = 0
		}
	})
})

const slider = document.querySelector('.review-slider')
const slides = Array.from(slider.querySelectorAll('.slide'))
const btnPrev = slider.querySelector('.arrow.prev')
const btnNext = slider.querySelector('.arrow.next')

let current = 0

// --- ИНИЦИАЛИЗАЦИЯ ---
function init() {
	slides.forEach((s, i) => {
		s.style.transform = `translateX(${(i - current) * 100}%)`
		s.classList.remove('active-slide', 'open-video')
	})

	slides[current].classList.add('active-slide')
}
init()

// --- ПЕРЕКЛЮЧЕНИЕ СЛАЙДОВ ---
function goToSlide(newIndex) {
	// закрываем видео у старого
	slides.forEach(sl => {
		sl.classList.remove('open-video')
		const v = sl.querySelector('.main-video')
		if (v) {
			v.pause()
			v.currentTime = 0
		}
	})

	current = (newIndex + slides.length) % slides.length

	slides.forEach((s, i) => {
		s.style.transform = `translateX(${(i - current) * 100}%)`
		s.classList.toggle('active-slide', i === current)
	})
}

btnNext.addEventListener('click', () => goToSlide(current + 1))
btnPrev.addEventListener('click', () => goToSlide(current - 1))

// --- КНОПКА "СМОТРЕТЬ ВИДЕО" ---
slider.addEventListener('click', e => {
	const toggle = e.target.closest('.toggle-btn')
	if (!toggle) return

	const slide = toggle.closest('.slide')
	const isOpen = slide.classList.contains('open-video')

	// Закрываем все слайды
	slides.forEach(s => {
		s.classList.remove('open-video')
		const v = s.querySelector('.main-video')
		if (v) {
			v.pause()
			v.currentTime = 0
		}
	})

	// Открываем только если закрывали
	if (!isOpen) {
		slide.classList.add('open-video')
		const v = slide.querySelector('.main-video')
		if (v) v.play()
	}
})
const menuBtn = document.querySelector('.menu-btn')
const recordBtn = document.getElementById('recordBtn')
const bottomMenu = document.getElementById('bottomMenu')
const recordMenu = document.getElementById('recordMenu')

// Универсальная функция
function toggleMenu(btn, menu) {
	btn.addEventListener('click', e => {
		e.preventDefault()

		const isOpen = menu.classList.contains('active')

		// Закрываем другое меню, если открыто
		if (bottomMenu.classList.contains('active') && menu !== bottomMenu) {
			bottomMenu.classList.remove('active')
			menuBtn.dataset.state = 'closed'
		}
		if (recordMenu.classList.contains('active') && menu !== recordMenu) {
			recordMenu.classList.remove('active')
			recordBtn.dataset.state = 'closed'
		}

		// Переключаем текущее
		menu.classList.toggle('active')
		btn.dataset.state = isOpen ? 'closed' : 'open'
	})
}

// Подключаем оба
toggleMenu(menuBtn, bottomMenu)
toggleMenu(recordBtn, recordMenu)
function setRealVH() {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--real-vh', `${vh}px`)
}

setRealVH()
window.addEventListener('resize', setRealVH)
