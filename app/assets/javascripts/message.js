$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     let html =
      `
         <div class="chat-main__message-list-user">
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
         <img src=${message.image} >`
     return html;
   } else {
     let html =
      `
         <div class="chat-main__message-list-user">
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
});