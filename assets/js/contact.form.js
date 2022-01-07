

(function($) {
    'use strict';
    // Get the form.
    var form = $('#contact-form');

    // Get the messages div.
    var formMessages = $('#form-messages');

    // Set up an event listener for the contact form.
    $(form).submit(function(e) {
        // Stop the browser from submitting the form.
        e.preventDefault();

        // Serialize the form data.
        var formData = $(form).serialize();

        // Submit the form using AJAX.
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            // Make sure that the formMessages div has the 'success' class.
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');
            $(formMessages).addClass('green_msg');
            
            var thank = $(response).find('h1:first')[0].outerHTML;
            var msg = $(response).find('p:first')[0].outerHTML;
            
            //alert(msg);
            
            var middle_msg = msg.replace("<p class=\"card-p\">","");
            var temp_msg = middle_msg.replace("</p>","");
            var final_msg = temp_msg.replace("<p>","");
            //alert(final_msg);
            // Set the message text.
            $(formMessages).text(final_msg);

            // Clear the form.
            $('#name, #email, #phone, #subject, #website, #message').val('');
        })
        .fail(function(data) {
            // Make sure that the formMessages div has the 'error' class.
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');
            $(formMessages).removeClass('green_msg');
            $(formMessages).addClass('red_msg');

            // Set the message text.
            if (data.responseText !== '') {
                
                var msg = $(data.responseText).find('p:first')[0].outerHTML;
                var temp_msg = msg.replace("</p>","");
                var final_msg = temp_msg.replace("<p>","");
                $(formMessages).text(final_msg);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });

})(jQuery);
