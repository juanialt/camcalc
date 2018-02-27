import React from 'react';
import ReactDOM from 'react-dom';
import { isEqual } from 'lodash';

import './base.styl';
import './styles.styl';

const iso = ['12800', '10000', '8000', '6400', '5000', '4000', '3200', '2500',
             '2000', '1600', '1250', '1000', '800', '640', '500', '400',
             '320', '250', '200', '160', '125', '100', '80', '64', '50',
             '40', '32', '25', '20', '16', '12', '10', '8', '6', '5', '4', '3'];

const apperture = ['1.4', '1.6', '1.8', '2', '2.2', '2.5', '2.8', '3.2',
                   '3.5', '4', '4.5', '5', '5.6', '6.3', '7.1', '8', '9',
                   '10', '11', '13', '14', '16', '18', '20', '22', '25',
                   '29', '32', '36', '40', '45', '51', '57', '64', '72', '81', '90'];

const time = ['1h', '50m', '40m', '30m', '25m', '20m',
              '15m', '13m', '10m', '8m', '6m', '5m',
              '4m', '3.2m', '2.5m', '2m', '1.6m', '1.3m',
              '1m', '50s', '40s', '30s', '25s', '20s',
              '15s', '13s', '10s', '8s', '6s', '5s',
              '4s', '3.2s', '2.5s', '2s', '1.6s', '1.3s',
              '1s', '0.8s', '0.6s', '1/2', '0.4s', '0.3',
              '1/4', '1/5', '1/6', '1/8', '1/10', '1/13',
              '1/15', '1/20', '1/25', '1/30', '1/40', '1/50',
              '1/60', '1/80', '1/100', '1/125', '1/160', '1/200',
              '1/250', '1/320', '1/400', '1/500', '1/640', '1/800',
              '1/1000', '1/1250', '1/1600', '1/2000', '1/2500', '1/3200',
              '1/4000', '1/5000', '1/6400', '1/8000'];

