import '../view/sprintview/audiocontrols.css';

//*************************AUDIO************************ */

//добавлять  новое аудио **************************************/

const audio = new Audio() ;
export let currentVolume = audio.volume;
export const ticAudio = new Audio(require('../../../assets/audio/clock-ticking-2.mp3'));
export const incorrectAudio = new Audio();
export const correctAudio = new Audio(require('../../../assets/audio/correctanswer.mp3'));
export const wordAudio = new Audio();
export const endRoundAudio = new Audio(require('../../../assets/audio/endround.mp3'))


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
    audio.volume = incorrectAudio.volume = correctAudio.volume = ticAudio.volume = Number(volume.value);
    volume.style.background = `linear-gradient(to right, #24809E 0%, #24809E ${Number(volume.value)*100}%, #808080 ${Number(volume.value)*100}%, #808080 100%)`;
    if (audio.volume === 0) {
        volumeOnOffButton.classList.add('mute');
    } else {
        volumeOnOffButton.classList.remove('mute');
    }
const volumeAudio = new Audio(require('../../../assets/audio/correctanswer.mp3'));

//При создании Нового  добавлять новое аудио в начало выражения  ***************/

volumeAudio.volume  = endRoundAudio.volume = incorrectAudio.volume = correctAudio.volume = wordAudio.volume = audio.volume;
//volumeAudio.play();
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
