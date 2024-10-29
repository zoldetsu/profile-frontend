import clasess from "./skeleton.module.scss";
import { useAppSelector } from "../../redux/store";
export default function Skeleton() {
  const { theme } = useAppSelector((state) => state.SwitchTheme);
  return (
    <div className={`${clasess.skeleton} ${clasess[theme]}`}>
      <div className={`${clasess.skeleton_avatar} ${clasess[theme]}`}></div>
      <div className={`${clasess.skeleton_title} ${clasess[theme]}`}></div>
      <div
        className={`${clasess.skelskeleton_emaileton} ${clasess[theme]}`}
      ></div>
    </div>
  );
}
