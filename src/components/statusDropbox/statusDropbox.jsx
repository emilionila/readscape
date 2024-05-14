import React, { useState } from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../../db/db';
import './statusDropbox.scss';

const StatusDropbox = ({ bookId, userId, currentStatus, refreshList }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const statuses = ['Reading', 'Finished', 'Going To Read'];

    const handleStatusChange = async (status, e) => {
        e.stopPropagation();
        if (status !== currentStatus) {
            const userBookRef = doc(firestore, `users/${userId}/userBooks`, bookId);
            await updateDoc(userBookRef, { status: status });
            refreshList();
            setShowOptions(false);
        }
    };

    const confirmDelete = async () => {
        const userBookRef = doc(firestore, `users/${userId}/userBooks`, bookId);
        await deleteDoc(userBookRef);
        refreshList();
        setShowConfirm(false);
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setShowConfirm(true);
    };

    const toggleOptions = (e) => {
        e.stopPropagation();
        setShowOptions(!showOptions);
    };

    return (
        <div className="Dropbox__statusContainer" onClick={(e) => e.stopPropagation()}>
            <button onClick={toggleOptions} className="Dropbox__statusButton">
                {currentStatus || 'Set Status'}
            </button>
            {showOptions && (
                <ul className="Dropbox__dropdown">
                    {statuses.filter(status => status !== currentStatus).map(status => (
                        <li key={status} onClick={(e) => handleStatusChange(status, e)} className="Dropbox__statusOption">
                            {status}
                        </li>
                    ))}
                    <li onClick={handleDeleteClick} className="Dropbox__deleteButton">
                        Delete Book
                    </li>
                </ul>
            )}
            {showConfirm && (
                <div className="Dropbox__confirmDialog">
                    <p>Are you sure you want to delete this book from your collection?</p>
                    <button onClick={confirmDelete}>Yes</button>
                    <button onClick={() => setShowConfirm(false)}>No</button>
                </div>
            )}
        </div>
    );
};

export default StatusDropbox;
