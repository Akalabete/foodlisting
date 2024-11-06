'use client'
import { ModalProps } from '../../models/modal';
import styles from './Modal.module.scss';

export default function Modal({isOpen, children,  onClose}:ModalProps){

    if (!isOpen) {
        return null;
    }
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                {children}
                <button className={styles.button} onClick={onClose}>Fermer</button>
            </div>
        </div>
    )
}