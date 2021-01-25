// Dom Elements
const date = document.getElementById('date')
const time = document.getElementById('time')
const greeting = document.getElementById('greeting')
const name = document.getElementById('name')
const focus = document.getElementById('focus')
const btn = document.querySelector('.btn')
const quote = document.getElementById('quote')

const city = document.getElementById('city')
const temperature = document.getElementById('temperature')
const weather_description = document.getElementById('weather_description')
const weather_icon = document.getElementById('weather_icon')
const humidity = document.getElementById('humidity')
const wind = document.getElementById('wind')

//Show Date
function showDate() {
	const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		},
		formattedDate = new Date().toLocaleDateString('en-GB', options)

	date.innerText = formattedDate
}
// Show Time
function showTime() {
	let today = new Date(),
		hour = today.getHours(),
		min = today.getMinutes(),
		sec = today.getSeconds()

	// Add Zero
	function addZero(n) {
		return (parseInt(n, 10) < 10 ? '0' : '') + n
	}
	//Output the time
	time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
		sec
	)}`
	setTimeout(showTime, 1000)
}
// Set Background and Greeting
function setBgGreet() {
	let hour = new Date().getHours()

	if (hour < 12 && hour > 5) {
		// Morning
		getImage()
		greeting.textContent = 'Good Morning, '
	} else if (hour >= 12 && hour < 18) {
		// Afternoon
		getImage()
		greeting.textContent = 'Good Afternoon, '
	} else if (hour <= 23 && hour >= 18) {
		// Evening
		greeting.textContent = 'Good Evening, '
		getImage()
	} else {
		greeting.textContent = 'Good Night, '
		getImage()
	}
}

//Conditions - change each hour// have 20 images
// HAVE buton to see all pic  of day // same order // +soft change of pics

const base = './assets/images/'
const images = randomImagesLinks()

console.log(images)
// !!!!!!!!!!!
let i = new Date().getHours()

function viewBgImage(data) {
	const body = document.querySelector('body')
	const src = data
	const img = document.createElement('img')
	img.src = src
	img.onload = () => {
		body.style.backgroundImage = `url(${src})`
	}
}

function randomImagesLinks() {
	let randomAray = Array.from({ length: 24 }, () =>
		Math.floor(Math.random() * (20 - 1) + 1)
	)

	return randomAray.map((number, index) => {
		let stringNum = number < 10 ? '0' + number.toString() : number.toString()
		return index < 12 && index > 5
			? `morning/${stringNum}.jpg`
			: index >= 12 && index < 18
			? `day/${stringNum}.jpg`
			: index <= 23 && index >= 18
			? `evening/${stringNum}.jpg`
			: `night/${stringNum}.jpg`
	})
}

function getImage() {
	const index = i % images.length
	const imageSrc = base + images[index]
	viewBgImage(imageSrc)
	i++
	btn.disabled = true
	setTimeout(function () {
		btn.disabled = false
	}, 1000)
}

//----------------------------------------
//Get Name
function getName() {
	if (
		localStorage.getItem('name') === '' ||
		localStorage.getItem('name') === null
	) {
		name.textContent = '[Enter Name]'
	} else {
		name.textContent = localStorage.getItem('name')
	}
}
//Set Name
function setName(e) {
	if (e.type === 'keypress') {
		//Make sure enter is press
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('name', e.target.innerText)
			name.blur()
		}
	} else {
		localStorage.setItem('name', e.target.innerText)
		getName()
	}
}
function clearName() {
	if (name.textContent === '[Enter Name]') {
		name.textContent = ''
	}
}
//Get Focus
function getFocus() {
	if (
		localStorage.getItem('focus') === '' ||
		localStorage.getItem('focus') === null
	) {
		focus.textContent = '[Enter Focus]'
	} else {
		focus.textContent = localStorage.getItem('focus')
	}
}
//Set Focus
function setFocus(e) {
	if (e.type === 'keypress') {
		//Make sure enter is press
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('focus', e.target.innerText)
			focus.blur()
		}
	} else {
		localStorage.setItem('focus', e.target.innerText)
		getFocus()
	}
}
//Clear Focus
function clearFocus() {
	if (focus.textContent === '[Enter Focus]') {
		focus.textContent = ''
	}
}

//Get Quote
const url = 'https://favqs.com/api/qotd'

async function fetchQuotes() {
	try {
		const response = await fetch(url)
		const data = await response.json()
		let quoteRS = data.quote.body
		quote.innerText =
			quoteRS.length < 140
				? `"${quoteRS} "`
				: `"The true greatness comes from cleaning your hands each time."`
	} catch (e) {
		console.error(e)
	}
}
//Get City for Weather

function getCity() {
	if (
		localStorage.getItem('city') === '' ||
		localStorage.getItem('city') === null
	) {
		city.textContent = '[Enter City]'
	} else {
		city.textContent = localStorage.getItem('city')
	}
}

function setCity(e) {
	if (e.type === 'keypress') {
		//Make sure enter is press
		if (e.which == 13 || e.keyCode == 13) {
			localStorage.setItem('city', e.target.innerText)
			city.blur()
		}
	} else {
		localStorage.setItem('city', e.target.innerText)
		getCity()
		getWeather()
	}
}
function clearCity() {
	if (city.textContent === '[Enter City]') {
		city.textContent = ''
	}
}

async function getWeather() {
	const key = '31f0ab5e198f2cd352a19e1014f0c97f'
	const cityLink = localStorage.getItem('city')
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityLink}&lang=en&appid=${key}&units=metric`
	try {
		const res = await fetch(url)
		const data = await res.json()
		temperature.innerText = `${data.main.temp.toFixed(0)}°C`
		weather_description.innerText = data.weather[0].main
		humidity.innerText = `${data.main.humidity}%`
		wind.innerText = `${data.wind.speed} m/s`
		weather_icon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
		console.log(data.weather[0])
	} catch (e) {
		alert(`Can not find the city: ${cityLink}`)
	}
}
//-----------------------

name.addEventListener('click', clearName)
name.addEventListener('keypress', setName)
name.addEventListener('blur', setName)

focus.addEventListener('click', clearFocus)
focus.addEventListener('keypress', setFocus)
focus.addEventListener('blur', setFocus)

city.addEventListener('click', clearCity)
city.addEventListener('keypress', setCity)
city.addEventListener('blur', setCity)

btn.addEventListener('click', getImage)
quote.addEventListener('click', fetchQuotes)

//Run
fetchQuotes()
showDate()
showTime()
setBgGreet()

getCity()
getWeather()
getName()
getFocus()
