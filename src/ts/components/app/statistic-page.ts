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
    const statistics = new Statistics();
    const currentStatistics: statisticsType = await statistics.getStatistics() as statisticsType;
    await this.renderDayStatistic(currentStatistics);
    await this.renderFullStatisticData(currentStatistics);
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

  getDayStatisticData = async (currentStatistics: statisticsType): Promise < currentDateStatistic > => {
  
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
       
    
      audioChallengeDayLearnedWords = currentStatistics.optional.currentDayChallenge.learnedWords;
      audioChallengeDayCorrectAnswersCount = currentStatistics.optional.currentDayChallenge.correctAnswersCount;
      audioChallengeDayLongestCorrectRange = currentStatistics.optional.currentDayChallenge.longestCorrectRange;
      audioChallengeDayAllAnswersCount = currentStatistics.optional.currentDayChallenge.allAnswersCount;
      audioChallengeDayCreatedUserWordsCount = currentStatistics.optional.currentDayChallenge.createdUserWordsCount;
    
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
    return currentDateStatistic;
  }

  renderFullStatisticData = async(currentStatistics: statisticsType): Promise<void> =>{

    const allPeriodStatisticSprintContainer: HTMLElement = document.querySelector('.all-statistic-sprint') as HTMLElement;
    const allPeriodStatisticChallengeContainer: HTMLElement = document.querySelector('.all-statistic-challenge') as HTMLElement;
    const allPeriodStatisticSumContainer: HTMLElement = document.querySelector('.all-statistic-sum') as HTMLElement;

    const currentYearStatisticSprintContainer: HTMLElement = document.querySelector('.year-statistic-sprint') as HTMLElement;
    const currentYearStatisticChallengeContainer: HTMLElement = document.querySelector('.year-statistic-challenge') as HTMLElement;
    const currentYearStatisticSumContainer: HTMLElement = document.querySelector('.year-statistic-sum') as HTMLElement;;

    const currentMonthStatisticSprintContainer: HTMLElement = document.querySelector('.month-statistic-sprint') as HTMLElement;
    const currentMonthStatisticChallengeContainer: HTMLElement = document.querySelector('.month-statistic-challenge') as HTMLElement;
    const currentMonthStatisticSumContainer: HTMLElement = document.querySelector('.month-statistic-sum') as HTMLElement;

    const currentDayStatisticSprintContainer: HTMLElement = document.querySelector('.day-statistic-sprint') as HTMLElement;
    const currentDayStatisticChallengeContainer: HTMLElement = document.querySelector('.day-statistic-challenge') as HTMLElement;
    const currentDayStatisticSumContainer: HTMLElement = document.querySelector('.day-statistic-sum') as HTMLElement;   

    allPeriodStatisticSprintContainer.innerHTML = this.tableRowView(currentStatistics.optional.allPeriodSprint.createdUserWordsCount, currentStatistics.optional.allPeriodSprint.learnedWords ,(currentStatistics.optional.allPeriodSprint.allAnswersCount ? Math.round(100 * currentStatistics.optional.allPeriodSprint.correctAnswersCount/currentStatistics.optional.allPeriodSprint.allAnswersCount) : 0));

    allPeriodStatisticChallengeContainer.innerHTML = this.tableRowView(currentStatistics.optional.allPeriodChallenge.createdUserWordsCount, currentStatistics.optional.allPeriodChallenge.learnedWords ,(currentStatistics.optional.allPeriodChallenge.allAnswersCount ? Math.round(100 * currentStatistics.optional.allPeriodChallenge.correctAnswersCount/currentStatistics.optional.allPeriodChallenge.allAnswersCount) : 0));

    allPeriodStatisticSumContainer.innerHTML = this.tableRowView((currentStatistics.optional.allPeriodSprint.createdUserWordsCount + currentStatistics.optional.allPeriodChallenge.createdUserWordsCount), currentStatistics.learnedWords ,((currentStatistics.optional.allPeriodSprint.allAnswersCount + currentStatistics.optional.allPeriodChallenge.allAnswersCount) ? Math.round(100 * (currentStatistics.optional.allPeriodSprint.correctAnswersCount + currentStatistics.optional.allPeriodChallenge.correctAnswersCount)/(currentStatistics.optional.allPeriodSprint.allAnswersCount + currentStatistics.optional.allPeriodChallenge.allAnswersCount)) : 0));

    currentYearStatisticSprintContainer.innerHTML = this.tableRowView(currentStatistics.optional.currentYearSprint.createdUserWordsCount, currentStatistics.optional.currentYearSprint.learnedWords ,(currentStatistics.optional.currentYearSprint.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentYearSprint.correctAnswersCount/currentStatistics.optional.currentYearSprint.allAnswersCount) : 0));

    currentYearStatisticChallengeContainer.innerHTML = this.tableRowView(currentStatistics.optional.currentYearChallenge.createdUserWordsCount, currentStatistics.optional.currentYearChallenge.learnedWords ,(currentStatistics.optional.currentYearChallenge.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentYearChallenge.correctAnswersCount/currentStatistics.optional.currentYearChallenge.allAnswersCount) : 0));

    currentYearStatisticSumContainer.innerHTML = this.tableRowView((currentStatistics.optional.currentYearSprint.createdUserWordsCount + currentStatistics.optional.currentYearChallenge.createdUserWordsCount), (currentStatistics.optional.currentYearSprint.learnedWords + currentStatistics.optional.currentYearChallenge.learnedWords) ,Math.round((currentStatistics.optional.currentYearSprint.allAnswersCount + currentStatistics.optional.currentYearChallenge.allAnswersCount) ? Math.round(100 * (currentStatistics.optional.currentYearSprint.correctAnswersCount + currentStatistics.optional.currentYearChallenge.correctAnswersCount)/(currentStatistics.optional.currentYearSprint.allAnswersCount + currentStatistics.optional.currentYearChallenge.allAnswersCount)) : 0));

    currentMonthStatisticSprintContainer.innerHTML = this.tableRowView(currentStatistics.optional.currentMonthSprint.createdUserWordsCount, currentStatistics.optional.currentMonthSprint.learnedWords ,(currentStatistics.optional.currentMonthSprint.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentMonthSprint.correctAnswersCount/currentStatistics.optional.currentMonthSprint.allAnswersCount) : 0));

    currentMonthStatisticChallengeContainer.innerHTML = this.tableRowView(currentStatistics.optional.currentMonthChallenge.createdUserWordsCount, currentStatistics.optional.currentMonthChallenge.learnedWords ,(currentStatistics.optional.currentMonthChallenge.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentMonthChallenge.correctAnswersCount/currentStatistics.optional.currentMonthChallenge.allAnswersCount) : 0));
    currentMonthStatisticSumContainer.innerHTML = this.tableRowView((currentStatistics.optional.currentMonthSprint.createdUserWordsCount + currentStatistics.optional.currentMonthChallenge.createdUserWordsCount), (currentStatistics.optional.currentMonthSprint.learnedWords + currentStatistics.optional.currentMonthChallenge.learnedWords) , ((currentStatistics.optional.currentMonthSprint.allAnswersCount + currentStatistics.optional.currentMonthChallenge.allAnswersCount) ? Math.round(100 *(currentStatistics.optional.currentMonthSprint.correctAnswersCount + currentStatistics.optional.currentMonthChallenge.correctAnswersCount)/(currentStatistics.optional.currentMonthSprint.allAnswersCount + currentStatistics.optional.currentMonthChallenge.allAnswersCount)) : 0));

    currentDayStatisticSprintContainer.innerHTML = this.tableRowView(currentStatistics.optional.currentDaySprint.createdUserWordsCount, currentStatistics.optional.currentDaySprint.learnedWords ,(currentStatistics.optional.currentDaySprint.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentDaySprint.correctAnswersCount/currentStatistics.optional.currentDaySprint.allAnswersCount) : 0));

    currentDayStatisticChallengeContainer.innerHTML = this.tableRowView(currentStatistics.optional.currentDayChallenge.createdUserWordsCount, currentStatistics.optional.currentDayChallenge.learnedWords ,(currentStatistics.optional.currentDayChallenge.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentDayChallenge.correctAnswersCount/currentStatistics.optional.currentDayChallenge.allAnswersCount) : 0));

    currentDayStatisticSumContainer.innerHTML = this.tableRowView((currentStatistics.optional.currentDaySprint.createdUserWordsCount + currentStatistics.optional.currentDayChallenge.createdUserWordsCount), currentStatistics.optional.currentDaySprint.learnedWords + currentStatistics.optional.currentDayChallenge.learnedWords , ((currentStatistics.optional.currentDaySprint.allAnswersCount + currentStatistics.optional.currentDayChallenge.allAnswersCount) ? Math.round(100 *(currentStatistics.optional.currentDaySprint.correctAnswersCount + currentStatistics.optional.currentDayChallenge.correctAnswersCount)/(currentStatistics.optional.currentDaySprint.allAnswersCount + currentStatistics.optional.currentDayChallenge.allAnswersCount)) : 0));   
    

  }

  renderDayStatistic = async (currentStatistics: statisticsType) => {

    const sprintDayCreatedUserWordsContainer: HTMLElement = document.querySelector('.sprintDayCreatedUserWordsCount') as HTMLElement;
    const sprintDayLongestCorrectRangeContainer: HTMLElement = document.querySelector('.sprintDayLongestCorrectRange') as HTMLElement;
    const sprintDayAccuracyContainer: HTMLElement = document.querySelector('.sprintDayAccuracy') as HTMLElement;
    const audioChallengeDayLongestCorrectRangeContainer: HTMLElement = document.querySelector('.audioChallengeDayLongestCorrectRange') as HTMLElement;
    const audioChallengeDayCreatedUserWordsContainer: HTMLElement = document.querySelector('.audioChallengeDayCreatedUserWordsCount') as HTMLElement
    const audioChallengeDayAccuracyContainer: HTMLElement = document.querySelector('.audioChallengeDayAccuracy') as HTMLElement;
    const dayLearnedWordsContainer: HTMLElement = document.querySelector('.dayLearnedWords') as HTMLElement;
    const dayAccuracyContainer: HTMLElement = document.querySelector('.dayAccuracy') as HTMLElement;
    const dayCreatedUserWordsContainer: HTMLElement = document.querySelector('.dayCreatedUserWordsContainer') as HTMLElement;
   
    sprintDayCreatedUserWordsContainer.textContent = `${currentStatistics.optional.currentDaySprint.createdUserWordsCount}`;
    sprintDayLongestCorrectRangeContainer.textContent = `${currentStatistics.optional.currentDaySprint.longestCorrectRange}`;
   
    sprintDayAccuracyContainer.textContent = `${(currentStatistics.optional.currentDaySprint.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentDaySprint.correctAnswersCount/currentStatistics.optional.currentDaySprint.allAnswersCount) : 0)}%`;

    audioChallengeDayCreatedUserWordsContainer.textContent = `${currentStatistics.optional.currentDayChallenge.createdUserWordsCount}`;

    audioChallengeDayLongestCorrectRangeContainer.textContent = `${currentStatistics.optional.currentDayChallenge.longestCorrectRange}`;

    audioChallengeDayAccuracyContainer.textContent = `${(currentStatistics.optional.currentDayChallenge.allAnswersCount ? Math.round(100 * currentStatistics.optional.currentDayChallenge.correctAnswersCount/currentStatistics.optional.currentDayChallenge.allAnswersCount) : 0)}%`;

    dayLearnedWordsContainer.textContent = `${currentStatistics.optional.currentDaySprint.learnedWords + currentStatistics.optional.currentDayChallenge.learnedWords}`;

    dayAccuracyContainer.textContent = `${((currentStatistics.optional.currentDaySprint.allAnswersCount + currentStatistics.optional.currentDayChallenge.allAnswersCount) ? Math.round(100 *(currentStatistics.optional.currentDaySprint.correctAnswersCount + currentStatistics.optional.currentDayChallenge.correctAnswersCount)/(currentStatistics.optional.currentDaySprint.allAnswersCount + currentStatistics.optional.currentDayChallenge.allAnswersCount)) : 0)}%`;

    dayCreatedUserWordsContainer.textContent = `${(currentStatistics.optional.currentDaySprint.createdUserWordsCount + currentStatistics.optional.currentDayChallenge.createdUserWordsCount)}`;

  }

  tableRowView = (createdWords: number, learnedWords: number, accuracy: number) => {
      const tableRowHtml = `
      <p>${createdWords}</p>
      <p>${learnedWords}</p>
      <p>${accuracy}</p>
      `;
      return tableRowHtml;
  }

}

export default RenderStatistic;