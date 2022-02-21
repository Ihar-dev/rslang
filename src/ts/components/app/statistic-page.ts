import StatisticRender from "../view/statistics/statistic-render";
import '../view/statistics/statistics.css';


class RenderStatistic {
    
    renderStatisticPage = async()=> {
      const page: HTMLElement = document.querySelector('.page-container') as HTMLElement;
      page.innerHTML = await StatisticRender.render();

    }

}

export default RenderStatistic;