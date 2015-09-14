// Helper function to add an event listener
function addEvent (el, event, callback) {
  if ('addEventListener' in el) {                  // If addEventListener works
    el.addEventListener(event, callback, false);   // Use it
  } else {                                         // Otherwise
    el['e' + event + callback] = callback;         // CreateIE fallback
    el[event + callback] = function () {
      el['e' + event + callback](window.event);
    };
    el.attachEvent('on' + event, el[event + callback]);
  }
}


(function () {

var form = document.getElementById('contact');

addEvent(form,'submit', function(e){
    var email = $('#demo-email');
    var name =  $('#demo-name');
    var text = document.getElementById('demo-message').value;
    
    e.preventDefault();
    var elements = this.elements;
    var msg = 'Thanks for your message!!';
    document.getElementById('contact').textContent = msg;

  $.ajax({
  type: "POST",
  url: "https://mandrillapp.com/api/1.0/messages/send.json",
  data: {
    'key': 'tIbpM5IzFKb7ajl8YE7XmQ',
    'message': {
      'from_email': email.val(),
      'from_name':  name.val(),
      'to': [
          {
            'email': 'abiam222@gmail.com',
            'name':   'Abiam Velazquez',
            'type': 'to'
          }
        ],
      'autotext': 'true',
      'subject': 'FROM KoK',
      'html': text
    }
  }
 }).done(function(response) {
  // console.log(response); // if you're into that sorta thing
  });//end of ajax call
 });//end addEvent 
}());//end anonymous function


