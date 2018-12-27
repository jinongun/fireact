import React, { Component } from 'react';

import styles from './DateModal.scss';
import classNames from 'classnames/bind';

import Swiper from 'swiper/dist/js/swiper.js'
import './swiper.css'

const cx = classNames.bind(styles);

const Overlay = (props) => {
  return (
    <div className={`bg ${cx('bg')}`} onClick={props.close} />
  )

};

class DateModal extends Component {

  swipeGenerate = (start, end, char = '', ) => {
    let items = [];
    for (let i = start; i <= end; i++) {
      items.push(
        <div key={i} className={`swiper-slide ${cx('slide')}`}>{char + '' + i}</div>
      )
    }
    return items;
  }

  set = () => {
    const { props } = this;
    const date = document.querySelector('.dateSwiper1 .swiper-slide-active').innerText +
      '-' +
      document.querySelector('.dateSwiper2 .swiper-slide-active').innerText;
    console.log(date);
    props.set({ data: date, flag: 'DOB' });
    this.close();
  }
  close = () => {
    document.querySelector('.HistoryModal').onclick = null;
    document.querySelector('.HistoryModal').classList.remove(cx('enter'));
    document.querySelector('.bg').classList.remove(cx('enter'));

    document.querySelector('.HistoryModal').addEventListener("transitionend", (e) => {
      console.log(e);
      this.props.close();
    }, true);
  }
  componentDidUpdate(prevProps, prevState) {
    const { props } = this;
    if (props.visible && !prevProps.visible) {
      const swiper1 = new Swiper('.dateSwiper1', {
        direction: 'vertical',
        loop: false,
        slidesPerView: 5,
        centeredSlides: true,
      });
      const swiper2 = new Swiper('.dateSwiper2', {
        direction: 'vertical',
        loop: true,
        slidesPerView: 5,
        centeredSlides: true,
      });
      console.log(props.DOB.split('-')[0])
      swiper1.slideTo(parseInt(props.DOB.split('-')[0], 0) - 1950);
      swiper2.slideTo(parseInt(props.DOB.split('-')[1], 0) + 4);
      setTimeout(
        () => {
          document.querySelector('.HistoryModal').classList.add(cx('enter'));
          document.querySelector('.bg').classList.add(cx('enter'));
        },
        1
      )
    }
  }

  componentDidMount() {

  }
  render() {

    return (
      <React.Fragment>
        {
          this.props.visible ?
            <React.Fragment>
              <Overlay close={this.close} />
              <div className={`HistoryModal ${cx('HistoryModal')}`}>
                <div className={cx('header')}>
                  <span className={cx('title')}>Date of Birth</span>
                </div>
                <div className={cx('body')}>
                  <div className={cx('item')}>
                    <div className={cx('section')}>
                      <div className={cx('lense', 'left')} />
                      <div className={`dateSwiper1 ${cx('swiper-container')}`} >
                        <div className={`swiper-wrapper ${cx('wrap')}`}>
                          {this.swipeGenerate(1950, 2018)}
                        </div>
                      </div>
                    </div>
                    <div className={cx('section')}>
                      <div className={cx('lense', 'right')} />
                      <div className={`dateSwiper2 ${cx('swiper-container')}`}>
                        <div className={`swiper-wrapper ${cx('wrap')}`}>
                          {this.swipeGenerate(1, 12)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={cx('footer')}>
                  <button className={cx('btn')} onClick={this.close}>Cancel</button>
                  <button className={cx('btn')} onClick={this.set}>Confirm</button>
                </div>
              </div>

            </React.Fragment>
            :
            null
        }
      </React.Fragment>
    );
  }
}


export default DateModal;