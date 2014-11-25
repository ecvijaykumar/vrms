var channel = (function(){
  return {
    postJSON: function (obj, cb) {
      $.ajax({
        url: obj.url,
        dataType: 'json',
        type: 'POST',
        data: obj.data,
        success: function(data) {
          cb(false, data);
        }.bind(this),
        error: function(xhr, status, err) {
          console.log("error");
          console.log(err);
          cb(true, err);
        }.bind(this)
      });
    },
    getJSON: function(obj, cb) {
        $.ajax({
          url: obj.url,
          dataType: 'json',
          data: obj.data,
          success: function(data) {
            cb(false, data);
          },
          error: function(xhr, status, err) {
            console.log(err);
            cb(true, null);
          }
        });
    }
  };
})();

module.exports=channel;
