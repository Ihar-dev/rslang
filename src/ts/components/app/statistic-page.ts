import StatisticRender from "../view/statistics/statistic-render";
import '../view/statistics/statistics.css';
import {Statistics, statisticsType} from './statistics';



class RenderStatistic {
    
    renderStatisticPage = async()=> {
      const page: HTMLElement = document.querySelector('.page-container') as HTMLElement;
      page.innerHTML = await StatisticRender.render();
      this.selectFullStatistic();

    }

    private selectFullStatistic =() => {
      const fullStatisticButton: HTMLElement = document.querySelector('.full-statistic-button') as HTMLElement;
      const dayStatisticButton: HTMLElement = document.querySelector('.day-statistic-button') as HTMLElement;
      const fullStatisticContainer: HTMLElement = document.querySelector('.full-statistic-container') as HTMLElement;
      fullStatisticButton.addEventListener('click', ()=>{
        fullStatisticContainer.classList.toggle('off');
        fullStatisticButton.classList.toggle('statistic-button-active');
        dayStatisticButton.classList.toggle('statistic-button-active');
      });
      dayStatisticButton.addEventListener('click', ()=>{
        fullStatisticContainer.classList.add('off');
        fullStatisticButton.classList.remove('statistic-button-active');
        dayStatisticButton.classList.add('statistic-button-active');
      });
    }

    renderStatisticData = async() => {

      const statistics = new Statistics();
      const currentStatistics: statisticsType = await statistics.getStatistics() as statisticsType;
      const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const currentDate = new Date().toLocaleString('ru', dateOptions);
    let sprintDayLearnedWords = 0;
    let sprintCorrectAnswersCount = 0;
    let sprintLongestCorrectRange = 0;
    let sprintAllAnswersCount = 0;
    const sprintAccuracy = sprintAllAnswersCount > 0 ? Math.round(sprintCorrectAnswersCount / sprintAllAnswersCount) : 0;
        if (currentStatistics.optional[`${currentDate} sprint`]) {
      sprintDayLearnedWords = currentStatistics.optional[`${currentDate} sprint`].learnedWords;
      sprintCorrectAnswersCount = currentStatistics.optional[`${currentDate} sprint`].correctAnswersCount;
      sprintLongestCorrectRange = currentStatistics.optional[`${currentDate} sprint`].longestCorrectRange;
      sprintAllAnswersCount = currentStatistics.optional[`${currentDate} sprint`].allAnswersCount;
    };

    let audioChallengeDayLearnedWords = 0;
    let audioChallengeCorrectAnswersCount = 0;
    let audioChallengeLongestCorrectRange = 0;
    let audioChallengeAllAnswersCount = 0;
    const audioChallengeAccuracy = audioChallengeAllAnswersCount > 0 ? Math.round(audioChallengeCorrectAnswersCount / audioChallengeAllAnswersCount) : 0;

    if (currentStatistics.optional[`${currentDate} audio-challenge`]) {
      audioChallengeDayLearnedWords = currentStatistics.optional[`${currentDate} audio-challenge`].learnedWords;
      audioChallengeCorrectAnswersCount = currentStatistics.optional[`${currentDate} audio-challenge`].correctAnswersCount;
      audioChallengeLongestCorrectRange = currentStatistics.optional[`${currentDate} audio-challenge`].longestCorrectRange;
      audioChallengeAllAnswersCount = currentStatistics.optional[`${currentDate} audio-challenge`].allAnswersCount;
    };   

    }

}

export default RenderStatistic;