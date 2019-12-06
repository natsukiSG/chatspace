$(function(){
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('message_id');
    console.log(last_message_id);
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages)
      var insertHTML = '';
        messages.forEach(function (message){
        insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
      });
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    // .fail(function() {
    //   alert("メッセージ送信に失敗しました");
    // });
  };
  
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="message" data-message_id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message_id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="message" data-message_id=` + message.id + `>` +
        `<div class="upper-message">` +
          `<div class="upper-message__user-name">` +
            message.name +
          `</div>` +
          `<div class="upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };


$('#new_message').on('submit', function(e){

  e.preventDefault()
  
  var formData = new FormData(this);
  var url = $(this).attr('action')
  $.ajax({
    url: url,  
    type: 'POST',  
    data: formData,  
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);
    $('.new_message')[0].reset();
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    
    
    $('.submit-btn').prop('disabled', false);
  })
  .fail(function(data) {
      alert("メッセージ送信に失敗しました");
      $('.submit-btn').prop('disabled', false);
  })
})
setInterval(reloadMessages, 3000);
});