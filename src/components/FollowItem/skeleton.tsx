import React from "react";
import clasess from "./skeleton.module.scss";
export default function Skeleton() {
  return (
    <div className={clasess.skeleton}>
      <div className={clasess.skeleton_avatar}></div>
      <div className={clasess.skeleton_title}></div>
      <div className={clasess.skeleton_email}></div>
    </div>
  );
}
