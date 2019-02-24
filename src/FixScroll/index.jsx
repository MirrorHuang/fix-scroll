import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import './index.scss';
import { Object } from 'es6-shim';

export default class ScrollFix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // 是否已经吸顶
      isFixing: false,
    };
    this.handleFixed = this.handleFixed.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
    this.fixEleScrollTo = this.fixEleScrollTo.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  componentDidMount() {
    const { headEle, fixEle, config } = this.props;
    const IScroll = require('iscroll/build/iscroll-probe.js');
    const scrollWrappar = document.querySelector('.scroll-wrappar');
    const Config = Object.assign({
      probeType: 3,
      disableTouch: false,
      disablePointer: true,
      click: true,
      mouseWheel: true,
    }, config)
    this.bscroll = new IScroll(scrollWrappar, Config);

    // 吸顶距离
    const headEleDom = headEle ? document.querySelector(headEle) : null;
    const fixDistance = headEleDom ? headEle.offsetHeight : 0;
    // 需吸顶元素位置
    this.fixDOM = document.querySelector(fixEle);
    const { top: distance } = this.fixDOM.getBoundingClientRect();
    this.distanceToTop = distance - fixDistance + 2; /** 加2是为了适配安卓 */
    this.bscroll.on('scrollStart', this.onScrollStart.bind(this));
    this.bscroll.on('scroll', this.onScroll.bind(this));
    this.bscroll.on('scrollEnd', this.onScrollEnd.bind(this));
  }

  onScrollStart() {
    const { handleScrollStart } = this.props;
    if (handleScrollStart) {
      handleScrollStart();
    }
  }

  onScroll() {
    const { handleScroll } = this.props;
    const { isFixing } = this.state;
    if (handleScroll) {
      handleScroll({
        bscroll: this.bscroll,
        distanceToTop: this.distanceToTop,
        isFixing,
      });
    }
    this.handleFixed();
  }

  // 吸顶
  handleFixed() {
    const { y } = this.bscroll;
    const { isFixing } = this.state;
    const distance = this.distanceToTop + y;
    // 吸顶
    if (distance <= 0 && !isFixing) {
      this.fixDOM.style.transform = `translate(0px, ${-this
        .distanceToTop}px) scale(1) translateZ(0px)`;
      this.setState({
        isFixing: !isFixing,
      });
    }
    if (distance > 0) {
      if (isFixing) {
        this.setState({
          isFixing: !isFixing,
        });
      }
      this.fixDOM.style.transform = `translate(0px, ${y}px) scale(1) translateZ(0px)`;
    }
  }

  onScrollEnd() {
    const { handleScrollEnd } = this.props;
    if (handleScrollEnd) {
      handleScrollEnd();
    }
  }

  scrollTo({ x = 0, y = -this.distanceToTop, time, easing }) {
    this.bscroll.scrollTo(x, y, time, easing);
  }

  scrollToElement({ el, time, offsetX, offsetY, easing }) {
    if (!el) {
      return;
    }
    this.bscroll.scrollToElement(el, time, offsetX, offsetY, easing);
  }

  fixEleScrollTo({ x = 0, y = -this.distanceToTop }) {
    this.fixDOM.style.transform = `translate(${x}px, ${y}px) scale(1) translateZ(0px)`;
  }

  refresh() {
    this.bscroll.refresh();
  }

  render() {
    const { className } = this.props;
    return (
      <div
        className={cls('scroll-wrappar', className ? className : '')}
        id="scroll-wrappar"
      >
        <div>{this.props.children}</div>
      </div>
    );
  }
}

ScrollFix.propTypes = {
  headEle: PropTypes.string, // 头部元素类名
  fixEle: PropTypes.string, // 需要吸顶元素类名
  config: PropTypes.object, // iscroll配置
  className: PropTypes.string,
  handleScrollStart: PropTypes.func,
  handleScroll: PropTypes.func,
  handleScrollEnd: PropTypes.func,
};
ScrollFix.defaultProps = {
  fixEle: '.fix-scroll',
};
