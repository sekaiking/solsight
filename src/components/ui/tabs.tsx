import Link from "next/link";
import styles from "./tabs.module.css";

interface Tab {
  label: string;
  href: string;
  active?: boolean;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={tab.href}
          className={styles.tab + (tab.active ? " " + styles.active : "")}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
};

export default Tabs;
