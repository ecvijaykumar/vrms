
/* Singleton object */
var globals = (function(){
  var flashMessage = "";
  var username = undefined;
  var logged_in = false;
  var flashError = false;
  return {
    isLoggedIn: function() {
      return logged_in;
    },
    setUserName: function(_username) {
      username = _username;
      logged_in = true;
    },
    getUserName: function() {
      return username;
    },
    setFlash: function(obj) {
      flashError = obj.error;
      flashMessage = obj.message;
    },
    getFlash: function() {
      return ({error: flashError,
               message: flashMessage
              });
    }
  };
})();

module.exports=globals;
