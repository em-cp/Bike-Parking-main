import React from 'react';
import Link from 'next/link';
import styles from './AdminModal.module.css'; // Ensure the path is correct

const AdminModal: React.FC = () => {
  return (
    <div className={styles.modalContainer}>
      <h1 className={styles.modalTitle}>Admin Dashboard</h1>
      <ul className={styles.actionList}>
        {/* Link to the Dashboard page within your app */}
        <li>
          <Link href="/admin/dashboard">
            <span className={styles.actionLink}>View Dashboard</span>
          </Link>
        </li>
        {/* Link to the Home/Login page */}
        <li>
          <Link href="/login">
            <span className={styles.actionLink}>Log Out</span>
          </Link>
        </li>
        {/* Link to the Settings page within the Admin section */}
        <li>
          <Link href="/admin/settings">
            <span className={styles.actionLink}>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminModal;