(function() {
 loadOptions();
 buttonHandler();
})();

function buttonHandler() {
 var $submitButton = $('#submitButton');

 $submitButton.on('click', function() {
//  console.log('Submit');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to + encodeURIComponent(JSON.stringify(getAndStoreConfigData()));
 });

 var $cancelButton = $('#cancelButton');

 $cancelButton.on('click', function() {
 //  console.log('Cancel');
  var return_to = getQueryParam('return_to', 'pebblejs://close#');
  document.location = return_to;
 });
}

// Radio control for selecting presets or color choice
var $presetValue;

$("input[name=presetRadio]").change(function () {
 $presetValue = parseInt(this.value);
});

$("input[name=presetRadio]").on('click', function() {
 var $presetCheck = parseInt(this.value);
// console.log('$presetCheck: ' + $presetCheck);
 if ($presetCheck > 0) {
//    document.getElementById("cont2").style.visibility="hidden";
    document.getElementById("cont2").style.display="none";
 } else {
//    document.getElementById("cont2").style.visibility="visible"; 
    document.getElementById("cont2").style.display="block";
 }
});

function loadOptions() {
 var $hourColorPicker = $('#hourColorPicker');
 var $min5ColorPicker = $('#min5ColorPicker');
 var $minColorPicker = $('#minColorPicker');
 
 if (localStorage.preset) {
  $presetValue = localStorage.preset;
//  console.log('localStorage.preset: ' + $presetValue);
  // setting radio' value
  $("input[name=presetRadio][value='" + $presetValue + "']").attr('checked', 'checked');
 } else {
  $presetValue = 0;
//  console.log('localStorage.preset was undefined, now set to: ' + $presetValue);
  $("input[name=presetRadio][value='" + $presetValue + "']").attr('checked', 'checked');
 }

 if (localStorage.hourColor) {
  $hourColorPicker[0].value = localStorage.hourColor;
 }
 if (localStorage.min5Color) {
  $min5ColorPicker[0].value = localStorage.min5Color;
 }
 if (localStorage.minColor) {
  $minColorPicker[0].value = localStorage.minColor;
 }

// console.log('in loadOptions() $presetValue: ' + $presetValue);

 if ($presetValue > 0) {
//    document.getElementById("cont2").style.visibility="hidden";
    document.getElementById("cont2").style.display="none";
 } else {
//    document.getElementById("cont2").style.visibility="visible"; 
    document.getElementById("cont2").style.display="block";
 }

 var $invertCheckbox = $('#invertCheckbox');
 if (localStorage.invert) {
  $invertCheckbox[0].checked = localStorage.invert === 'true';
 }
 
 var $hidePMCheckbox = $('#hidePMCheckbox');
 if (localStorage.hidePM) {
  $hidePMCheckbox[0].checked = localStorage.hidePM === 'true';
 }
 
} 

function getAndStoreConfigData() {
 var $hourColorPicker = $('#hourColorPicker');
 var $min5ColorPicker = $('#min5ColorPicker');
 var $minColorPicker = $('#minColorPicker');

// console.log('presetRadio value: ' + $presetValue)

 var $invertCheckbox = $('#invertCheckbox');
 var $hidePMCheckbox = $('#hidePMCheckbox');

 var options = {
  invert: $invertCheckbox[0].checked,
  hourColor: $hourColorPicker.val(),
  min5Color: $min5ColorPicker.val(),
  minColor: $minColorPicker.val(),
  preset: $presetValue,
  hidePM: $hidePMCheckbox[0].checked
 };
 
 console.log('Got options: ' + JSON.stringify(options));

 localStorage.invert = options.invert;
 localStorage.hourColor = options.hourColor;
 localStorage.min5Color = options.min5Color;
 localStorage.minColor = options.minColor;
 localStorage.preset = $presetValue;
 localStorage.hidePM = options.hidePM;

 return options;
}

function getQueryParam(variable, defaultValue) {
 var query = location.search.substring(1);
 var vars = query.split('&');
 for (var i = 0; i < vars.length; i++) {
  var pair = vars[i].split('=');
  if (pair[0] === variable) {
   return decodeURIComponent(pair[1]);
  }
 }
 return defaultValue || false;
}
