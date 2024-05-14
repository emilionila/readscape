import './CommunityPage.scss';
import {CustomButton} from '../../components/customButton';
import { BackButton } from '../../components/backButton';
import useAuth from '../../db/user';

import { QR } from 'react-qr-rounded';
import { useEffect, useState } from 'react';

export const CommunityPage = () => {
    const user = useAuth();
    const [userLink, setUserLink] = useState('');

    useEffect(() => {
        const generateLink = () => {
            setUserLink(`${window.location.origin}/sharedBooks/${user.firestoreUserId}`)
        }

        generateLink();

    }, []);
    
    const handleCopyClick = () => {
        navigator.clipboard.writeText(userLink)
    }

    return (
        <>
            <BackButton />
            <div className='communityContainer'>
                <p className='textContainer'>SHARE YOUR BOOKS</p>
                <div className='qrContainer'>
                    <QR className='qrcode'
                        color='#2B3E50'
                        backgroundColor='#6EAA89'
                        rounding={65}
                    >
                        {userLink}
                    </QR>
                </div>
                <div className='divider'></div>
                <CustomButton 
                    title={"Copy share link"}
                    type={"button"}
                    disabled={false}
                    onClick={handleCopyClick}
                    loading={false}
                />
            </div>
        </>
    );
};