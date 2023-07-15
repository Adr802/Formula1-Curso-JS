let driverJson = '';
let poll = {};
function cargarResultado(){
    
    //console.log("iniciado");
    // 1. Realizar solicitud HTTP GET a la API
    fetch('https://ergast.com/api/f1/current/last/results.json')
    .then(response => response.json()) // Convertir respuesta a JSON
    .then(data => {
    // 2. Analizar los datos y generar contenido HTML
    let tableHTML = '<table>';

    //console.log(data.MRData.RaceTable.Races[0].Results[0]);
    tableHTML += `
                <table class="table result-race">
                <thead class="table-light">
                <th>Pos</th>
                <th>No</th>
                <th>Piloto</th>
                    <th>Equipo</th>
                    <th>Vueltas</th>
                    <th>Grid</th>
                    <th>Status</th>
                    <th>Puntos</th>
                    </thead>
                    <tbody>`;
    data.MRData.RaceTable.Races[0].Results.forEach(item => {
        // Generar contenido HTML para cada fila de la tabla
        
        tableHTML += `
                    
                           
                        <tr>
                            <td>${item.position}</td>
                            <td>${item.number}</td>
                            <td>${item.Driver.givenName} ${item.Driver.familyName}</td>
                            <td>${item.Constructor.name}</td>
                            <td>${item.laps}</td>
                            <td>${item.grid}</td>
                            <td>${item.status}</td>
                            <td>${item.points}</td>
                        </tr>
                        `;
        
    });
    tableHTML += `</tbody>
        </table>
        `;

    // 3. Insertar contenido HTML en el DOM
    document.getElementById('content').innerHTML = tableHTML;
    })
    .catch(error => {
    console.error('Error al obtener los datos:', error);
    });
}
function cargarPilotos(){
    console.log("cargando pilotos");
    // 1. Realizar solicitud HTTP GET a la API
    fetch('https://ergast.com/api/f1/current/drivers.json')
    .then(response => response.json()) // Convertir respuesta a JSON
    .then(data => {
    // 2. Analizar los datos y generar contenido HTML
    driverJson = '<div id="content-drivers">';
    console.log(data.MRData.DriverTable.Drivers)
    //console.log(data.MRData.RaceTable.Races[0].Results[0]);

    data.MRData.DriverTable.Drivers.forEach(item => {
        // Generar contenido HTML para cada fila de la tabla
        driverJson += `
                        <div class="card">
                            <div class="img-card" id="img${item.permanentNumber}">

                            </div>
                            <div class="content-card">
                                <div class="top-content-card">
                                    <div class="name-card">
                                        <p>${item.givenName} ${item.familyName}</p>
                                    </div>
                                    <div class="img-flag-card">
                                    
                                    </div>
                                </div>
                                <div class="bottom-content-card">
                                    <p> </p>
                                </div>
                            </div>

                        </div>
                        `;
        
    });
    driverJson += `</div>`;

    // 3. Insertar contenido HTML en el DOM
    document.getElementById('content-driver').innerHTML = driverJson;
    })
    .catch(error => {
    console.error('Error al obtener los datos:', error);
    });
    cargarImg();
}

function cargarImg(){
    fetch('https://ergast.com/api/f1/current/drivers.json')
    .then(response => response.json()) // Convertir respuesta a JSON
    .then(data => {
    data.MRData.DriverTable.Drivers.forEach(item => {
        // Generar contenido HTML para cada fila de la tabla
        var div = document.getElementById(`img${item.permanentNumber}`);
  
        // Crear un elemento de imagen
        var imagen = document.createElement('img');
        
        // Establecer el atributo src de la imagen
        imagen.src = `img/drivers/${item.permanentNumber}.jpg`;
        
        // Agregar la imagen al div
        div.appendChild(imagen);
    });
    });
}

function cargarEquipos(){
    console.log("cargando pilotos");
    // 1. Realizar solicitud HTTP GET a la API
    fetch('https://ergast.com/api/f1/current/constructors.json')
    .then(response => response.json()) // Convertir respuesta a JSON
    .then(data => {
    // 2. Analizar los datos y generar contenido HTML
    console.log(data.MRData.ConstructorTable.Constructors)
    //console.log(data.MRData.RaceTable.Races[0].Results[0]);
    data.MRData.ConstructorTable.Constructors.forEach(item => {
        // Generar contenido HTML para cada fila de la tabla
        driverJson += 
        `<div class="card-team">
            <div class="content-card-team">
                <div class="top-content-card">
                    <div class="name-card">
                        <p>${item.name}</p>
                    </div>
                    <div class="img-card-logo" id="img-logo-${item.constructorId}">
                    </div>
                </div>
                <div class="bottom-content-card">
                    <div class="img-card-car" id="img-car-${item.constructorId}">
                    </div>
                </div>
            </div> 
        </div>`;
    });
    // 3. Insertar contenido HTML en el DOM
    document.getElementById('content-teams').innerHTML = driverJson;
    })
    .catch(error => {
    console.error('Error al obtener los datos:', error);
    });
    imgCargarEquipos();
}

function imgCargarEquipos(){
    fetch('https://ergast.com/api/f1/current/constructors.json')
    .then(response => response.json()) // Convertir respuesta a JSON
    .then(data => {
    data.MRData.ConstructorTable.Constructors.forEach(item => {
        // Generar contenido HTML para cada fila de la tabla
        var div = document.getElementById(`img-logo-${item.constructorId}`);
        var div2 = document.getElementById(`img-car-${item.constructorId}`)
        // Crear un elemento de imagen
        var imagen = document.createElement('img');
        var img = document.createElement('img');
        // Establecer el atributo src de la imagen
        imagen.src = `img/logo/${item.constructorId}.png`;
        img.src = `img/car/${item.constructorId}.jpg`
        // Agregar la imagen al div
        div.appendChild(imagen);
        div2.appendChild(img);
    });
    });
}
    
    document.getElementById('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se envíe el formulario por defecto
      
        // Obtener los valores de los campos del formulario
        var name = document.getElementById('name').value;
        var age = document.getElementById('age').value;
      
        // Crear un objeto con los datos del formulario
        var formData = {
          name: name,
          age: age
        };
      
        // Obtener el array existente en el localStorage o crear uno nuevo si no existe
        var data = JSON.parse(localStorage.getItem('formDataArray')) || [];
      
        // Agregar los nuevos datos al array
        data.push(formData);
      
        // Guardar el array actualizado en el localStorage
        localStorage.setItem('formDataArray', JSON.stringify(data));
      

      });
  