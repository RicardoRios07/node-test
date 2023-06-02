import React, { useRef, useState } from 'react';
import './App.css';

const catalogo = [
  {
    titulo: 'Interestellar',
    imagen: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
    descripcion: 'Al ver que la vida en la vida en la Tierra está llegando a su fin, un grupo de exploradores decide embarcarse en la que puede ser la misión más importante de la historia de la humanidad y emprender un viaje más allá de nuestra galaxia en el que descubrirán si las estrellas pueden albergar el futuro de la raza humana',
    genero: 'Drama / Ciencia Ficcion',
  },
  {
    titulo: 'Her',
    imagen: 'https://m.media-amazon.com/images/M/MV5BMjA1Nzk0OTM2OF5BMl5BanBnXkFtZTgwNjU2NjEwMDE@._V1_FMjpg_UX1000_.jpg',
    descripcion: 'Situada en un futuro cercano Los Angeles, "Her" habla de Theodore (Joaquin Phoenix), un tipo complejo pero muy humano que vive de escribir cartas emotivas y personales para otra gente. Destrozado tras el fin de una larga relación, se intriga por un nuevo y avanzado sistema operativo, que promete ser una entidad única e intuitiva por sí sola. Nada más comenzar, queda encantado con "Samantha", una carismática voz femenina (Scarlett Johansson) que es perspicaz, sensible y sorprendentemente divertida. Cuando los deseos y necesidades mutuos van aumentando, su amistad da paso al amor. ',
    genero: 'Dramática romántica',
  },
  
];

const NUM_ASIENTOS = 30;

const App = () => {
  const [reservacion, setReservacion] = useState(null);
  const [nombre, setNombre] = useState('');
  const [asientos, setAsientos] = useState([]);
  const [hora, setHora] = useState('');
  const [fecha, setFecha] = useState('');

  const formularioRef = useRef(null);

  const handleReservar = (titulo) => {
    setReservacion({ titulo });
    
    if(formularioRef.current){
      formularioRef.current.scrollIntoView({behavior: "smooth"})
    }
  };

  const handleConfirmar = () => {
    if (nombre && asientos.length > 0 && hora && fecha) {
      const detalles = `Nombre: ${nombre}\nAsientos: ${asientos.join(', ')}\nFecha y hora: ${fecha} ${hora}`;

      alert(`¡Reservación confirmada!\n\n${detalles}`);
      setReservacion(null);
      setNombre('');
      setAsientos([]);
      setHora('');
      setFecha('');
    }
  };

  const handleFechaChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate >= currentDate) {
      setFecha(e.target.value);
    } else {
      alert('La fecha seleccionada no puede ser anterior a la fecha actual.');
    }
  };

  const handleAsientoChange = (e) => {
    const asiento = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      if (asientos.length < NUM_ASIENTOS) {
        setAsientos((prevAsientos) => [...prevAsientos, asiento]);
      } else {
        e.target.checked = false;
        alert('Has alcanzado el número máximo de asientos seleccionados.');
      }
    } else {
      setAsientos((prevAsientos) => prevAsientos.filter((item) => item !== asiento));
    }
  };

  return (
    <div className="App">
      <h1>Mis Peliculas favorias</h1>
      <div className="catalogo">
        {catalogo.map((pelicula, index) => (
          <div className="cuadro" key={index}>
            <img src={pelicula.imagen} alt={pelicula.titulo} />
            <h2>{pelicula.titulo}</h2>
            <p>{pelicula.descripcion}</p>
            <p>Género: {pelicula.genero}</p>
            <button className="boton-reservar" onClick={() => handleReservar(pelicula.titulo)}>
              Reservar sala de cine
            </button>
          </div>
        ))}
      </div>
      {reservacion && (
        <div className="formulario" ref={formularioRef}>
          <h2>Formulario de Reservación</h2>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label htmlFor="fecha">Fecha:</label>
          <input type="date" id="fecha" value={fecha} onChange={handleFechaChange} />
          <label htmlFor="hora">Hora:</label>
          <select id="hora" value={hora} onChange={(e) => setHora(e.target.value)}>
            <option value="">Seleccionar hora</option>
            <option value="09:00">16:30</option>
            <option value="13:30">17:30</option>
            <option value="18:00">21:15</option>
            {/* Agrega más opciones de hora según sea necesario */}
          </select>
          <label>Asientos:</label>
          <div className="asientos">
            {Array.from({ length: NUM_ASIENTOS }, (_, index) => {
              const asiento = `Asiento ${index + 1}`;
              const isChecked = asientos.includes(asiento);

              return (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={asiento}
                    onChange={handleAsientoChange}
                    checked={isChecked}
                  />
                  {asiento}
                </label>
              );
            })}
          </div>
          <p>Número de Asientos: {asientos.length}</p>
          <button className="boton-confirmar" onClick={handleConfirmar}>
            Confirmar reservación
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
