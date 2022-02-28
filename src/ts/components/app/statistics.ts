import {
  StartApp,
  settings,
} from './start';

type statisticsType = {
  learnedWords: number,
  optional: {
    allPeriodSprint: {
      learnedWords: number,
      correctAnswersCount: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
    },
    allPeriodChallenge: {
      learnedWords: number,
      correctAnswersCount: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
    },
    currentYearSprint: {
      learnedWords: number,
      correctAnswersCount: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
      currentYear: string,
    },
    currentYearChallenge: {
      learnedWords: number,
      correctAnswersCount: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
      currentYear: string,
    },
    currentMonthSprint: {
      learnedWords: number,
      correctAnswersCount: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
      currentMonth: string,
    },
    currentMonthChallenge: {
      learnedWords: number,
      correctAnswersCount: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
      currentMonth: string,
    },
    currentDaySprint: {
      learnedWords: number,
      correctAnswersCount: number,
      longestCorrectRange: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
      currentDay: string,
    },
    currentDayChallenge: {
      learnedWords: number,
      correctAnswersCount: number,
      longestCorrectRange: number,
      allAnswersCount: number,
      createdUserWordsCount: number,
      currentDay: string,
    },
  },
}

class Statistics {

  private getDefaultStatistics(): statisticsType {
    const data = {
      learnedWords: 0,
      optional: {
        allPeriodSprint: {
          learnedWords: 0,
          correctAnswersCount: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
        },
        allPeriodChallenge: {
          learnedWords: 0,
          correctAnswersCount: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
        },
        currentYearSprint: {
          learnedWords: 0,
          correctAnswersCount: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
          currentYear: '',
        },
        currentYearChallenge: {
          learnedWords: 0,
          correctAnswersCount: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
          currentYear: '',
        },
        currentMonthSprint: {
          learnedWords: 0,
          correctAnswersCount: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
          currentMonth: '',
        },
        currentMonthChallenge: {
          learnedWords: 0,
          correctAnswersCount: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
          currentMonth: '',
        },
        currentDaySprint: {
          learnedWords: 0,
          correctAnswersCount: 0,
          longestCorrectRange: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
          currentDay: '',
        },
        currentDayChallenge: {
          learnedWords: 0,
          correctAnswersCount: 0,
          longestCorrectRange: 0,
          allAnswersCount: 0,
          createdUserWordsCount: 0,
          currentDay: '',
        },
      }
    }
    return data;
  }

