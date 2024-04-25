import {CustomButton} from "../../components/customButton";
import "./WelcomePage.scss";
import WelcomeImage from "../../images/welcome.svg";
import {useNavigate} from "react-router-dom";

export const WelcomePage = () => {
    const disabled = false;
    let navigate = useNavigate();
    const handleSignUpClick = () => {
       navigate('signup');
    }

    const handleLogInClick = () => {
        navigate('/login');
    }

    return (
        <div className="container">
            <img
                src={WelcomeImage}
                alt="welcome image"
                className="welcomeImage"
            />
            <h2 className='title'>
                Let's start your reading journey?
            </h2>
            <CustomButton
                type={'submit'}
                title={'LogIn'}
                disabled={disabled}
                onClick={handleLogInClick}
                btnStyle='full'
            />

            <CustomButton
                type={'submit'}
                title={'SignUp'}
                disabled={disabled}
                onClick={handleSignUpClick}
                btnStyle='empty'
            />
        </div>
    )
}
