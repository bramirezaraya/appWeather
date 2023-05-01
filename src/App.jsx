import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [infoApi, setInfoApi] = useState({})
  const [nombreCity, setNombreCity] = useState("Valparaiso");


  useEffect(() =>{
    axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=46af2f016cb53ede80ec5f1f3e164377&lang=en&q=`+ nombreCity)
    .then((response) =>{
      setInfoApi(response.data);
    })
  },[]);

  const handleSubmit = (event) =>{
    event.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/weather?appid=46af2f016cb53ede80ec5f1f3e164377&lang=en&q=`+ nombreCity)
    .then((response) =>{
      setInfoApi(response.data);
      setNombreCity("");
      console.log(infoApi)
    })
    .catch((error) => {
      console.log(error)
      alert("escriba bien el nombre")
      setNombreCity("");
    })
    
  };

  const tiempo = new Date()

      if(infoApi && infoApi.main){
          return (
          <>
            <main className='contenedor'>
                <div className='cajaInfo'>
                    <div className='informacion'>
                        <div className='titulos'>
                            <h1>{infoApi.name} / {infoApi.sys.country} </h1>
                            <h5>{tiempo.toDateString()}</h5>
                            <img src={`http://openweathermap.org/img/w/${infoApi.weather[0].icon}.png`} width="100px"/>
                        </div>
                        <div className='weather'>
                            <h1 className='temp'>{(infoApi.main.temp -273.15).toFixed(2)} °C</h1>
                            <h3 className='temp' >{infoApi.weather[0].description}</h3>
                            <div className='infoWeather'>
                                <div className='info'>
                                  <div>
                                      <p>Humidity</p> 
                                  </div>
                                  <div className='datos'>
                                      {infoApi.main.humidity}%
                                  </div>
                                </div>
                                <div className='info'>
                                  <div><p>pressure</p> </div>
                                  <div className='datos'>{infoApi.main.pressure} bar</div>
                                </div>
                                <div className='info'>
                                  <div><p>speed</p> </div>
                                  <div className='datos'>{infoApi.wind.speed} m/s</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='busqueda'>
                        <form className='formulario'>
                            <input className='form-control' type="text" value={nombreCity} placeholder='City' onChange={ (e) =>{setNombreCity(e.target.value)}} />
                            <button className='btn btn-secondary' onClick={handleSubmit}>Enviar dato</button>
                        </form>
                        
                    </div>
                </div>         
            </main>
          </>
        )
      }
      
  
}

export default App