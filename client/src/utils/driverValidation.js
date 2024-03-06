const MAX_FORENAME_LENGTH = 15;
const MAX_SURNAME_LENGTH = 15;
const MAX_NATIONALITY_LENGTH = 25;

function driverValidation(input) {
  const errors = {};
  const regexAlphabetic = new RegExp(/^[a-zA-Z]+$/);

  if (!input.forename.length) {
    errors.forename = "Ingrese el nombre del conductor";
  } else {
    if (!regexAlphabetic.test(input.forename)) {
      errors.forename = "No debe contener números ni caracteres especiales";
    }
    if (input.forename.length > MAX_FORENAME_LENGTH) {
      errors.forename = `Debe ser menor a ${MAX_FORENAME_LENGTH} caracteres`;
    }
  }
//////////////////////////////////////////////////////////////////////////////
  if (!input.surname.length) {
    errors.surname = "Ingrese el apellido del conductor";
  } else {
    if (!regexAlphabetic.test(input.surname)) {
      errors.surname = "No debe contener números ni caracteres especiales";
    }
    if (input.surname.length > MAX_SURNAME_LENGTH) {
      errors.surname = `No mayor a ${MAX_SURNAME_LENGTH} caracteres`;
    }
  }
////////////////////////////////////////////////////////////////////////////////
  if (!input.nationality.length) {
    errors.nationality = "Ingrese la nacionalidad del conductor";
  } else {
    if (!regexAlphabetic.test(input.nationality)) {
      errors.nationality = "No debe contener números ni caracteres especiales";
    }
    if (input.nationality.length > MAX_NATIONALITY_LENGTH) {
      errors.nationality = `No mayor a ${MAX_NATIONALITY_LENGTH} caracteres`;
    }
  }
///////////////////////////////////////////////////////////////////////////////////  
  const currentDate = new Date()
  console.log(currentDate)
  const selectedDate = new Date(input.dob)
  console.log(selectedDate)
  const ageIndays = Math.floor((currentDate - selectedDate) / (24*60*60*1000))
  console.log(ageIndays) 
  if(ageIndays < 18*365){
        errors.dob = "El conductor debe ser mayor de edad"
    }
  
////////////////////////////////////////////////////////////////////////////////
  return errors;
}

export default driverValidation;