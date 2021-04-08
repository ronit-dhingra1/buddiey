$("form[name=signup_form").submit(function(e) {

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();
  
    $.ajax({
      url: "/auth/signup",
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
      url: "/auth/signin",
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
      url: "/",
      type: "POST",
      data: data,
      dataType: "json",
      success: function(resp) {
        var respString = JSON.stringify(resp);
        var input = JSON.parse(respString);
        console.log(input);
        var sentiment = input.sentiment;
        console.log(sentiment);
        pass_values(sentiment)
      },
      error: function(resp) {
        console.log(`Something went wrong, error: ${resp.responseJSON.error}`);
      }
    });

    e.preventDefault();
  });

function pass_values(sentiment) {
  $.ajax({
    type:'POST',
    dataType:'json',
    url: '/pass_sentiment?value='+sentiment,
    success:function(resp) {
      var reply = resp.reply;
      if(reply=="success") {
        return;
      }
      else {
        alert("Something went wrong with the app, sorry for the inconvenience")
      }
    }
  })
}

/*
$('form[name=chatbox').submit(function(e) {
  var $form = $(this);
  var data = $form.serialize();
  
  $.ajax({
    url: '/user/chat/sentiment',
    type: 'POST',
    data: data,
    dataType: 'json',
    success:function(resp) {
      console.log('Yay it works!');
    },
    error:function(resp) {
      console.log(`Error: ${resp.responseJSON.error}`);
    }
  });

  e.preventDefault();
});
*/