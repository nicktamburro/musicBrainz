const mb = require('musicbrainz');

//LOOK UP RELEASE BY... what? ID?
  
mb.lookupRelease('283821f3-522a-45ca-a669-d74d0b4fb93a', ['artists'], function (error, release) {
    console.log(release);
});

//SEARCH ARTIST

mb.searchArtists('Nirvana', {}, function(err, artists){
    console.log(artists);
});

//SEARCH RECORDING (= search song?) , and narrow it down inside the curly braces

mb.searchRecordings('Amen, Brother', { artist: 'The Winstons' }, function(err, recordings){
    console.log(recordings);
});

//SEARCH RELEASES
//so the parameters to narrow it down go in the {}'s, we still have to pare down all the data we get
*mb.searchReleases('Elephant', { country: 'US', artist: 'The White Stripes' }, function(err, releases){
    console.log(releases);
});