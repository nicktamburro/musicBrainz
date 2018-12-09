const fs = require('fs');
const mb = require('musicbrainz');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------
//above is just to get the Google Sheets API working, here starts our stuff:
//-------------------------------------------------------------------------------
//-------------------------------------------------------------------------------

let newArray = [];

//Here is what we change... 
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1RrySjT_gzBzMs5gDTPN-J66dD9RPCI-p3Jgg14uMCVU',
    range: 'C2:L',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;

    if (rows.length) {

 //HERE's where we're actually pulling the data:       
      rows.map((row)=>{
          newArray.push({artist: row[0], date: row[2], title: row[9]});
      });
    } else {
      console.log('No spreadsheet data found.');
    }
    //console.log(newArray);
    getIDs(newArray);
  });
}

//now we make a function to query MB
//
//something's off here...
function getIDs(songs){
  if(songs.length){

//last thing we do is take of the loop limits
    for(i=0 ; i < 15; i++){

//now we need to
//1. verify that the IDs we're getting are legit
//2. put them into a DB
    mb.searchRecordings(songs[i].title, { artist: songs[i].artist }, function(err, recordings){

//just verify that the relationships between newArray[i] and recordings[i] actually match
      for(i=0; i<recordings.length; i++){
        console.log(i + ". Title: " + newArray[i].title + " Artist: " + 
        newArray[i].artist + " ID: " + recordings[i].id);
      }
    });
    }
  }else{
    console.log("No song data found.");
  }
}
  