  public async getStatistics(): Promise < statisticsType > {
    const startApp = new StartApp();

    let statisticsData = this.getDefaultStatistics();
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
    } catch (er) {}
  }

  public async changeLearnedWordsCount(move: string): Promise < void > {

    const newStat = await this.getStatisticsDuplicate();

    if (move === 'up') newStat.learnedWords++;
    else if (move === 'down') newStat.learnedWords--;

    this.putStatistics(newStat);
  }

  public async updateStatistics(learnedWords: number, longestCorrectRoundRange: number, game: string,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number): Promise < void > {

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };

    const currentDate = new Date().toLocaleString('ru', dateOptions);
    const currentMonth = currentDate.slice(3);
    const currentYear = currentMonth.slice(3);
    let currentStatistics = await this.getStatisticsDuplicate();

    currentStatistics.learnedWords += learnedWords;

    if (game === 'audio-challenge') {
      if (currentStatistics.optional.currentDayChallenge.currentDay === currentDate) {
        currentStatistics = this.addAllPeriodChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
        currentStatistics = this.addCurrentYearChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
        currentStatistics = this.addCurrentMonthChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
        currentStatistics = this.addCurrentDayChallenge(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
      } else {
        if (currentStatistics.optional.currentMonthChallenge.currentMonth === currentMonth) {
          currentStatistics = this.addAllPeriodChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
          currentStatistics = this.addCurrentYearChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
          currentStatistics = this.addCurrentMonthChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
          currentStatistics = this.setCurrentDayChallenge(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
        } else {
          if (currentStatistics.optional.currentYearChallenge.currentYear === currentYear) {
            currentStatistics = this.addAllPeriodChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
            currentStatistics = this.addCurrentYearChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
            currentStatistics = this.setCurrentMonthChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
            currentStatistics = this.setCurrentDayChallenge(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
          } else {
            currentStatistics = this.addAllPeriodChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
            currentStatistics = this.setCurrentYearChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
            currentStatistics = this.setCurrentMonthChallenge(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
            currentStatistics = this.setCurrentDayChallenge(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
          };
        };
      };
    };
    if (game === 'sprint') {
      if (currentStatistics.optional.currentDaySprint.currentDay === currentDate) {
        currentStatistics = this.addAllPeriodSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
        currentStatistics = this.addCurrentYearSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
        currentStatistics = this.addCurrentMonthSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
        currentStatistics = this.addCurrentDaySprint(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
      } else {
        if (currentStatistics.optional.currentMonthSprint.currentMonth === currentMonth) {
          currentStatistics = this.addAllPeriodSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
          currentStatistics = this.addCurrentYearSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
          currentStatistics = this.addCurrentMonthSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
          currentStatistics = this.setCurrentDaySprint(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
        } else {
          if (currentStatistics.optional.currentYearSprint.currentYear === currentYear) {
            currentStatistics = this.addAllPeriodSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
            currentStatistics = this.addCurrentYearSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
            currentStatistics = this.setCurrentMonthSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
            currentStatistics = this.setCurrentDaySprint(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
          } else {
            currentStatistics = this.addAllPeriodSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount);
            currentStatistics = this.setCurrentYearSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentYear);
            currentStatistics = this.setCurrentMonthSprint(currentStatistics, learnedWords, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentMonth);
            currentStatistics = this.setCurrentDaySprint(currentStatistics, learnedWords, longestCorrectRoundRange, allWordsRoundCount, correctAnswersRoundCount, createdUserWordsRoundCount, currentDate);
          };
        };
      };
    };

    this.putStatistics(currentStatistics);
  }

  private moveAllPeriodChallenge(currentStatistics: statisticsType): statisticsType {
      currentStatistics.optional.allPeriodChallenge = {
        learnedWords: currentStatistics.optional.allPeriodChallenge.learnedWords + currentStatistics.optional.currentYearChallenge.learnedWords,
        correctAnswersCount: currentStatistics.optional.allPeriodChallenge.correctAnswersCount + currentStatistics.optional.currentYearChallenge.correctAnswersCount,
        allAnswersCount: currentStatistics.optional.allPeriodChallenge.allAnswersCount + currentStatistics.optional.currentYearChallenge.allAnswersCount,
        createdUserWordsCount: currentStatistics.optional.allPeriodChallenge.createdUserWordsCount + currentStatistics.optional.currentYearChallenge.createdUserWordsCount,
      }
    return currentStatistics;
  }

  private addAllPeriodChallenge(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number): statisticsType {
      currentStatistics.optional.allPeriodChallenge = {
        learnedWords: currentStatistics.optional.allPeriodChallenge.learnedWords + learnedWords,
        correctAnswersCount: currentStatistics.optional.allPeriodChallenge.correctAnswersCount + correctAnswersRoundCount,
        allAnswersCount: currentStatistics.optional.allPeriodChallenge.allAnswersCount + allWordsRoundCount,
        createdUserWordsCount: currentStatistics.optional.allPeriodChallenge.createdUserWordsCount + createdUserWordsRoundCount,
      }
    return currentStatistics;
  }

  private moveCurrentYearChallenge(currentStatistics: statisticsType, currentYear: string): statisticsType {
      currentStatistics.optional.currentYearChallenge = {
        learnedWords: currentStatistics.optional.currentYearChallenge.learnedWords + currentStatistics.optional.currentMonthChallenge.learnedWords,
        correctAnswersCount: currentStatistics.optional.currentYearChallenge.correctAnswersCount + currentStatistics.optional.currentMonthChallenge.correctAnswersCount,
        allAnswersCount: currentStatistics.optional.currentYearChallenge.allAnswersCount + currentStatistics.optional.currentMonthChallenge.allAnswersCount,
        createdUserWordsCount: currentStatistics.optional.currentYearChallenge.createdUserWordsCount + currentStatistics.optional.currentMonthChallenge.createdUserWordsCount,
        currentYear: currentYear,
      }
    return currentStatistics;
  }

  private setCurrentYearChallenge(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentYear: string): statisticsType {
      currentStatistics.optional.currentYearChallenge = {
        learnedWords: learnedWords,
        correctAnswersCount:  correctAnswersRoundCount,
        allAnswersCount:  allWordsRoundCount,
        createdUserWordsCount: createdUserWordsRoundCount,
        currentYear: currentYear,
      }
    return currentStatistics;
  }

  private addCurrentYearChallenge(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentYear: string): statisticsType {
      currentStatistics.optional.currentYearChallenge = {
        learnedWords: currentStatistics.optional.currentYearChallenge.learnedWords + learnedWords,
        correctAnswersCount: currentStatistics.optional.currentYearChallenge.correctAnswersCount + correctAnswersRoundCount,
        allAnswersCount: currentStatistics.optional.currentYearChallenge.allAnswersCount + allWordsRoundCount,
        createdUserWordsCount: currentStatistics.optional.currentYearChallenge.createdUserWordsCount + createdUserWordsRoundCount,
        currentYear: currentYear,
      }
    return currentStatistics;
  }

  private moveCurrentMonthChallenge(currentStatistics: statisticsType, currentMonth: string): statisticsType {
      currentStatistics.optional.currentMonthChallenge = {
        learnedWords: currentStatistics.optional.currentMonthChallenge.learnedWords + currentStatistics.optional.currentDayChallenge.learnedWords,
        correctAnswersCount: currentStatistics.optional.currentMonthChallenge.correctAnswersCount + currentStatistics.optional.currentDayChallenge.correctAnswersCount,
        allAnswersCount: currentStatistics.optional.currentMonthChallenge.allAnswersCount + currentStatistics.optional.currentDayChallenge.allAnswersCount,
        createdUserWordsCount: currentStatistics.optional.currentMonthChallenge.createdUserWordsCount + currentStatistics.optional.currentDayChallenge.createdUserWordsCount,
        currentMonth: currentMonth,
      };
    return currentStatistics;
  }

  private setCurrentMonthChallenge(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentMonth: string): statisticsType {
      currentStatistics.optional.currentMonthChallenge = {
        learnedWords: learnedWords,
        correctAnswersCount: correctAnswersRoundCount,
        allAnswersCount: allWordsRoundCount,
        createdUserWordsCount: createdUserWordsRoundCount,
        currentMonth: currentMonth,
      };
    return currentStatistics;
  }

  private addCurrentMonthChallenge(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentMonth: string): statisticsType {
      currentStatistics.optional.currentMonthChallenge = {
        learnedWords: currentStatistics.optional.currentMonthChallenge.learnedWords + learnedWords,
        correctAnswersCount: currentStatistics.optional.currentMonthChallenge.correctAnswersCount + correctAnswersRoundCount,
        allAnswersCount: currentStatistics.optional.currentMonthChallenge.allAnswersCount + allWordsRoundCount,
        createdUserWordsCount: currentStatistics.optional.currentMonthChallenge.createdUserWordsCount + createdUserWordsRoundCount,
        currentMonth: currentMonth,
      };
    return currentStatistics;
  }

  private setCurrentDayChallenge(currentStatistics: statisticsType, learnedWords: number, longestCorrectRoundRange: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentDate: string): statisticsType {
      currentStatistics.optional.currentDayChallenge = {
        learnedWords: learnedWords,
        correctAnswersCount: correctAnswersRoundCount,
        longestCorrectRange: longestCorrectRoundRange,
        allAnswersCount: allWordsRoundCount,
        createdUserWordsCount: createdUserWordsRoundCount,
        currentDay: currentDate,
      };
    return currentStatistics;
  }

  private addCurrentDayChallenge(currentStatistics: statisticsType, learnedWords: number, longestCorrectRoundRange: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentDate: string): statisticsType {
      currentStatistics.optional.currentDayChallenge = {
        learnedWords: currentStatistics.optional.currentDayChallenge.learnedWords + learnedWords,
        correctAnswersCount: currentStatistics.optional.currentDayChallenge.correctAnswersCount + correctAnswersRoundCount,
        longestCorrectRange: Math.max(currentStatistics.optional.currentDayChallenge.longestCorrectRange, longestCorrectRoundRange),
        allAnswersCount: currentStatistics.optional.currentDayChallenge.allAnswersCount + allWordsRoundCount,
        createdUserWordsCount: currentStatistics.optional.currentDayChallenge.createdUserWordsCount + createdUserWordsRoundCount,
        currentDay: currentDate,
      };
    return currentStatistics;
  }

//---------------------------------------------------------------------------------------------------------------------------------------------------

  private moveAllPeriodSprint(currentStatistics: statisticsType): statisticsType {
    currentStatistics.optional.allPeriodSprint = {
      learnedWords: currentStatistics.optional.allPeriodSprint.learnedWords + currentStatistics.optional.currentYearSprint.learnedWords,
      correctAnswersCount: currentStatistics.optional.allPeriodSprint.correctAnswersCount + currentStatistics.optional.currentYearSprint.correctAnswersCount,
      allAnswersCount: currentStatistics.optional.allPeriodSprint.allAnswersCount + currentStatistics.optional.currentYearSprint.allAnswersCount,
      createdUserWordsCount: currentStatistics.optional.allPeriodSprint.createdUserWordsCount + currentStatistics.optional.currentYearSprint.createdUserWordsCount,
    }
    return currentStatistics;
  }

  private addAllPeriodSprint(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number): statisticsType {
    currentStatistics.optional.allPeriodSprint = {
      learnedWords: currentStatistics.optional.allPeriodSprint.learnedWords + learnedWords,
      correctAnswersCount: currentStatistics.optional.allPeriodSprint.correctAnswersCount + correctAnswersRoundCount,
      allAnswersCount: currentStatistics.optional.allPeriodSprint.allAnswersCount + allWordsRoundCount,
      createdUserWordsCount: currentStatistics.optional.allPeriodSprint.createdUserWordsCount + createdUserWordsRoundCount,
    }
    return currentStatistics;
  }

  private moveCurrentYearSprint(currentStatistics: statisticsType, currentYear: string): statisticsType {
    currentStatistics.optional.currentYearSprint = {
      learnedWords: currentStatistics.optional.currentYearSprint.learnedWords + currentStatistics.optional.currentMonthSprint.learnedWords,
      correctAnswersCount: currentStatistics.optional.currentYearSprint.correctAnswersCount + currentStatistics.optional.currentMonthSprint.correctAnswersCount,
      allAnswersCount: currentStatistics.optional.currentYearSprint.allAnswersCount + currentStatistics.optional.currentMonthSprint.allAnswersCount,
      createdUserWordsCount: currentStatistics.optional.currentYearSprint.createdUserWordsCount + currentStatistics.optional.currentMonthSprint.createdUserWordsCount,
      currentYear: currentYear,
    };
    return currentStatistics;
  }

  private setCurrentYearSprint(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentYear: string): statisticsType {
    currentStatistics.optional.currentYearSprint = {
      learnedWords: learnedWords,
      correctAnswersCount: correctAnswersRoundCount,
      allAnswersCount: allWordsRoundCount,
      createdUserWordsCount: createdUserWordsRoundCount,
      currentYear: currentYear,
    };
    return currentStatistics;
  }

  private addCurrentYearSprint(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentYear: string): statisticsType {
    currentStatistics.optional.currentYearSprint = {
      learnedWords: currentStatistics.optional.currentYearSprint.learnedWords + learnedWords,
      correctAnswersCount: currentStatistics.optional.currentYearSprint.correctAnswersCount + correctAnswersRoundCount,
      allAnswersCount: currentStatistics.optional.currentYearSprint.allAnswersCount + allWordsRoundCount,
      createdUserWordsCount: currentStatistics.optional.currentYearSprint.createdUserWordsCount + createdUserWordsRoundCount,
      currentYear: currentYear,
    };
    return currentStatistics;
  }

  private moveCurrentMonthSprint(currentStatistics: statisticsType, currentMonth: string): statisticsType {
    currentStatistics.optional.currentMonthSprint = {
      learnedWords: currentStatistics.optional.currentMonthSprint.learnedWords + currentStatistics.optional.currentDaySprint.learnedWords,
      correctAnswersCount: currentStatistics.optional.currentMonthSprint.correctAnswersCount + currentStatistics.optional.currentDaySprint.correctAnswersCount,
      allAnswersCount: currentStatistics.optional.currentMonthSprint.allAnswersCount + currentStatistics.optional.currentDaySprint.allAnswersCount,
      createdUserWordsCount: currentStatistics.optional.currentMonthSprint.createdUserWordsCount + currentStatistics.optional.currentDaySprint.createdUserWordsCount,
      currentMonth: currentMonth,
    };
    return currentStatistics;
  }

  private setCurrentMonthSprint(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentMonth: string): statisticsType {
    currentStatistics.optional.currentMonthSprint = {
      learnedWords: learnedWords,
      correctAnswersCount: correctAnswersRoundCount,
      allAnswersCount: allWordsRoundCount,
      createdUserWordsCount: createdUserWordsRoundCount,
      currentMonth: currentMonth,
    };
    return currentStatistics;
  }

  private addCurrentMonthSprint(currentStatistics: statisticsType, learnedWords: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentMonth: string): statisticsType {
    currentStatistics.optional.currentMonthSprint = {
      learnedWords: currentStatistics.optional.currentMonthSprint.learnedWords + learnedWords,
      correctAnswersCount: currentStatistics.optional.currentMonthSprint.correctAnswersCount + correctAnswersRoundCount,
      allAnswersCount: currentStatistics.optional.currentMonthSprint.allAnswersCount + allWordsRoundCount,
      createdUserWordsCount: currentStatistics.optional.currentMonthSprint.createdUserWordsCount + createdUserWordsRoundCount,
      currentMonth: currentMonth,
    };
    return currentStatistics;
  }

  private setCurrentDaySprint(currentStatistics: statisticsType, learnedWords: number, longestCorrectRoundRange: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentDate: string): statisticsType {
    currentStatistics.optional.currentDaySprint = {
      learnedWords: learnedWords,
      correctAnswersCount: correctAnswersRoundCount,
      longestCorrectRange: longestCorrectRoundRange,
      allAnswersCount: allWordsRoundCount,
      createdUserWordsCount: createdUserWordsRoundCount,
      currentDay: currentDate,
    };
    return currentStatistics;
  }

  private addCurrentDaySprint(currentStatistics: statisticsType, learnedWords: number, longestCorrectRoundRange: number,
    allWordsRoundCount: number, correctAnswersRoundCount: number, createdUserWordsRoundCount: number, currentDate: string): statisticsType {
    currentStatistics.optional.currentDaySprint = {
      learnedWords: currentStatistics.optional.currentDaySprint.learnedWords + learnedWords,
      correctAnswersCount: currentStatistics.optional.currentDaySprint.correctAnswersCount + correctAnswersRoundCount,
      longestCorrectRange: Math.max(currentStatistics.optional.currentDaySprint.longestCorrectRange, longestCorrectRoundRange),
      allAnswersCount: currentStatistics.optional.currentDaySprint.allAnswersCount + allWordsRoundCount,
      createdUserWordsCount: currentStatistics.optional.currentDaySprint.createdUserWordsCount + createdUserWordsRoundCount,
      currentDay: currentDate,
    };
    return currentStatistics;
  }

  private async getStatisticsDuplicate(): Promise < statisticsType > {

    let newStat: statisticsType = this.getDefaultStatistics();
    let currentStatistics = await this.getStatistics();

    newStat.learnedWords = currentStatistics.learnedWords || 0;

    if (currentStatistics.optional.allPeriodSprint) {
      newStat.optional.allPeriodSprint = {
        learnedWords: currentStatistics.optional.allPeriodSprint.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.allPeriodSprint.correctAnswersCount || 0,
        allAnswersCount: currentStatistics.optional.allPeriodSprint.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.allPeriodSprint.createdUserWordsCount || 0,
      };
    };

    if (currentStatistics.optional.allPeriodChallenge) {
      newStat.optional.allPeriodChallenge = {
        learnedWords: currentStatistics.optional.allPeriodChallenge.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.allPeriodChallenge.correctAnswersCount || 0,
        allAnswersCount: currentStatistics.optional.allPeriodChallenge.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.allPeriodChallenge.createdUserWordsCount || 0,
      }
    };

    if (currentStatistics.optional.currentYearSprint) {
      newStat.optional.currentYearSprint = {
        learnedWords: currentStatistics.optional.currentYearSprint.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.currentYearSprint.correctAnswersCount || 0,
        allAnswersCount: currentStatistics.optional.currentYearSprint.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.currentYearSprint.createdUserWordsCount || 0,
        currentYear: currentStatistics.optional.currentYearSprint.currentYear || '',
      };
    };

    if (currentStatistics.optional.currentYearChallenge) {
      newStat.optional.currentYearChallenge = {
        learnedWords: currentStatistics.optional.currentYearChallenge.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.currentYearChallenge.correctAnswersCount || 0,
        allAnswersCount: currentStatistics.optional.currentYearChallenge.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.currentYearChallenge.createdUserWordsCount || 0,
        currentYear: '',
      };
    };

    if (currentStatistics.optional.currentMonthSprint) {
      newStat.optional.currentMonthSprint = {
        learnedWords: currentStatistics.optional.currentMonthSprint.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.currentMonthSprint.correctAnswersCount || 0,
        allAnswersCount: currentStatistics.optional.currentMonthSprint.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.currentMonthSprint.createdUserWordsCount || 0,
        currentMonth: currentStatistics.optional.currentMonthSprint.currentMonth || '',
      };
    };

    if (currentStatistics.optional.currentMonthChallenge) {
      newStat.optional.currentMonthChallenge = {
        learnedWords: currentStatistics.optional.currentMonthChallenge.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.currentMonthChallenge.correctAnswersCount || 0,
        allAnswersCount: currentStatistics.optional.currentMonthChallenge.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.currentMonthChallenge.createdUserWordsCount || 0,
        currentMonth: currentStatistics.optional.currentMonthChallenge.currentMonth || '',
      };
    };

    if (currentStatistics.optional.currentDaySprint) {
      newStat.optional.currentDaySprint = {
        learnedWords: currentStatistics.optional.currentDaySprint.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.currentDaySprint.correctAnswersCount || 0,
        longestCorrectRange: currentStatistics.optional.currentDaySprint.longestCorrectRange || 0,
        allAnswersCount: currentStatistics.optional.currentDaySprint.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.currentDaySprint.createdUserWordsCount || 0,
        currentDay: currentStatistics.optional.currentDaySprint.currentDay || '',
      };
    };

    if (currentStatistics.optional.currentDayChallenge) {
      newStat.optional.currentDayChallenge = {
        learnedWords: currentStatistics.optional.currentDayChallenge.learnedWords || 0,
        correctAnswersCount: currentStatistics.optional.currentDayChallenge.correctAnswersCount || 0,
        longestCorrectRange: currentStatistics.optional.currentDayChallenge.longestCorrectRange || 0,
        allAnswersCount: currentStatistics.optional.currentDayChallenge.allAnswersCount || 0,
        createdUserWordsCount: currentStatistics.optional.currentDayChallenge.createdUserWordsCount || 0,
        currentDay: currentStatistics.optional.currentDayChallenge.currentDay || '',
      };
    };

    return newStat;
  }
}

export {
  statisticsType,
  Statistics,
};