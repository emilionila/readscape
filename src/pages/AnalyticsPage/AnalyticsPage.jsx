import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import WorkingImg from '../../images/Working.svg';
import styles from './AnalyticsPage.module.scss'


export const AnalyticsPage = () => {

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <img
                    src={WorkingImg}
                    alt="in progress picture"
                    className={styles.workingPicture}
                />
                <h2 className={styles.analyticsTitle}>Comming Soon: Analytics</h2>
                <p className={styles.analyticsSubtitle}>
                    Track your reading progress by upcoming analytics feature which empowers readers with insights,
                    trends, and
                    personalized recommendations for an enriched reading experience.
                </p>
                <p className={styles.analyticsSubtitle}>
                    Stay tuned!
                </p>
            </div>
            <Footer/>
        </>
    )
}