const seq = [1, 1.3, 1.6, 2, 2.5, 3.2, 4, 5, 6, 8, 10, 13, 15, 20, 25, 30, 40, 50]

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      varParam: 'iso',

      isoA: iso[Math.round(iso.length/2)],
      appertureA: apperture[Math.round(apperture.length/2)],
      timeA: '1s',

      isoB: iso[Math.round(iso.length/2)],
      appertureB: apperture[Math.round(apperture.length/2)],
      timeB: '1s',

      isoResult: null,
      appertureResult: null,
      timeResult: null
    };

    this.handleCalculate();
  }

  getPosDifference (el1, el2, array) {
    const pos1 = array.indexOf(el1);
    const pos2 = array.indexOf(el2);

    return (pos1 - pos2)/3;
  }

  handleCalculate = () => {
    const { isoA, appertureA, timeA,
            isoB, appertureB, timeB,
            varParam} = this.state;

    const isoDiff = this.getPosDifference(isoA, isoB, iso);
    const appertureDiff = this.getPosDifference(appertureA, appertureB, apperture);
    const timeDiff = this.getPosDifference(timeA, timeB, time);

    let isoResult = isoB;
    let appertureResult = appertureB;
    let timeResult = timeB;

    switch (varParam) {
      case 'iso':
        isoResult = iso[iso.indexOf(isoA) + (appertureDiff + timeDiff) * 3];
      break;
      case 'apperture':
        appertureResult = apperture[apperture.indexOf(appertureA) + (isoDiff + timeDiff) * 3];
      break;
      case 'time':
        timeResult = time[time.indexOf(timeA) + (isoDiff + appertureDiff) * 3];
      break;
    }

    this.setState({
      isoResult,
      appertureResult,
      timeResult
    });
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleScrollSelect = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.state, prevState)) {
      this.handleCalculate();
    }
  }

  componentDidMount() {
    const { isoA, appertureA, timeA, isoB, appertureB, timeB } = this.state;

    const isoElementA = document.getElementById(`isoA${isoA}`);
    const appertureElementA = document.getElementById(`appertureA${appertureA}`);
    const timeElementA = document.getElementById(`timeA${timeA}`);

    const isoElementB = document.getElementById(`isoB${isoB}`);
    const appertureElementB = document.getElementById(`appertureB${appertureB}`);
    const timeElementB = document.getElementById(`timeB${timeB}`);

    isoElementA.scrollIntoView({behavior: "instant", block: "center", inline: "center"});
    appertureElementA.scrollIntoView({behavior: "instant", block: "center", inline: "center"});
    timeElementA.scrollIntoView({behavior: "instant", block: "center", inline: "center"});

    isoElementB.scrollIntoView({behavior: "instant", block: "center", inline: "center"});
    appertureElementB.scrollIntoView({behavior: "instant", block: "center", inline: "center"});
    timeElementB.scrollIntoView({behavior: "instant", block: "center", inline: "center"});

    this.handleCalculate();
  }

  render() {
    const { headerText } = this.props;
    const { isoA, appertureA, timeA,
            isoB, appertureB, timeB,
            isoResult, appertureResult, timeResult, varParam } = this.state;

    return (
      <section className="my-component">
        <section className="config-container config-one">

          <div className="values-container">
            <div className="title">ISO</div>
            <div className="scroll-container">
              {iso.map((value, index) =>
              <div
                id={`isoA${value}`}
                key={index}
                onClick={() => this.handleScrollSelect('isoA', value)}
                className={isoA === value ? 'value selected' : 'value'}>{value}</div>)}
            </div>
          </div>

          <div className="values-container">
            <div className="title">F</div>
            <div className="scroll-container">
              {apperture.map((value, index) =>
              <div
                id={`appertureA${value}`}
                key={index}
                onClick={() => this.handleScrollSelect('appertureA', value)}
                className={appertureA === value ? 'value selected' : 'value'}>{value}</div>)}
            </div>
          </div>

          <div className="values-container">
            <div className="title">TIME</div>
            <div className="scroll-container">
              {time.map((value, index) =>
              <div
                id={`timeA${value}`}
                key={index}
                onClick={() => this.handleScrollSelect('timeA', value)}
                className={timeA === value ? 'value selected' : 'value'}>{value}</div>)}
            </div>
          </div>
        </section>

        <section className="config-contaienr config-two">
          <div className="values-container">
            <div className={varParam === 'iso' ? 'title selected' : 'title'} onClick={() => this.handleScrollSelect('varParam', 'iso')}>ISO</div>
            {
              varParam === 'iso' && <div className="blocker"></div>
            }
            <div className="scroll-container" id="iso-config-two">
              {iso.map((value, index) =>
              <div
                id={`isoB${value}`}
                key={index}
                onClick={() => this.handleScrollSelect('isoB', value)}
                className={isoB === value ? 'value selected' : 'value'}>{varParam === 'iso' ? '?' : value}</div>)}
            </div>
          </div>

          <div className="values-container">
            <div className={varParam === 'apperture' ? 'title selected' : 'title'} onClick={() => this.handleScrollSelect('varParam', 'apperture')}>F</div>
            {
              varParam === 'apperture' && <div className="blocker"></div>
            }
            <div className="scroll-container">
              {apperture.map((value, index) =>
              <div
                id={`appertureB${value}`}
                key={index}
                onClick={() => this.handleScrollSelect('appertureB', value)}
                className={appertureB === value ? 'value selected' : 'value'}>{varParam === 'apperture' ? '?' : value}</div>)}
            </div>
          </div>

          <div className="values-container">
            <div className={varParam === 'time' ? 'title selected' : 'title'} onClick={() => this.handleScrollSelect('varParam', 'time')}>TIME</div>
            {
              varParam === 'time' && <div className="blocker"></div>
            }
            <div className="scroll-container">
              {time.map((value, index) =>
              <div
                id={`timeB${value}`}
                key={index}
                onClick={() => this.handleScrollSelect('timeB', value)}
                className={timeB === value ? 'value selected' : 'value'}>{varParam === 'time' ? '?' : value}</div>)}
            </div>
          </div>
        </section>

        <section className="results">
          <div className="iso-result">
            <span>{isoResult || '???'}</span>
            <span className="title">ISO</span>
          </div>
          <div className="apperture-result">
            <span>{appertureResult || '???'}</span>
            <span className="title">F</span>
          </div>
          <div className="time-result">
            <span>{timeResult || '???'}</span>
            <span className="title">Time</span>
          </div>
        </section>
      </section>
    );
  }
}

ReactDOM.render(
  <MyComponent />,
  document.getElementById('app')
);
