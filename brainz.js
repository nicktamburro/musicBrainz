//so biggest thing is we have to sort through this data, it's a huge set of objects within
//objects, and we just have to pare it down

const mb = require('musicbrainz');

//LOOK UP RELEASE BY... what? ID?
//and we need to get body-parser, and probably some json middleware in here...
  
/*mb.lookupRelease('d7b3dde9-d672-4e01-a6b4-9de5cf12bf7a', ['artists'], function (error, release) {
    console.log(release);
});*/

//so this above is the id that our song/artist search below gave us, but when I try to use that
//for search, we get undefined
/*mb.lookup('171305ad-1245-474f-8ac0-9bad28e8fdf0', ['artists'], function (error, release) {
	console.log(release);
});*/

//SEARCH ARTIST

/*mb.searchArtists('Nirvana', {}, function(err, artists){
    console.log(artists);
});/*/

//SEARCH RECORDING (= search song?) , and narrow it down inside the curly braces


//SO this whole thing would go inside a loop, or a function?
//so we can plug in title and artist from the big array  (or I mean really from the database would be better,
//but this way would be okay for now)

mb.searchRecordings('Ya Mama', { artist: 'The Pharcyde' }, function(err, recordings){

    for(i=0; i<recordings.length; i++){
        //console.log(i + ": " + JSON.stringify(recordings[i]));
        console.log(i + ": " + recordings[i].title + " : " + recordings[i].id);
    }
//getting closer...
//NEXT we need to bring in the list of titles and artists from the spreadsheet,
//and then write code to feed them all into the loop... this will take a while. 





     //console.log(recordings);
 });

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