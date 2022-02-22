import StatisticRender from "../view/statistics/statistic-render";
import '../view/statistics/statistics.css';
import {
  Statistics,
  statisticsType
} from './statistics';

type currentDateStatistic = {
  sprintDayLearnedWords: number,
  sprintDayCorrectAnswersCount: number,
  sprintDayLongestCorrectRange: number,
  sprintDayAllAnswersCount: number,
  sprintDayAccuracy: number,
  audioChallengeDayLearnedWords: number,
  audioChallengeDayCorrectAnswersCount: number,
  audioChallengeDayLongestCorrectRange: number,
  audioChallengeDayAllAnswersCount: number,
  audioChallengeDayAccuracy: number,
  dayLearnedWords: number,
  dayAccuracy: number
}


class RenderStatistic {

  renderStatisticPage = async () => {
    const page: HTMLElement = document.querySelector('.page-container') as HTMLElement;
    page.innerHTML = await StatisticRender.render();
    await this.renderDayStatistic();
    this.selectFullStatistic();

  }

  private selectFullStatistic = () => {
    const fullStatisticButton: HTMLElement = document.querySelector('.full-statistic-button') as HTMLElement;
    const dayStatisticButton: HTMLElement = document.querySelector('.day-statistic-button') as HTMLElement;
    const fullStatisticContainer: HTMLElement = document.querySelector('.full-statistic-container') as HTMLElement;
    fullStatisticButton.addEventListener('click', () => {
      fullStatisticContainer.classList.toggle('off');
      fullStatisticButton.classList.toggle('statistic-button-active');
      dayStatisticButton.classList.toggle('statistic-button-active');
    });
    dayStatisticButton.addEventListener('click', () => {
      fullStatisticContainer.classList.add('off');
      fullStatisticButton.classList.remove('statistic-button-active');
      dayStatisticButton.classList.add('statistic-button-active');
    });
  }

  getStatisticData = async (): Promise < currentDateStatistic > => {
    const statistics = new Statistics();
    const currentStatistics: statisticsType = await statistics.getStatistics() as statisticsType;
    console.log(`53 ${currentStatistics}`)
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const currentDate = new Date().toLocaleString('ru', dateOptions);
    let sprintDayLearnedWords = 0;
    let sprintDayCorrectAnswersCount = 0;
    let sprintDayLongestCorrectRange = 0;
    let sprintDayAllAnswersCount = 0;    
    if (currentStatistics.optional[`${currentDate} sprint`]) {
      sprintDayLearnedWords = currentStatistics.optional[`${currentDate} sprint`].learnedWords;
      sprintDayCorrectAnswersCount = currentStatistics.optional[`${currentDate} sprint`].correctAnswersCount;
      sprintDayLongestCorrectRange = currentStatistics.optional[`${currentDate} sprint`].longestCorrectRange;
      sprintDayAllAnswersCount = currentStatistics.optional[`${currentDate} sprint`].allAnswersCount;
    };
    let audioChallengeDayLearnedWords = 0;
    let audioChallengeDayCorrectAnswersCount = 0;
    let audioChallengeDayLongestCorrectRange = 0;
    let audioChallengeDayAllAnswersCount = 0;    
    if (currentStatistics.optional[`${currentDate} audio-challenge`]) {
      audioChallengeDayLearnedWords = currentStatistics.optional[`${currentDate} audio-challenge`].learnedWords;
      audioChallengeDayCorrectAnswersCount = currentStatistics.optional[`${currentDate} audio-challenge`].correctAnswersCount;
      audioChallengeDayLongestCorrectRange = currentStatistics.optional[`${currentDate} audio-challenge`].longestCorrectRange;
      audioChallengeDayAllAnswersCount = currentStatistics.optional[`${currentDate} audio-challenge`].allAnswersCount;
    };
    const sprintDayAccuracy = sprintDayAllAnswersCount > 0 ? Math.round((sprintDayCorrectAnswersCount / sprintDayAllAnswersCount)*100) : 0;
    const audioChallengeDayAccuracy = audioChallengeDayAllAnswersCount > 0 ? Math.round((audioChallengeDayCorrectAnswersCount / audioChallengeDayAllAnswersCount)*100) : 0;
    const dayLearnedWords: number = currentStatistics ? currentStatistics.learnedWords : 0;
    const dayAccuracy: number = (currentStatistics && (sprintDayAllAnswersCount + audioChallengeDayAllAnswersCount) !== 0 ) ? Math.round((sprintDayCorrectAnswersCount + audioChallengeDayCorrectAnswersCount) /(sprintDayAllAnswersCount + audioChallengeDayAllAnswersCount)*100 ) : 0;
    const currentDateStatistic: currentDateStatistic = {
      sprintDayLearnedWords,
      sprintDayCorrectAnswersCount,
      sprintDayLongestCorrectRange,
      sprintDayAllAnswersCount,
      sprintDayAccuracy,
      audioChallengeDayLearnedWords,
      audioChallengeDayCorrectAnswersCount,
      audioChallengeDayLongestCorrectRange,
      audioChallengeDayAllAnswersCount,
      audioChallengeDayAccuracy,
      dayLearnedWords,
      dayAccuracy 
    };
    console.log(`98 ${currentDateStatistic}`)
    return currentDateStatistic;
  }

  renderDayStatistic = async () => {
    const currentDateStatistic: currentDateStatistic = await this.getStatisticData() as currentDateStatistic;
console.log(`104 ${currentDateStatistic}`)
    const sprintDayLearnedWordsContainer: HTMLElement = document.querySelector('.sprintDayLearnedWords') as HTMLElement;
    const sprintDayLongestCorrectRangeContainer: HTMLElement = document.querySelector('.sprintDayLongestCorrectRange') as HTMLElement;
    const sprintDayAccuracyContainer: HTMLElement = document.querySelector('.sprintDayAccuracy') as HTMLElement;
    const audioChallengeDayLearnedWordsContainer: HTMLElement = document.querySelector('.audioChallengeDayLearnedWords') as HTMLElement;
    const audioChallengeDayLongestCorrectRangeContainer: HTMLElement = document.querySelector('.audioChallengeDayLongestCorrectRange') as HTMLElement;
    const audioChallengeDayAccuracyContainer: HTMLElement = document.querySelector('.audioChallengeDayAccuracy') as HTMLElement;
    const dayLearnedWordsContainer: HTMLElement = document.querySelector('.dayLearnedWords') as HTMLElement;
    const dayAccuracyContainer: HTMLElement = document.querySelector('.dayAccuracy') as HTMLElement;

    sprintDayLearnedWordsContainer.textContent = `${currentDateStatistic.sprintDayLearnedWords}`;
    sprintDayLongestCorrectRangeContainer.textContent = `${currentDateStatistic.sprintDayLongestCorrectRange}`;
    sprintDayAccuracyContainer.textContent = `${currentDateStatistic.sprintDayAccuracy}%`;
    audioChallengeDayLearnedWordsContainer.textContent = `${currentDateStatistic.audioChallengeDayLearnedWords}`;
    audioChallengeDayLongestCorrectRangeContainer.textContent = `${currentDateStatistic.audioChallengeDayLongestCorrectRange}`;
    audioChallengeDayAccuracyContainer.textContent = `${currentDateStatistic.audioChallengeDayAccuracy}%`;
    dayLearnedWordsContainer.textContent = `${currentDateStatistic.dayLearnedWords}`;
    dayAccuracyContainer.textContent = `${currentDateStatistic.dayAccuracy}%`;

  }

}

export default RenderStatistic;