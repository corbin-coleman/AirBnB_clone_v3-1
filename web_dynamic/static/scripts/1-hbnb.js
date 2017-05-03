$(document).ready(function () {
  var amenityDict = {};

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
        console.log(key);
        console.log(amenityDict[key]);
        console.log(count);
        if (count > 0) {
          h4Str = h4Str.concat(', ');
        }
        h4Str = h4Str.concat(amenityDict[key]);
        count++;
      }
    }

    console.log('Text');
    console.log(h4Str);
    $('div.amenities h4').text(h4Str);
    $('h4').css({'overflow': 'hidden', 'white-space': 'nowrap',
		 'text-overflow': 'ellipsis', 'height': '100%'});
  });
});
