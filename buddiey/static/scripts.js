$("form[name=signup_form").submit(function(e) {

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();
  
    $.ajax({
      url: "/user/signup",
      type: "POST",
      data: data,
      dataType: "json",
      success: function(resp) {
        window.location.href = "/chat/";
      },
      error: function(resp) {
        $error.text(resp.responseJSON.error).removeClass("error--hidden");
      }
    });
  
    e.preventDefault();
  });
  
  $("form[name=signin_form").submit(function(e) {
  
    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();
  
    $.ajax({
      url: "/user/signin",
      type: "POST",
      data: data,
      dataType: "json",
      success: function(resp) {
        window.location.href = "/chat/";
      },
      error: function(resp) {
        $error.text(resp.responseJSON.error).removeClass("error--hidden");
      }
    });
  
    e.preventDefault();
  });

  $("form[name=chatbox").submit(function(e) {
     
    var $form = $(this);
    var data = $form.serialize();

    $.ajax({
      url: "https://api.buddiey.live/chat/",
      type: "POST",
      data: data,
      dataType: "json",
      success: function(resp) {
        var msg = JSON.parse(resp)
        msg = msg.resp_msg
        
      },
      error: function(resp) {
        console.log('o no if anyding went rong etan must ave rote dis code');
      }
    });

    e.preventDefault();
  });
