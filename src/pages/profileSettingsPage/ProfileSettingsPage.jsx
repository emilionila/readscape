import React, { useEffect, useState } from 'react';
import { ProfileIcon } from '../../assets/icons';
import { ShortInput } from '../../components/shortInput';
import { CustomButton } from '../../components/customButton';
import { BackButton } from '../../components/backButton';
import useAuth from '../../db/user';
import { firestore } from '../../db/db';

import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
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
  
  const handleInputChange = (newValue, setter) => {
    setter(newValue);
  };

  const handleEditClick = () => {
    const getUserData = async () => {
      if (user) {
        const docRef = doc(firestore, 'users', user.uid)
        const docSnap = await getDoc(docRef);
        console.log(docSnap.get("name"))
      }
      else{
        console.log("no user")
      }
    }

    getUserData();
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
      
    const updateUserData = async () => {
      if (user) {
        console.log(user.email);
        const docRef = doc(firestore, 'users', user.uid)
        if (docRef.exists){
          console.log("exsist");
          await updateDoc(docRef, {
            name: name,
            surname: surname
          })
          console.log('Profile updated:', { name, surname });
        }
        else {
          console.log("not exist")
        }
      }
    }
  
    updateUserData();
  };

  const handleLogout = () => {
    
  }

  const handleDeleteAccount = () => {
    const currentUser = getAuth().currentUser;
    console.log(currentUser);
    deleteUser(currentUser)
    .then(() => {
      const updateUserData = async () => {
        if (user) {
          const docRef = doc(firestore, 'users', user.uid)
          await deleteDoc(docRef);
        }
      }

      updateUserData();
      console.log("deleted")
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <>
      <BackButton />
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
                onChange={(newValue) => handleInputChange(newValue, setName)}
                placeholder={"Type name..."}
              />
              <ShortInput 
                label={"Surname"}
                type={"text"}
                value={surname}
                onChange={(newValue) => handleInputChange(newValue, setSurname)}
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
    </>
  );
};
