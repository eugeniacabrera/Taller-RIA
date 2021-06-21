import axios from "axios";

const RegistrarEstudiante = async (Estudiante: object) => {
    
    var data = Estudiante;
    console.log('data: ', data);
    
    await axios.post('https://ldgr1.cristianbauza.com/api/Estudiantes',
    
        data 
    
    ).
    then(function (response) {
        // handle success
        return response;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

const CargarEstudiantes = async () => {
    var res = []
    await axios.get('https://ldgr1.cristianbauza.com/api/Estudiantes')
      .then(function (response) {
        // handle success
        res = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

      // aplicar logica para obtener sus estudiantes, no todos.

  return res
}

const EditarEstudiante = async (Id: number) => {
    
    var id = Id;
    console.log('id: ', id);
    
    await axios.put('https://ldgr1.cristianbauza.com/api/Estudiantes/'+`${id}`
    ).
    then(function (response) {
        // handle success
        return response;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}

const EliminarEstudiante = async (Id: number) => {
    
    
    var id = Id;
    console.log('id: ', id);
    
    await axios.delete('https://ldgr1.cristianbauza.com/api/Estudiantes/'+`${id}` 
    ).
    then(function (response) {
        // handle success
        return response;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });
}


export {
    CargarEstudiantes, RegistrarEstudiante, EliminarEstudiante, EditarEstudiante
}