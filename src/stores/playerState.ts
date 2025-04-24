import { reactive } from 'vue'

export const playerState = reactive({
  currentTrack: null as null | {
    platform: string
    url: string
    title: string
    desc: string
    thumbnail: string
    audio: string
  }
})


// "platform": "releases",
// "url": "https://soundcloud.com/funspongerecords/1-night-of-the-vampire-talk-talk?in=funspongerecords%2Fsets%2Ffun-sponge-records-2nd-birthday-compilation",
// "title": "Talk Talk",
// "desc": "Night of the Vampire (FSR)",
// "thumbnail": "/img/covers/fs.jpeg",        
// "audio": "https://notv-audio.s3.us-east-1.amazonaws.com/audio/Night+Of+The+Vampire+-+Talk+Talk.mp3"
