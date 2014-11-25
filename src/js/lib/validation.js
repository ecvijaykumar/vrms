var validationRules = (function(){
  var _settings = {
    empty: function(value) {
	console.log("Matchin empty");
      return !(value === undefined || '' === value);
    },
    length: function(value, requiredLength) {
      return (value !== undefined)? (value.length >= requiredLength) : false;
    },
    maxLength: function(value, maxLength) {
      return (value !== undefined) ? (value.length <= maxLength) : false;
    }
  };

  return {
    validate: function(text, rules) {

      // check if a rule matches and passes then try the next rule
      for (var i = 0; i < rules.length; i++) {
	var fn = _settings[rules[i].type];
	if (fn) {
	  if(!fn(text, rules[i].value)) {
	    return rules[i].prompt;
	  }
	}	 
      }
      return '';
    }
  };
  
})();

module.exports=validationRules;

/* 
var Rules = '[\
{ "type": "empty", "prompt": "Please enter your first name"}, \
{ "type": "length", "value": 3,  "prompt": "Name must be more than 3 characters"},\
{  "type": "maxLength", "value": 6,  "prompt": "Name cannot be greather than 6 characters"} \
]';
*/
