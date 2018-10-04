import React, { Component } from 'react';
import './wheel.scss';

class Wheel extends Component {
  render() {
    const { degsRotated, items, radius, onClick } = this.props;
    const thetaDeg = 360/items.length;
    const thetaRad = thetaDeg * .0174533;
    const height = Math.abs((2 * radius * Math.sin(thetaRad/2)))+'px';
    const alt = radius * Math.cos(thetaRad/2);

    const faceCommon = {
      top: ((-1) * (parseInt(height, 10) / 2)) + 'px',
      width: '250px',
    }

    const axleStyle = {
      transform: `rotateX(${degsRotated}deg) rotateY(0deg)`,
      transition: 'transform 10s',
    }

    const elems = items.map((item, i) => {
      const deg = ((items.length - i) * thetaDeg) + 'deg';
      const offsetX = (alt * Math.cos(i * thetaRad)) + 'px';
      const offsetY = (alt * Math.sin(i * thetaRad)) + 'px';
      const faceStyle = {
        height: height,
        transform: `translate3d(0px, ${offsetY}, ${offsetX}) rotateX(${deg})`,
        // backgroundImage: `url(${item.imgUrl})`,
        backgroundPosition: 'center',
        backgroundSize: `200px ${height}`
      }
      const style = {...faceStyle, ...faceCommon}
      return (
        <div
          key={item.name}
          className={`face`}
          style={style}
          onClick={onClick}
        >
          {item.name}
        </div>
      );
    });

    return (
      <div className="wheel-container">
        <div className="axle" style={axleStyle}>
          {elems}
        </div>
      </div>
    );
  }
}

export default Wheel;
