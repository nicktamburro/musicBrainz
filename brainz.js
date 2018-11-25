//so biggest thing is we have to sort through this data, it's a huge set of objects within
//objects, and we just have to pare it down

const mb = require('musicbrainz');

//LOOK UP RELEASE BY... what? ID?
//and we need to get body-parser, and probably some json middleware in here...
  
mb.lookupRelease('7d7eac5a-a0fc-4a2e-86c5-e8be0b85184e', ['artists'], function (error, release) {
    console.log(release);
});

//SEARCH ARTIST

/*mb.searchArtists('Nirvana', {}, function(err, artists){
    console.log(artists);
});/*/

//SEARCH RECORDING (= search song?) , and narrow it down inside the curly braces

/*mb.searchRecordings('100 mph', { artist: 'Meyhem Lauren' }, function(err, recordings){
     console.log(recordings);
 });*/

//SEARCH RELEASES
//so the parameters to narrow it down go in the {}'s, we still have to pare down all the data we get
// mb.searchReleases('Elephant', { country: 'US', artist: 'The White Stripes' }, function(err, releases){
//     console.log(releases);
// });

//AND THEN, after we've established a musicBrainz ID, we pass it to acoustic brainz, to get
//more data... like

//function getAcousticBrainz(musicBrainzID){

//then write our API call here... 

//GET https://acousticbrainz.org/api/v1/96685213-a25c-4678-9a13-abd9ec81cf35/low-level
   //GET https://acousticbrainz.org/api/v1/96685213-a25c-4678-9a13-abd9ec81cf35/high-level
//}