import React from "react";
import styles from "./skeleton.module.css";

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  count?: number;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = "20px",
  borderRadius = "4px",
  count = 1,
}) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className={styles.skeleton}
          style={{ width, height, borderRadius, marginBottom: "10px" }}
        />
      ))}
    </>
  );
};

export default Skeleton;
