"use client";

import { useState } from "react";
import styles from "./label.module.css";
import { t } from "@/i18n";

interface LabelProps {
  value: string;
  maxLength?: number;
  showCopy?: boolean;
  title?: string;
  style?: React.CSSProperties;
}

function shrink(str: string, maxLength: number): string {
  if (typeof str != "string" || str.length <= maxLength) {
    return str;
  }
  const ellipsis = "...";
  const charsToShow = maxLength - ellipsis.length;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    str.substring(0, frontChars) +
    ellipsis +
    str.substring(str.length - backChars)
  );
}

export default function Label({
  style,
  value,
  maxLength,
  showCopy,
  title,
}: LabelProps) {
  const [copied, setCopied] = useState(false);

  let shortValue = value;
  if (maxLength) {
    shortValue = shrink(value, maxLength);
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div style={style} className={styles.labelContainer}>
      <span title={title ?? value}>{copied ? t("copied") : shortValue}</span>
      {showCopy && value && (
        <button onClick={handleCopy} className={styles.copyButton}>
          {copied ? <CopiedIcon /> : <CopyIcon />}
        </button>
      )}
    </div>
  );
}

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.3em"
    height="1.3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M16 12.9v4.2c0 3.5-1.4 4.9-4.9 4.9H6.9C3.4 22 2 20.6 2 17.1v-4.2C2 9.4 3.4 8 6.9 8h4.2c3.5 0 4.9 1.4 4.9 4.9z"
    ></path>
    <path
      fill="currentColor"
      d="M17.1 2h-4.2C9.45 2 8.05 3.37 8.01 6.75h3.09c4.2 0 6.15 1.95 6.15 6.15v3.09c3.38-.04 4.75-1.44 4.75-4.89V6.9C22 3.4 20.6 2 17.1 2z"
      opacity="0.4"
    ></path>
  </svg>
);

const CopiedIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1.3em"
    height="1.3em"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M17.1 2h-4.2C9.45 2 8.05 3.37 8.01 6.75h3.09c4.2 0 6.15 1.95 6.15 6.15v3.09c3.38-.04 4.75-1.44 4.75-4.89V6.9C22 3.4 20.6 2 17.1 2z"
      opacity="0.4"
    ></path>
    <path
      fill="currentColor"
      d="M11.1 8H6.9C3.4 8 2 9.4 2 12.9v4.2C2 20.6 3.4 22 6.9 22h4.2c3.5 0 4.9-1.4 4.9-4.9v-4.2C16 9.4 14.6 8 11.1 8zm1.19 5.65l-3.71 3.71a.71.71 0 01-.51.21.71.71 0 01-.51-.21L5.7 15.5a.712.712 0 010-1.01c.28-.28.73-.28 1.01 0l1.35 1.35 3.21-3.21c.28-.28.73-.28 1.01 0s.29.74.01 1.02z"
    ></path>
  </svg>
);
