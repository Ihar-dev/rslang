import './audio.css';

//*************************AUDIO************************ */
const audio = new Audio();
let currentVolume = audio.volume = 0.24;



//--------------------------SOUND ON/OFF----------------------------------
export const toggleMute = (): void=> {
    const volumeOnOffButton = document.querySelector('.sprint-game-sound-container') as HTMLElement;
    const volume = document.getElementById('volume') as HTMLInputElement;
    volumeOnOffButton.onclick = () => {
        if (audio.volume > 0) {
            currentVolume = audio.volume;
            volume.value = '0';
        } else {
            volume.value = `${currentVolume}`;           
        }
        updateVolume();
    }
}
//----------------CHANGE VOLUME----------------------------------

export const updateVolume = (): void => {
    const volume = document.getElementById('volume') as HTMLInputElement;
    const volumeOnOffButton = document.querySelector('.sprint-game-sound-container') as HTMLElement;
    audio.volume = Number(volume.value);
    volume.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${Number(volume.value)*100}%, #808080 ${Number(volume.value)*100}%, #808080 100%)`;
    if (audio.volume === 0) {
        volumeOnOffButton.classList.add('mute');
    } else {
        volumeOnOffButton.classList.remove('mute');
    }
audio.src = '../../../../assets/audio/correctanswer.mp3';
audio.play();
saveSettings();
}

//----------------------------SET LOCAL STORAGE--VOLUME-----------------------------

const saveSettings = () => {  
    const volume = document.getElementById('volume') as HTMLInputElement;  
        localStorage.setItem('volume', volume.value); 
}

//----------------------------------------------GET LocalStorage---VOLUME---------------
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
    toggleMute();
    volume.addEventListener('input', updateVolume);  
};