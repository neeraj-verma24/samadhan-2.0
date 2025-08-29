import React from 'react';
import './ProfileCard.css';

const ProfileCard = (props) => {
  return (
    <div className="profile-card">
      {props.image && <img src={props.image} alt={Profile of ${props.name}} className="profile-image" />}
      <div className="profile-details">
        <h2 className="profile-name">{props.name}</h2>
        <p className="profile-status">{props.status}</p>
        <p className="profile-email">
          <a href={mailto:${props.email}}>{props.email}</a>
        </p>
        <p className="profile-phone">
          <a href={tel:${props.phone}}>{props.phone}</a>
        </p>
        <p className="profile-linkedin">
          <a href={props.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;