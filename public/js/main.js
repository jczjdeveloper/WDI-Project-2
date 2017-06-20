$(document).ready(function() {

  /* guest event */
  var createdEvent = [];

  /* Delete Guest */
  function deleteGuest(guestRow){
    $(guestRow).remove();
  }

  /* Create Guest */
  function createGuest(){
        var name = $("input[name='name']").val();
        var email = $("input[name='email']").val();

        // Check input
        if(name.length === 0 ){
          $('.create .name .form-group').addClass('has-error');
          return;
        }
        $('.create .name .form-group').removeClass('has-error');

        if(email.length === 0){
          $('.create .email .form-group').addClass('has-error');
          return;
        }
        $('.create .email .form-group').removeClass('has-error');

        // Setup template
        var tpl = $('#guestRowTpl').html();
        tpl = tpl.replace('{{Name}}', name);
        tpl = tpl.replace('{{Email}}', email);

        // Append the row
        $('#inviteGuestList > div').append(tpl);

        // Clear inputs
        $("input[name='name']").val('');
        $("input[name='email']").val('');
  }

  /* Create Guest Row */
  function createGuestRow(guest){

    // Setup template
    var tpl = $('#guestRowTpl').html();
    tpl = tpl.replace('{{Id}}', guest.id);
    tpl = tpl.replace('{{Name}}', guest.name);
    tpl = tpl.replace('{{Email}}', guest.email);

    // Append the row
    $('#inviteGuestList > div').append(tpl);
  }


  function showCreateForm() {
    $('#editform').modal('show');
    $('#editform').addClass('createForm');
    $('.modal-title').text('Create guest');
    //$('button.submit').text('Create');
  }


  // Show update form */
  function showUpdateForm(guest){
    $('#editform').modal('show');
    $('#editform').addClass('updateForm');

    $('#editform #id').val(guest.id);
    $('#editform #name').val(guest.name);
    $('#editform #email').val(guest.email);

  }

  /* Reset modal */
  function resetModal () {
    $('.updateForm #id').val('');
    $('.updateForm #name').val('');
    $('.updateForm #email').val('');
    $('#editform').removeClass('updateForm');
  }

  // Create guest on server
  function createGuestAjax(){

    var guest = {};
    //guest.id = $('.createForm #id').val();
    guest.name = $('.createForm #name').val();
    guest.email = $('.createForm #email').val();
    console.log(guest )
    $.ajax({
      method: 'POST',
      url: '/dashboard/event',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: JSON.stringify(guest),
      dataType: 'json'
    }).done(function(guest){
      console.log('success!')
          createGuestRow(guest);
          $('[data-id=' + guest.id + ']').hide();
          $('#editform').modal('hide');
          $('[data-id=' + guest.id + ']').fadeIn();
    }).fail(function(){
      console.log('fail')
    });
  }


  // Update guest on server
  function updateGuestAjax() {

      var guest = {};
      guest.id = $('.updateForm #id').val();
      guest.name = $('.updateForm #name').val();
      guest.email = $('.updateForm #email').val();

      $.ajax({
        method: 'PUT',
        url: '/dashboard/event',
        data: guest
      }).done(function(data){
          resetModal();

          // Setup template
          var tpl = $('#guestRowTpl').html();
          tpl = tpl.replace('{{Id}}', guest.id);
          tpl = tpl.replace('{{Name}}', guest.name);
          tpl = tpl.replace('{{Email}}', guest.email);

          // Hide
          $('#editform').modal('hide');

          $('[data-id=' + guest.id + ']').fadeOut(function(){
            $('[data-id=' + guest.id + ']').replaceWith(tpl);
            $('[data-id=' + guest.id + ']').fadeIn();
          });

         //
        //  $('[data-id=' + guest.id + ']').replaceWith(tpl);
        //  $('[data-id=' + guest.id + ']').fadeIn();
      });
  }

  $('#inviteGuestList').on('click', '.delete', function(event){
    var guestRow = $(event.target).parents('.guest')[0];
    deleteGuest(guestRow);
  });

  $('#createbtn').on('click', function(event){
    console.log('clicked on Create!')
    showCreateForm();
  });

  $('#inviteGuestList').on('click', '.update', function(event){
    var guestRow = $(event.target).parents('.guest')[0];
    var id = $(guestRow).data('id');
    var guest = event.find(function(guest){
        return guest.id == id;
    })
    showUpdateForm(guest);
  });

  $('body').on('click', '.updateForm .submit', function(){
      updateGuestAjax();
  })

  $('.submit').on('click', function(){
      console.log('Attempting to create guest...')
      createGuestAjax();
  })

  /* init event */
  $.ajax({
    method: "GET",
    url: '/dashboard/event'
  })
  .done(function( data ) {
      createdEvent = data;
      data.forEach(function(guest){
          createGuestRow(guest);
      });

  });

  $('#editform').on('shown.bs.modal', function () {
    $('#name').focus();
  });

});
