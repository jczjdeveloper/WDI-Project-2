$(document).ready(function() {

  /* EVENT CREATION */
  var createdEvent = [];
  var id;
  /* Delete Event */
  function deleteEvent(eventRow){
    $(eventRow).remove();
  }

  /* Create Event */
  function createEvent(){
        var name = $("input[name='name']").val();
        var description = $("input[name='description']").val();
        var date = $("input[name='date']").val();
        var location = $("input[name='location']").val();
        var time = $("input[name='time']").val();

        // Check input
        if(name.length === 0 ){
          $('.create .name .form-group').addClass('has-error');
          return;
        }
        $('.create .name .form-group').removeClass('has-error');

        if(description.length === 0){
          $('.create .description .form-group').addClass('has-error');
          return;
        }
        $('.create .description .form-group').removeClass('has-error');

        if(date.length === 0){
          $('.create .date .form-group').addClass('has-error');
          return;
        }
        $('.create .date .form-group').removeClass('has-error');

        if(location.length === 0){
          $('.create .location .form-group').addClass('has-error');
          return;
        }
        $('.create .location .form-group').removeClass('has-error');

        if(time.length === 0){
          $('.create .time .form-group').addClass('has-error');
          return;
        }
        $('.create .time .form-group').removeClass('has-error');

        // Setup template
        var tpl = $('#eventRowTpl').html();
        tpl = tpl.replace('{{eventName}}', name);
        tpl = tpl.replace('{{eventDescription}}', description);
        tpl = tpl.replace('{{eventDate}}', date);
        tpl = tpl.replace('{{eventLocation}}', location);
        tpl = tpl.replace('{{eventTime}}', timestart);

        // Append the row
        $('#createdEventList > div').append(tpl);

        // Clear inputs
        $("input[name='name']").val('');
        $("input[name='description']").val('');
        $("input[name='date']").val('');
        $("input[name='location']").val('');
        $("input[name='time']").val('');
  }

  /* Create Event Row */
  function createEventRow(newEvent){

    // Setup template
    var tpl = $('#eventRowTpl').html();
    tpl = tpl.replace('{{Id}}', newEvent.id);
    tpl = tpl.replace('{{eventName}}', newEvent.name);
    tpl = tpl.replace('{{eventDescription}}', newEvent.description);
    tpl = tpl.replace('{{eventDate}}', newEvent.date);
    tpl = tpl.replace('{{eventLocation}}', newEvent.location);
    tpl = tpl.replace('{{eventTime}}', newEvent.timestart);

    // Append the row
    $('#createdEventList > div').append(tpl);
  }

// Show create form
  function showCreateForm() {
    $('#createform').modal('show');
    $('#createform').addClass('createForm');
    // $('.modal-title').text('Create event');
  }


  // Show update form */
  function showUpdateForm(id){
    console.log('clicked update!');
    $('#updateform').modal('show');
    $('#updateform').addClass('updateForm');

    // Get id of clicked event to update
    var id = id// event id
    // Use id to retrieve event details
    $.ajax({
      method: 'GET',
      url: '/dashboard/Event/' + id
    }).done(function(data){
      console.log('get request success')
      $('.updateForm #eventUpdateName').val(data.name);
      $('.updateForm #eventUpdateDescription').val(data.description);
      $('.updateForm #eventUpdateDate').val(data.date);
      $('.updateForm #eventUpdateLocation').val(data.location);
      $('.updateForm #eventUpdateTime').val(data.timestart);
    })
  }

  /* Reset modal */
  function resetModal () {
    $('.updateForm #id').val('');
    $('.updateForm #eventName').val('');
    $('.updateForm #eventDescription').val('');
    $('.updateForm #eventDate').val('');
    $('.updateForm #eventLocation').val('');
    $('.updateForm #eventTime').val('');
    $('#editform').removeClass('updateForm');
  }

  // Create new event on server
  function createEventAjax(){

    var newEvent = {};
    newEvent.name = $('.createForm #eventName').val();
    newEvent.description = $('.createForm #eventDescription').val();
    newEvent.date = $('.createForm #eventDate').val();
    newEvent.location = $('.createForm #eventLocation').val();
    newEvent.timestart = $('.createForm #eventTime').val();

    $.ajax({
      method: 'POST',
      url: '/dashboard/Event',
      headers: {
        'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
      },
      data: newEvent
      //dataType: 'json'
    }).done(function(newEvent){
      console.log('success!');
          //createEventRow(newEvent);

          // $('[data-id=' + newEvent.id + ']').hide();
          $('#createform').modal('hide').done(setTimeout(location.reload(), 4000));
          resetModal();
          // $('[data-id=' + newEvent.id + ']').fadeIn();
          // Reset modal after creating
          // $('.createForm #eventName').val('');
          // $('.createForm #eventDescription').val('');
          // $('.createForm #eventDate').val('');
          // $('.createForm #eventLocation').val('');
          // $('.createForm #eventTime').val('');

          //setTimeout(location.reload(), 4000)
    }).fail(function(){
      console.error()
    });
  }


  // Update created Events on server
  function updateEventAjax(id) {
    // get form inputs
    var id = id
    console.log(id)
    var newEvent = {};
    newEvent.name = $('.updateForm #eventUpdateName').val();
    newEvent.description = $('.updateForm #eventUpdateDescription').val();
    newEvent.date = $('.updateForm #eventUpdateDate').val();
    newEvent.location = $('.updateForm #eventUpdateLocation').val();
    newEvent.timestart = $('.updateForm #eventUpdateTime').val();
    console.log(newEvent)
    // update event
      $.ajax({
        method: 'PUT',
        url: '/dashboard/event/' + id,
        headers: {
          'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: newEvent
      })
      .done(function(data){

          //resetModal();
          $('#editform').modal('hide').done(setTimeout(location.reload(), 4000));
          resetModal();
          //location.reload();
          //res.redirect('/dashboard/event');
          // Hide
          //$('#editform').modal('hide');
          });

        //  $('[data-id=' + guest.id + ']').replaceWith(tpl);
        //  $('[data-id=' + guest.id + ']').fadeIn();
  }


/* ATTACH EVENT LISTENERS */

// DELETE BUTTON AFTER CREATION
  $('#createdEventList').on('click', '.delete', function(event){
    var eventRow = $(event.target).parents('.event')[0];
    deleteEvent(eventRow);
  });

// CREATE BUTTON
  $('#createEventBtn').on('click', function(event){
    console.log('clicked on Create!')
    showCreateForm();
  });

  $('.updateEventBtn').on('click', function(event){
    console.log('clicked on Create!')
    id = $(event.target).parents('.eventItemRow').find('.hidden').text()
    console.log(id)
    showUpdateForm(id);
  });

// UPDATE BUTTON AFTER CREATION
  // $('#createdEventList').on('click', '.update', function(event){
  //   var eventRow = $(event.target).parents('.event')[0];
  //   var id = $(eventRow).data('id');
  //   var event = createdEvent.find(function(event){
  //       return event.id == id;
  //   })
  //   showUpdateForm(event);
  // });

  // $('body').on('click', '.updateForm .submit', function(){
  //     updateEventAjax();
  // })

  $('#createEvent').on('click', function(){
      console.log('Attempting to create event...')
      createEventAjax();
  })

  $('#updateEvent').on('click', function(){
      console.log('Attempting to update event...')
      updateEventAjax(id);
  })

  /* init event */
  $.ajax({
    method: "GET",
    url: '/dashboard/Event'
  })
  .done()
  // {
      //
      // createdEvent = data;
      // console.log(createdEvent);
      // data.forEach(function(guest){
      //     createGuestRow(guest);
      // });
  // });

  $('#editform').on('shown.bs.modal', function () {
    $('#name').focus();
  });

});
