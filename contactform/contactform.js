jQuery(document).ready(function($) {
  "use strict";

  //Contact
  $('form.contactForm').submit(function() {
    $(':input[type="submit"]').prop('disabled', true);

    var f = $(this).find('.form-group'),
      ferror = false,
      emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

    f.children('input').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;

          case 'email':
            if (!emailExp.test(i.val())) {
              ferror = ierror = true;
            }
            break;

          case 'checked':
            if (! i.is(':checked')) {
              ferror = ierror = true;
            }
            break;

          case 'regexp':
            exp = new RegExp(exp);
            if (!exp.test(i.val())) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
    f.children('textarea').each(function() { // run all inputs

      var i = $(this); // current input
      var rule = i.attr('data-rule');

      if (rule !== undefined) {
        var ierror = false; // error flag for current input
        var pos = rule.indexOf(':', 0);
        if (pos >= 0) {
          var exp = rule.substr(pos + 1, rule.length);
          rule = rule.substr(0, pos);
        } else {
          rule = rule.substr(pos + 1, rule.length);
        }

        switch (rule) {
          case 'required':
            if (i.val() === '') {
              ferror = ierror = true;
            }
            break;

          case 'minlen':
            if (i.val().length < parseInt(exp)) {
              ferror = ierror = true;
            }
            break;
        }
        i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
      }
    });
  
    if (ferror) {
      $(':input[type="submit"]').prop('disabled', false);
      return false;
    }
    
   /*  else var str = $(this).serialize();
    var action = $(this).attr('action');
    if( ! action ) {
      action = 'contactform/contactform.php';
    } */
/*     $("#sendmessage").addClass("show");
    $("#errormessage").removeClass("show");
    $('.contactForm').find("input, textarea").val("");
    $('#sendmessage').show(500);
    $('#sendmessage').hide(5000); */

    const serviceID = 'service_owsu7zj';
    const templateID = 'template_rqmn4zo';
    $('#text-send-email').html('Enviando mensaje...');

    emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        $('#text-send-email').html('Enviar mensaje');
        $('.contactForm').find("input, textarea").val("");
        $("#sendmessage").addClass("show");
        $("#errormessage").removeClass("show");
        $(':input[type="submit"]').prop('disabled', false);
      }, (err) => {
        $('#text-send-email').html('Enviar mensaje');
        $("#sendmessage").removeClass("show");
        $("#errormessage").addClass("show");
        $('#errormessage').html(msg);
        $(':input[type="submit"]').prop('disabled', false);
        alert(JSON.stringify(err));
    });

   /*  $.ajax({
      type: "POST",
      url: action,
      data: str,
      success: function(msg) {
        // alert(msg);
        if (msg == 'OK') {
          $("#sendmessage").addClass("show");
          $("#errormessage").removeClass("show");
          $('.contactForm').find("input, textarea").val("");
        } else {
          $("#sendmessage").removeClass("show");
          $("#errormessage").addClass("show");
          $('#errormessage').html(msg);
        }

      }
    }); */
    return false;
  });

});
