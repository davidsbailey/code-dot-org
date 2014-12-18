$(document).ready(function() {
  $(':input').removeAttr('required');

  $('#hoc-survey-form select').selectize({
    plugins: ['fast_click']
  });

  $('#event_country').change(function() {
    if ($(this).val() == 'United States') {
      $('#students-number-ethnicity-wrapper').show();
    } else {
      $('#students-number-ethnicity').val('');
      $('#students-number-ethnicity-wrapper').hide();
    }
  }).triggerHandler('change');

  $('#teacher-how-heard').change(function() {
    if ($.inArray('Other', $(this).val()) > -1) {
      $('#teacher-how-heard-other-wrapper').show();
    } else {
      $('#teacher-how-heard-other').val('');
      $('#teacher-how-heard-other-wrapper').hide();
    }
  }).triggerHandler('change');

  $( "#hoc-survey-form" ).submit(function( event ) {
    surveyFormSubmit();
  });
});

function surveyFormComplete(data)
{
}

function surveyFormError(data)
{
  $('.has-error').removeClass('has-error');

  errors = Object.keys(data.responseJSON);
  errors_count = errors.length;

  for (i = 0; i < errors_count; ++i) {
    error_id = '#' + errors[i].replace(/_/g, '-');
    error_id = error_id.replace(/-[sb]s?$/, '');
    $(error_id).parents('.form-group').addClass('has-error');
  }

  $('#error-message').text('An error occurred. Please check to make sure all required fields have been filled out.').show();
  $("#signup_submit").removeAttr('disabled');

  $('body').scrollTop(0);
  $("#btn-submit").removeAttr('disabled');
  $("#btn-submit").removeClass("button_disabled").addClass("button_enabled");
}

function surveyFormSubmit()
{
  $("#signup_submit").attr('disabled','disabled');

  $.ajax({
    url: "/forms/HocSurvey2014",
    type: "post",
    dataType: "json",
    data: $("#hoc-survey-form").serialize()
  }).done(surveyFormComplete).fail(surveyFormError);

  return false;
}
