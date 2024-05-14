import React from 'react';
import './CommunityPage.scss';
import {CustomButton} from '../../components/customButton';
import { BackButton } from '../../components/backButton';

import { QR } from 'react-qr-rounded';
import { useEffect, useState } from 'react';

export const CommunityPage = ({ userId }) => {
    const [userLink, setUserLink] = useState('');
    const [showCopySuccess, setShowCopySuccess] = useState(false);

    useEffect(() => {
        const generateLink = () => {
            setUserLink(`${window.location.origin}/sharedBooks/${userId}`)
        }

        generateLink();

    }, []);
    
    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(userLink)
            setShowCopySuccess(true);
            setTimeout(() => {
                setShowCopySuccess(false);
            }, 3000);
        }
        catch {

        }
            
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
                {showCopySuccess && <div className="copy-success show">Your readlist link copied</div>}
            </div>
        </>
    );
};