import {
  StartApp,
  settings,
} from './start';

type statisticsType = {
  learnedWords: number,
  optional: {
    [key: string]: {
      learnedWords: number,
      correctAnswersCount: number,
      longestCorrectRange: number,
      allAnswersCount: number,
    },
  },
}

class Statistics {

  public async getStatistics(): Promise < statisticsType > {
    const startApp = new StartApp();

    let statisticsData: statisticsType = {
      learnedWords: 0,
      optional: {}
    };
    const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/statistics/`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      statisticsData = await res.json();
      console.log(statisticsData);
    } catch (er) {}
    return statisticsData;
  }

  public async putStatistics(stats: statisticsType): Promise < void > {
    const startApp = new StartApp();
    
    try {
      const url = `${settings.APIUrl}users/${startApp.userSettings.userId}/statistics/`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${startApp.userSettings.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stats)
      });
      const data = await res.json();
    } catch (er) {}
  }

  public async changeLearnedWordsCount(move: string): Promise < void > {
    let currentStatistics = await this.getStatistics();
    const newStat: statisticsType = {
      learnedWords: 0,
      optional: {}
    };

    Object.entries(currentStatistics.optional).forEach(([key, value]) => {
      newStat.optional[key] = {
        learnedWords: value.learnedWords,
        correctAnswersCount: value.correctAnswersCount,
        longestCorrectRange: value.longestCorrectRange,
        allAnswersCount: value.allAnswersCount,
      };
    });

    if (move === 'up') newStat.learnedWords = currentStatistics.learnedWords + 1;
    else if (move === 'down') newStat.learnedWords = currentStatistics.learnedWords - 1;

    this.putStatistics(newStat);
  }

  public async updateStatistics(learnedWords: number, longestCorrectRange: number, game: string,
    allWordsRoundCount: number, correctAnswersRoundCount: number): Promise < void > {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    const currentDate = new Date().toLocaleString('ru', dateOptions);
    let currentStatistics = await this.getStatistics();
    const newStat: statisticsType = {
      learnedWords: learnedWords,
      optional: {}
    };
    newStat.learnedWords += currentStatistics.learnedWords;
    Object.entries(currentStatistics.optional).forEach(([key, value]) => {
      newStat.optional[key] = {
        learnedWords: value.learnedWords,
        correctAnswersCount: value.correctAnswersCount,
        longestCorrectRange: value.longestCorrectRange,
        allAnswersCount: value.allAnswersCount,
      };
    });
    if (currentStatistics.optional[`${currentDate} ${game}`]) {

      const newLearnedWords = learnedWords + currentStatistics.optional[`${currentDate} ${game}`].learnedWords;
      const newCorrectAnswersCount = correctAnswersRoundCount + currentStatistics.optional[`${currentDate} ${game}`].correctAnswersCount;
      const newLongestCorrectRange = Math.max(longestCorrectRange, currentStatistics.optional[`${currentDate} ${game}`].longestCorrectRange);
      const newAllAnswersCount = allWordsRoundCount + currentStatistics.optional[`${currentDate} ${game}`].allAnswersCount;
      newStat.optional[`${currentDate} ${game}`] = {
        learnedWords: newLearnedWords,
        correctAnswersCount: newCorrectAnswersCount,
        longestCorrectRange: newLongestCorrectRange,
        allAnswersCount: newAllAnswersCount,
      };
    } else {
      newStat.optional[`${currentDate} ${game}`] = {
        learnedWords: learnedWords,
        correctAnswersCount: correctAnswersRoundCount,
        longestCorrectRange: longestCorrectRange,
        allAnswersCount: allWordsRoundCount,
      };
    }
    this.putStatistics(newStat);
  }
}

export {
  statisticsType,
  Statistics,
};