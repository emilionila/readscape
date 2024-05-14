import { useParams } from 'react-router-dom';
import './SharedPage.scss'
import { BackButton } from '../../components/backButton';
import ReadingListItem from '../../components/readingListItem/readingListItem';

export const SharedPage = () => {
    const { userId } = useParams()

    return (
        <>
            <BackButton />
            <ReadingListItem userId={userId} />
        </>
    );
};