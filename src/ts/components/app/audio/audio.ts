import './audio.css';

//*************************AUDIO************************ */
const audio = new Audio();


// audio.volume = Number(volume.value);
let currentVolume = audio.volume = 0.24;



//-----------------------------------------------------------------
export const toggleMute = (): void=> {
    const volumebtn = document.querySelector('.sprint-game-sound-container') as HTMLElement;
    const volume = document.getElementById('volume') as HTMLInputElement;
    volumebtn.onclick = () => {
        if (audio.volume > 0) {
            currentVolume = audio.volume;
            volume.value = '0';
        } else {
            volume.value = `${currentVolume}`;           
        }
        updateVolume();
    }
}
//toggleMute();

export const updateVolume = (): void => {
    const volume = document.getElementById('volume') as HTMLInputElement;
    const volumebtn = document.querySelector('.sprint-game-sound-container') as HTMLElement;
    audio.volume = Number(volume.value);
    volume.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${Number(volume.value)*100}%, #808080 ${Number(volume.value)*100}%, #808080 100%)`;
    if (audio.volume === 0) {
        volumebtn.classList.add('mute');
    } else {
        volumebtn.classList.remove('mute');
    }
audio.src = '../../../../../assets/audio/correctanswer.mp3';
audio.play();
saveSettings();
}

// volume.addEventListener('input', updateVolume);

//----------------------------SET LOCAL STORAGE-------------------------------

const saveSettings = () => {  
    const volume = document.getElementById('volume') as HTMLInputElement;  
        localStorage.setItem('volume', volume.value); 
}

//----------------------------------------------GET LocalStorage------------------
export const getVolumeLocalStorage = (): void => {
    const volume = document.getElementById('volume') as HTMLInputElement;
    try {
        audio.volume = Number(localStorage.getItem('volume'));
        volume.setAttribute('value', `${audio.volume}`)
        volume.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${Number(audio.volume)*100}%, #808080 ${Number(audio.volume)*100}%, #808080 100%)`;              
    } catch (error) {
        // false;
        console.log(error);
    }
};

//window.addEventListener('load', getVolumeLocalStorage);