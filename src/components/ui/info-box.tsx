import React from "react";
import styles from "./info-box.module.css";
import Skeleton from "./skeleton";

interface InfoBoxProps {
  renderIcon?: React.ReactNode;
  first?: {
    label: string;
    value?: React.ReactNode;
  }[];
  second?: {
    label: string;
    value?: React.ReactNode;
  }[];
  third?: {
    label: string;
    value?: React.ReactNode;
  }[];
}

const InfoBox: React.FC<InfoBoxProps> = ({
  renderIcon,
  first,
  second,
  third,
}) => {
  return (
    <div className={styles.box}>
      <div className={styles.first}>
        {renderIcon && <div className={styles.icon}>{renderIcon}</div>}
        {first?.map((item) => (
          <div key={item.label} className={styles.item}>
            <h4>{item.label}</h4>
            <div className={styles.value}>
              {item.value ?? <Skeleton width={"70px"} />}
            </div>
          </div>
        ))}
      </div>
      {(second || third) && (
        <div className={styles.bottom}>
          {second && (
            <div className={styles.second}>
              {second?.map((item) => (
                <div key={item.label} className={styles.item}>
                  <h4>{item.label}</h4>
                  <div className={styles.value}>
                    {item.value ?? <Skeleton width={"70px"} />}
                  </div>
                </div>
              ))}
            </div>
          )}
          {third && (
            <div className={styles.third}>
              {third?.map((item) => (
                <div key={item.label} className={styles.item}>
                  <h4>{item.label}</h4>
                  <div className={styles.value}>
                    {item.value ?? <Skeleton width={"70px"} />}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfoBox;

const InfoBoxGrid: React.FC<{
  children: React.ReactNode;
  minBoxWidth?: number;
  className?: string;
}> = ({ children, minBoxWidth = 270, className }) => {
  return (
    <div
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(${minBoxWidth}px, 1fr))`,
      }}
      className={[styles.grid, className].filter((v) => v).join(" ")}
    >
      {children}
    </div>
  );
};

export { InfoBoxGrid };
