const mb = require('musicbrainz');
/*
mb.lookupRelease('283821f3-522a-45ca-a669-d74d0b4fb93a', ['artists'], function (error, release) {
    console.log(release);
});*/

/*mb.searchArtists('The White Stripes', {}, function(err, artists){
    console.log(artists);
});*/
/*mb.searchRecordings('Seven Nation Army', { artist: 'The White Stripes' }, function(err, recordings){
    console.log(recordings);
});*/
mb.searchReleases('Elephant', { country: 'US' }, function(err, releases){
    console.log(releases);
});