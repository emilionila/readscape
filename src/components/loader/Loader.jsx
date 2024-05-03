import styles from './Loader.module.scss';

export const Loader = () => {

    return (
        <div className={styles.lineSpinFadeLoader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
