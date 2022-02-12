import './bottom.css';

const AudiochallengeBottomContent = {
  render: async (): Promise<string>  => {
    const view = `
    <div class="audiochallenge-container__dont-know">
      <span>I don't know</span>
    </div>
    <div class="audiochallenge-container__next"></div>`;
    return view;
  }
};

export default AudiochallengeBottomContent;