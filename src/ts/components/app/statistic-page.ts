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
  sprintDayCreatedUserWordsCount: number
  audioChallengeDayLearnedWords: number,
  audioChallengeDayCorrectAnswersCount: number,
  audioChallengeDayLongestCorrectRange: number,
  audioChallengeDayAllAnswersCount: number,
  audioChallengeDayAccuracy: number,
  audioChallengeDayCreatedUserWordsCount: number,
  dayLearnedWords: number,
  dayAccuracy: number,
  dayCreatedUserWordsCount: number
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
    let sprintDayCreatedUserWordsCount = 0;
    
    let audioChallengeDayLearnedWords = 0;
    let audioChallengeDayCorrectAnswersCount = 0;
    let audioChallengeDayLongestCorrectRange = 0;
    let audioChallengeDayAllAnswersCount = 0;
    let audioChallengeDayCreatedUserWordsCount = 0; 
    
      sprintDayLearnedWords = currentStatistics.optional.currentDaySprint.learnedWords;
      sprintDayCorrectAnswersCount = currentStatistics.optional.currentDaySprint.correctAnswersCount;
      sprintDayLongestCorrectRange = currentStatistics.optional.currentDaySprint.longestCorrectRange;
      sprintDayAllAnswersCount = currentStatistics.optional.currentDaySprint.allAnswersCount;
      sprintDayCreatedUserWordsCount = currentStatistics.optional.currentDaySprint.createdUserWordsCount;
    
       
    //if (currentStatistics.optional[`${currentDate} audio-challenge`]) {
      audioChallengeDayLearnedWords = currentStatistics.optional.currentDayChallenge.learnedWords;
      audioChallengeDayCorrectAnswersCount = currentStatistics.optional.currentDayChallenge.correctAnswersCount;
      audioChallengeDayLongestCorrectRange = currentStatistics.optional.currentDayChallenge.longestCorrectRange;
      audioChallengeDayAllAnswersCount = currentStatistics.optional.currentDayChallenge.allAnswersCount;
      audioChallengeDayCreatedUserWordsCount = currentStatistics.optional.currentDayChallenge.createdUserWordsCount;
    //};
    const sprintDayAccuracy = sprintDayAllAnswersCount > 0 ? Math.round((sprintDayCorrectAnswersCount / sprintDayAllAnswersCount)*100) : 0;
    const audioChallengeDayAccuracy = audioChallengeDayAllAnswersCount > 0 ? Math.round((audioChallengeDayCorrectAnswersCount / audioChallengeDayAllAnswersCount)*100) : 0;
    const dayLearnedWords: number = currentStatistics ? currentStatistics.learnedWords : 0;
    const dayAccuracy: number = (currentStatistics && (sprintDayAllAnswersCount + audioChallengeDayAllAnswersCount) !== 0 ) ? Math.round((sprintDayCorrectAnswersCount + audioChallengeDayCorrectAnswersCount) /(sprintDayAllAnswersCount + audioChallengeDayAllAnswersCount)*100 ) : 0;
    const dayCreatedUserWordsCount: number = sprintDayCreatedUserWordsCount + audioChallengeDayCreatedUserWordsCount;

    const currentDateStatistic: currentDateStatistic = {
      sprintDayLearnedWords,
      sprintDayCorrectAnswersCount,
      sprintDayLongestCorrectRange,
      sprintDayAllAnswersCount,
      sprintDayAccuracy,
      sprintDayCreatedUserWordsCount,
      audioChallengeDayLearnedWords,
      audioChallengeDayCorrectAnswersCount,
      audioChallengeDayLongestCorrectRange,
      audioChallengeDayAllAnswersCount,
      audioChallengeDayAccuracy,
      audioChallengeDayCreatedUserWordsCount,
      dayLearnedWords,
      dayAccuracy,
      dayCreatedUserWordsCount 
    };
    console.log(`98 ${currentDateStatistic}`)
    return currentDateStatistic;
  }

  renderDayStatistic = async () => {
    const currentDateStatistic: currentDateStatistic = await this.getStatisticData() as currentDateStatistic;

    const sprintDayCreatedUserWordsContainer: HTMLElement = document.querySelector('.sprintDayCreatedUserWordsCount') as HTMLElement;
    const sprintDayLongestCorrectRangeContainer: HTMLElement = document.querySelector('.sprintDayLongestCorrectRange') as HTMLElement;
    const sprintDayAccuracyContainer: HTMLElement = document.querySelector('.sprintDayAccuracy') as HTMLElement;
    const audioChallengeDayLongestCorrectRangeContainer: HTMLElement = document.querySelector('.audioChallengeDayLongestCorrectRange') as HTMLElement;
    const audioChallengeDayCreatedUserWordsContainer: HTMLElement = document.querySelector('.audioChallengeDayCreatedUserWordsCount') as HTMLElement
    const audioChallengeDayAccuracyContainer: HTMLElement = document.querySelector('.audioChallengeDayAccuracy') as HTMLElement;
    const dayLearnedWordsContainer: HTMLElement = document.querySelector('.dayLearnedWords') as HTMLElement;
    const dayAccuracyContainer: HTMLElement = document.querySelector('.dayAccuracy') as HTMLElement;
    const dayCreatedUserWordsContainer: HTMLElement = document.querySelector('.dayCreatedUserWordsContainer') as HTMLElement;


    
    sprintDayCreatedUserWordsContainer.textContent = `${currentDateStatistic.sprintDayCreatedUserWordsCount}`;
    sprintDayLongestCorrectRangeContainer.textContent = `${currentDateStatistic.sprintDayLongestCorrectRange}`;
    sprintDayAccuracyContainer.textContent = `${currentDateStatistic.sprintDayAccuracy}%`;
    audioChallengeDayCreatedUserWordsContainer.textContent = `${currentDateStatistic.audioChallengeDayCreatedUserWordsCount}`;
    audioChallengeDayLongestCorrectRangeContainer.textContent = `${currentDateStatistic.audioChallengeDayLongestCorrectRange}`;
    audioChallengeDayAccuracyContainer.textContent = `${currentDateStatistic.audioChallengeDayAccuracy}%`;
    dayLearnedWordsContainer.textContent = `${currentDateStatistic.dayLearnedWords}`;
    dayAccuracyContainer.textContent = `${currentDateStatistic.dayAccuracy}%`;
    dayCreatedUserWordsContainer.textContent = `${currentDateStatistic.dayCreatedUserWordsCount}`;

  }

}

export default RenderStatistic;