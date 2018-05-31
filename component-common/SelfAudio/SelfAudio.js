import React from "react";
import PropTypes from "prop-types";
import "./SelfAudio.less";

export class SelfAudio extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isPlay: false,
      currentTime: 0,
      allTime: 0,
      begin: 0
    };
  }

  audioStatusChange() {
    const { isPlay } = this.state;

    this.audio[isPlay ? "pause" : "play"]();

    this.setState({ isPlay: !isPlay });
  }

  readyToPlay() {
    const { autoPlay } = this.props;
    const audio = this.audio;
    const { duration: allTime } = audio;

    if (allTime !== 0) {
      this.setState({ allTime });
      // 是否自动播放
      if (autoPlay) {
        audio.play();
        this.setState({ isPlay: !!autoPlay });
      }
    }
  }

  getCurrentPlayTime() {
    const { currentTime } = this.audio;

    this.setState({ currentTime });
  }

  /**
   * format time
   * @param {time} time
   */
  millisecondToDate(time) {
    const second = Math.floor(time % 60);
    const minite = Math.floor(time / 60);
    // format: 00:00
    return `${minite}:${second >= 10 ? second : `0${second}`}`;
  }

  // distance
  handleTouchStart(e) {
    const { frozen = false } = this.props;
    const { isPlay } = this.state;
    const { pageX: begin } = e.touches[0];
    // 是否禁用滑动
    if (frozen) return;
    // 先让播放器暂停
    if (isPlay) this.audio.pause();
    // 存入滑动状态
    this.setState({ begin });
  }

  handleTouchMove(e) {
    const { begin, allTime } = this.state;
    const { pageX } = e.touches[0];
    const { width: maxRange, left } = this.maxRangeEl.getBoundingClientRect();

    if (begin !== 0) {
      // 滑动的距离
      const distance = pageX - left;
      const target = allTime * (distance / maxRange);
      // 考虑超出的情况
      if (target > allTime) {
        this.audio.currentTime = allTime;

        this.setState({ currentTime: allTime });
      } else if (target < 0) {
        this.audio.currentTime = 0;

        this.setState({ currentTime: 0 });
      } else {
        this.audio.currentTime = target;

        this.setState({ currentTime: target });
      }
    }
  }

  handleTouchEnd(e) {
    const audio = this.audio;
    const { isPlay } = this.state;
    console.log(isPlay);

    if (isPlay) audio.play();

    this.setState({ begin: 0 });
  }

  jumpToVoice(e) {
    const { jump = true } = this.props;
    // 是否跳转
    if (!jump) return;

    const { allTime } = this.state;
    const { pageX, target } = e.touches[0];
    const { width, left } = this.maxRangeEl.getBoundingClientRect();
    // console.log(pageX, left, width)
    const currentTime = (pageX - left) / width * allTime;

    this.audio.currentTime = currentTime;
    this.setState({ currentTime });
  }

  render() {
    const {
      source = "http://65.ierge.cn/13/206/412922.mp3",
      poster = "",
      name = "测试音频"
    } = this.props;
    const { currentTime, allTime, isPlay } = this.state;

    const startTime = this.millisecondToDate(currentTime);
    const endTime = this.millisecondToDate(allTime);

    const currentRange = `${
      currentTime > 0 ? currentTime / allTime * 100 : 0
    }%`;

    return (
      <div className="self-audio-play">
        <div className="poster" style={{ backgroundImage: `url(${poster})` }}>
          <div className="play" onClick={this.audioStatusChange.bind(this)}>
            {isPlay ? "暂停" : "播放"}
          </div>
        </div>
        <div className="audio-wrap">
          <audio
            id="audio-source"
            onCanPlay={this.readyToPlay.bind(this)}
            onTimeUpdate={this.getCurrentPlayTime.bind(this)}
            ref={audio => (this.audio = audio)}
            src={source}
          />
          <div className="controls">
            <div className="title">{name}</div>
            <div
              className="range-wrap"
              onTouchStart={this.jumpToVoice.bind(this)}
              ref={el => (this.maxRangeEl = el)}
            >
              <div className="range" style={{ width: currentRange }}>
                <span
                  className="sign"
                  onTouchStart={this.handleTouchStart.bind(this)}
                  onTouchMove={this.handleTouchMove.bind(this)}
                  onTouchEnd={this.handleTouchEnd.bind(this)}
                />
              </div>
            </div>
            <div className="times-show">
              <span className="start">{startTime}</span>
              <span className="end">{endTime}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SelfAudio.propTypes = {
  source: PropTypes.string,
  poster: PropTypes.string,
  name: PropTypes.string,
  jump: PropTypes.bool,
  frozen: PropTypes.bool,
  autoPlay: PropTypes.bool
};

export default SelfAudio;
