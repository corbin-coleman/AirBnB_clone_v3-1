$(document).ready(function () {
  let amenityDict = {};

  $('li :checkbox').change(function () {
    if (this.checked) {
      amenityDict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenityDict[$(this).attr('data-id')];
    }

    let h4Str = '';
    let count = 0;
    for (let key in amenityDict) {
      if (amenityDict.hasOwnProperty(key)) {
        if (count > 0) {
          h4Str = h4Str.concat(', ');
        }
        h4Str = h4Str.concat(amenityDict[key]);
        count++;
      }
    }

    $('div.amenities h4').text(h4Str);
    $('h4').css({'overflow': 'hidden', 'white-space': 'nowrap',
		 'text-overflow': 'ellipsis', 'height': '100%'});
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', (body) => {
    if (body.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      console.log('No');
      $('div#api_status').removeClass('available');
    }
  });
});
