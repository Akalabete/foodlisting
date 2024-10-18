import React from 'react';
import { useState } from 'react';
import styles from './Modal.module.scss';
import { ModalProps } from '../../models/modal.d';



const Modal : React.FC<ModalProps> = ({show, children}) => {
    const [modalOpen, setModalOpen] = useState(show);   
    const handleModalClose = () => {
        setModalOpen(false);
    } 
    const showHideClassName = modalOpen ? 'modal display-block' : 'modal display-none';
    return (
        <div className={showHideClassName}>
        <section className={styles.modalContainer}>
            {children}
            <button onClick={handleModalClose}>Close</button>
        </section>
        </div>
    );
};

export default Modal;