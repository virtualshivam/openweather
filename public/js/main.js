const submitBtn = document.getElementById('searchbtn');
const valueShower = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp');
const dataPanel = document.getElementById('data_panel');

const getInfo= async (e)=>{
	e.preventDefault();
	let cityName =document.getElementById('cityName').value.trim();
	if(cityName){
		try{
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=6ef99a60192774499e6e88180748382c`
			const response = await fetch(url);
			const data = await response.json();
			let arr =[data];
			valueShower.innerText = `${arr[0].name},${arr[0].sys.country}`;
			temp.innerHTML = arr[0].main.temp;
			const iconCode = arr[0].weather[0].icon;
			const weatherIcon = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
			temp_status.innerHTML = `<img src="${weatherIcon}" alt="${arr[0].weather[0].description}">`
			dataPanel.classList.remove('data_hide');
			document.getElementById('cityName').value ='';			

		}catch(error){
			valueShower.innerText = `No data found for ${cityName}`
			dataPanel.classList.add('data_hide');
		}
		
	}else{
		valueShower.innerHTML = 'Please write the Name before search';
		dataPanel.classList.add('data_hide');

	}

	cityName.value ='';
}

submitBtn.addEventListener('click',getInfo);

// code for setting date

let date = new Date();
const dayName = date.toLocaleDateString('en-us',{weekday:'long'});
const monthName = date.toLocaleDateString('en-us',{month:'short'});
const dateVal =`${date.getUTCDate()}`.length == 2 ? `${date.getUTCDate()}` :`0${date.getUTCDate()}`

document.getElementById('day').innerText = dayName;
document.getElementById('today_data').innerText = `${dateVal} ${monthName}`;