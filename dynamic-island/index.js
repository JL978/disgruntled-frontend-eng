const access_token = "BQBkdVz4FSCdXq5UC6rNJHB_EBLW6R-opI98FTJ6eHCEmwsDHP2uihth7gfi-dDyt0oZ_DccoqoF_UkqXgYHBB5-D_PtprN4yy7BFOECWS7qvMSZog_K424lHyw-VR4HMBsBPk1G-kiJ94cKAWhAcUXhJRxy-TUxlMWXB28oGT9-eXxXrjEGwxHBPWfJHzIM0y2qVqZyEfrmN-q5s0-iOSrr"

const play_button = document.querySelector('.play');
const next_button = document.querySelector('.next');
const prev_button = document.querySelector('.prev');
const progressBar = document.querySelector('.progress-bar');

let timer;
let current_time = 0;

const convertMSToMinutes = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(access_token); }
    });

    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { 
        console.log(state); 

        const current_track = state.track_window.current_track;

        const loader = document.querySelector('.loader');

        const img = document.querySelector('.img');
        img.src = current_track.album.images[0].url;

        const title = document.querySelector('.track-title');
        const author = document.querySelector('.track-author');
        
        title.innerHTML = current_track.name;
        author.innerHTML = current_track.artists[0].name;

        const duration = document.querySelector('.time-left');
        duration.innerHTML = convertMSToMinutes(current_track.duration_ms);

        const position = document.querySelector('.time');
        position.innerHTML = convertMSToMinutes(state.position);
        current_time = state.position;
        

        if (timer) {
          clearInterval(timer);
        }

        if (state.paused) {
          loader.classList.add('paused')
          play_button.innerHTML = `<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink="http://www.w3.org/1999/xlink" fill="currentColor" height="15px" width="15px" version="1.1" id="Capa_1" viewBox="0 0 17.804 17.804" xml:space="preserve">
            <g>
              <g id="c98_play">
                <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313    c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04    c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z"/>
              </g>
              <g id="Capa_1_78_">
              </g>
            </g>
            </svg>
            `
        } else {
          timer = setInterval(() => {
            current_time += 1000;
            position.innerHTML = convertMSToMinutes(current_time);
            progressBar.style.width = `${(current_time / current_track.duration_ms) * 100}%`;
          }, 1000);

          loader.classList.remove('paused')
          play_button.innerHTML = `<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 1V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
              <path d="M1 1V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>`
        }
     });

    // Ready
    player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);

        fetch('https://api.spotify.com/v1/me/player/', {
          method: 'PUT',
          body: JSON.stringify({
            device_ids: [device_id],
          }),
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + access_token
          },
        }).then(response => {
            console.log(response)
        })

        // player.getCurrentState().then(state => {
        //   if (!state) {
        //     console.error('User is not playing music through the Web Playback SDK');
        //     return;
        //   }

        //   console.log(state)

        //   var current_track = state.track_window.current_track;

        //   console.log('Currently Playing', current_track);
        // });

    });

    player.connect().then((success) => {
        if (success) {
            console.log('The Web Playback SDK successfully connected to Spotify!');
        }
        
        player.activateElement().then(() => {
          player.getCurrentState().then(state => {
            console.log(state)
          });
        })
        
    })
        
    play_button.addEventListener('click', () => {
          player.togglePlay();
        });

    next_button.addEventListener('click', () => {
      if (timer) {
        clearInterval(timer);
      }
      progressBar.style.width = `0`;
          player.nextTrack();
        })

    prev_button.addEventListener('click', () => {
      if (timer) {
        clearInterval(timer);
      }
        progressBar.style.width = `0`;
          player.previousTrack();
        })
    
  };


(function() {
    function login(callback) {
        var CLIENT_ID = '223b7203083049fda023102760c736f0';
        var REDIRECT_URI = "http://localhost:3000/";
        function getLoginURL(scopes) {
            return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
              '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
              '&scope=' + encodeURIComponent(scopes.join(' ')) +
              '&response_type=token';
        }
        
        var url = getLoginURL([
          // "app-remote-control",
          "streaming",
          "user-read-email",
          "user-read-private",
          // "user-read-playback-state",
          // "user-modify-playback-state",
          // "user-read-currently-playing",
        ]);

        console.log(url)
        
        var width = 450,
            height = 730,
            left = (screen.width / 2) - (width / 2),
            top = (screen.height / 2) - (height / 2);
    
        window.addEventListener("message", function(event) {
            var hash = JSON.parse(event.data);
            if (hash.type == 'access_token') {
                callback(hash.access_token);
            }
        }, false);
        
        var w = window.open(url,
                            'Spotify',
                            'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
                           );
        
    }

  const loginButton = document.getElementById('login');
    
    loginButton.addEventListener('click', function() {
        login(function(accessToken) {
            getUserData(accessToken)
                .then(function(response) {
                    loginButton.style.display = 'none';
                });
            });
    });
    
})();




