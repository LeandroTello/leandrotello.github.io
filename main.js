window.addEventListener("load", main);

function main() {
    const urlParams = getUrlParams();
    const Permiso = Permiso(urlParams);

    let error=false;

    if (esPermiso) {
        
        const Diario = PermisoDiario(urlParams);
            
        const Periodo = PermisoPeriodo(urlParams);

        let list=listAllProperties(urlParams);

        implements(list, urlParams);

        if (Diario) {
           borrarPermisoPeriodo();
        } else if(Periodo) {
            borrarPermisoDiario();
	}
        detalles();
    } else {
        error=true;
    }

    const errorHtml = document.querySelector("#error");
    const success = document.querySelector("#success");

    if(error){
        errorHtml.classList.remove("d-none");
        success.remove();
    }else{
        success.classList.remove("d-none");
        errorHtml.remove();
    }
}

function detalles() {
    document.querySelector("#detalles").classList.remove("d-none");
}

function borrarPermisoDiario() {
    document.querySelector("#motivo").parentElement.parentElement.parentElement.remove();
}

function borrarPermisoPeriodo() {
    document.querySelector("#vehiculo").parentElement.parentElement.parentElement.remove();
    document.querySelector("#vacaciones").parentElement.parentElement.parentElement.remove();
    document.querySelector("#fin").parentElement.remove();
}

function implements(list, urlParams) {
    for (let id of list) {
        let object = document.querySelector("#" + id);
        if (object != null) {
            if (id == "vacaciones") {
                object.textContent = urlParams[id] == "true" ? "Si" : "No";
            } else {
                object.textContent = urlParams[id];
            }
        }
    }
}

/**
 * 
 * @param {string} name 
 * @returns {string} value
 */
function getUrlParamBy(name) {
    const url = location.href;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);
    return results == null ? null : results[1].replaceAll("%20", " ");
}

function booleanToString(bool) {
    return bool == true ? "Si" : "No";
}

/**
 * 
 * @param {any} object 
 * @returns {Array<string>}
 */
function listAllProperties(object) {
    var objectToInspect;
    var result = [];

    for(objectToInspect = object; objectToInspect !== null;
        objectToInspect = Object.getPrototypeOf(objectToInspect)) {
     result = result.concat(
         Object.getOwnPropertyNames(objectToInspect)
     );
 }

     return result;
}


function getUrlParams(){
    return {
        nombre: getUrlParamBy("nombre"),
        apellido: getUrlParamBy("apellido"),
        dni: getUrlParamBy("dni"),
        inicio: getUrlParamBy("inicio"),
        fin: getUrlParamBy("fin"),
        desde: getUrlParamBy("desde"),
        desdeCP: getUrlParamBy("desdeCP"),
        hasta: getUrlParamBy("hasta"),
        hastaCP: getUrlParamBy("hastaCP"),
        motivo: getUrlParamBy("motivo"),
        vacaciones: getUrlParamBy("vacaciones"),
        dominio: getUrlParamBy("dominio"),
        vehiculo: getUrlParamBy("vehiculo"),
    };
}

function Permiso(urlParams){
    return  urlParams.nombre != null &&
    urlParams.apellido != null &&
    urlParams.dni != null &&
    urlParams.inicio != null &&
    urlParams.desde != null &&
    urlParams.desdeCP != null &&
    urlParams.hasta != null &&
    urlParams.hastaCP != null;
}

function PermisoDiario(urlParams){
    return urlParams.fin == null &&
    urlParams.vacaciones == null &&
    urlParams.dominio == null &&
    urlParams.vehiculo == null &&
    urlParams.motivo != null;
}

function PermisoPeriodo(urlParams){
    return urlParams.fin != null &&
    urlParams.vacaciones != null &&
    urlParams.dominio != null &&
    urlParams.vehiculo != null &&
    urlParams.motivo == null;
}