import React, { useEffect, useState } from 'react';
import { ProfileIcon } from '../../assets/icons';
import { ShortInput } from '../../components/shortInput';
import { CustomButton } from '../../components/customButton';
import useAuth from '../../db/user';
import { firestore } from '../../db/db';

import { doc, getDoc } from 'firebase/firestore';
import { getAuth, deleteUser } from 'firebase/auth';

export const ProfileSettingsPage = () => {
  const user = useAuth();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  useEffect(() => {
    const getUserData = async () => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()){
          setName(docSnap.get('name'))
          setSurname(docSnap.get('surname'))
        }
      }
    }

    getUserData();
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);

  

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Perform save logic (e.g., update profile in database)
    console.log('Profile updated:', { name, surname });
  };

  const handleLogout = () => {
    
  }

  const handleDeleteAccount = () => {
    const currentUser = getAuth().currentUser;

    // Perform delete account logic (e.g., show confirmation modal)
    console.log(currentUser);
  };


  return (
    <div className="profile-settings-container">
      <div className="profile-picture">
        <ProfileIcon width="140px" height="140px"/>
      </div>
      <div className="profile-info">
        {isEditing ? (
          <>
            <ShortInput 
              label={"Name"}
              type={"text"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"Type name..."}
            />
            <ShortInput 
              label={"Surname"}
              type={"text"}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder={"Type surname..."}
            />
          </>
        ) : (
          <>
            <div>{name}</div>
            <div>{surname}</div>
          </>
        )} 
        {isEditing ? (
          <button onClick={handleSaveClick}>Save Changes</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
        <CustomButton
          title={"Logout"}
          type={"button"}
          disabled={false}
          onClick={handleLogout}
          loading={false}
        />
        <CustomButton
          title={"Delete This Account"}
          type={"button"}
          disabled={false}
          onClick={handleDeleteAccount}
          btnStyle={"danger"}
          loading={false}
        />
      </div>
    </div>
  );
};
