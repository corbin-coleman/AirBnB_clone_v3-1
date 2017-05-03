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
    $('h4').css({'overflow': 'hidden',
      'white-space': 'nowrap',
      'text-overflow': 'ellipsis',
      'height': '100%'});
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', (body) => {
    if (body.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      console.log('No');
      $('div#api_status').removeClass('available');
    }
  });

  search();
  $('button').click(() => {
    let amenityList = [];
    let index = 0;
    let searchDict = {};
    for (key in amenityDict) {
      amenityList[index] = key;
      index++;
    }
    searchDict['amenities'] = amenityList;
    search(searchDict);
  });
});

function search(search_for={}) {
  searching = JSON.stringify(search_for);
  $.ajaxSetup({contentType: 'application/json'});

  $.post('http://0.0.0.0:5001/api/v1/places_search/', searching, (data, status) => {
    for (let i in data) {
      $('section.places').prepend('<article><div class="price_by_night"></div><h2></h2><div class="informations"><div class="max_guest"></div><div class="number_rooms"></div><div class="number_bathrooms"></div></div><div class="description"></div></article>');
      $('section.places h2').first().text(data[i].name);
      $('.price_by_night').first().text(data[i].price_by_night);
      $('.max_guest').first().text(data[i].max_guest + ' Guests');
      $('.number_rooms').first().text(data[i].number_rooms + ' Rooms');
      $('.number_bathrooms').first().text(data[i].number_bathrooms + ' Bathrooms');
      $('.description').first().text(data[i].description);
    }
  });
}
