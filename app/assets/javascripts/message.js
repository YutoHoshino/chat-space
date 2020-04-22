$(function(){ 

  let reloadMessages = function() {
    let last_message_id = $('.chat-main__message-list-user:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  function buildHTML(message){
   if ( message.image ) {
     let html =
      `
         <div class="chat-main__message-list-user" data-message-id=${message.id}>
           <div class="chat-main__message-list-user--name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list-user--day">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list--message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image}>
      `
     return html;
   } else {
     let html =
      `
         <div class="chat-main__message-list-user" data-message-id=${message.id}>
           <div class="chat-main__message-list-user--name">
             ${message.user_name}
           </div>
           <div class="chat-main__message-list-user--day">
             ${message.created_at}
           </div>
         </div>
         <div class="chat-main__message-list--message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message-list').append(html);
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    $('form')[0].reset();
    $('.input-box_text').val('');
    $('.submit-btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
    $('form')[0].reset();
    $('.input-box_text').val('');
    $('.submit-btn').prop('disabled', false);
});
})
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});