import React from "react";
import classNames from "classnames";
import "./Badge.scss";

const Badge = ({ color, click, className }) => (
  <i
    onClick={click}
    className={classNames("badge", {[`badge--${color}`]: color}, className)}
  ></i>
);

export default Badge;
