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

module.exports = FormValidators;
