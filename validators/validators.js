/**
 * @description A function that receives several parameters to perform various validation functions
 * @param {object} data accepts an array of objects with two parameters, namely form_data and form_name
 * @example [{form_data: 'value of a form', form_name: 'form name'}, ]
 */
const FormValidators = function (data) {
  this.data = data;
  this.errors = [];
};

/**
 * @description A validation function to check if the form is filled in
 * @example instance.validateUserInput()
 */
FormValidators.prototype.validateUserInput = function () {
  this.data.forEach((element) => {
    if (element.form_data === "") {
      this.errors.push(`Form ${element.form_name} harus diisi`);
    }
  });
};

/**
 * @description A method to validate input option
 * @param {Array} accepted_value accepts an array of allowed values
 * @param {String} form_data Form data entered by the user
 */
FormValidators.prototype.validateOptionInput = function (
  accepted_value,
  form_data
) {
  if (!accepted_value.includes(form_data))
    this.errors.push("Value Form Option Tidak Sesuai!");
};

module.exports = FormValidators;
