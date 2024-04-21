import React from "react";

export const ProfileIcon = ({ width, height }) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.4" d="M12.1207 12.78C12.0507 12.77 11.9607 12.77 11.8807 12.78C10.1207 12.72 8.7207 11.28 8.7207 9.50998C8.7207 7.69998 10.1807 6.22998 12.0007 6.22998C13.8107 6.22998 15.2807 7.69998 15.2807 9.50998C15.2707 11.28 13.8807 12.72 12.1207 12.78Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path opacity="0.34" d="M18.7398 19.3801C16.9598 21.0101 14.5998 22.0001 11.9998 22.0001C9.39977 22.0001 7.03977 21.0101 5.25977 19.3801C5.35977 18.4401 5.95977 17.5201 7.02977 16.8001C9.76977 14.9801 14.2498 14.9801 16.9698 16.8001C18.0398 17.5201 18.6398 18.4401 18.7398 19.3801Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export const OpenBookIcon = ({ width, height }) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path fill="#fff" d="M0 0H24V24H0z"></path>
          <path
            stroke="#000"
            strokeLinejoin="round"
            d="M12 6.91c-1.1-1.401-2.796-2.801-6.999-2.904A.491.491 0 004.5 4.5v12.097c0 .276.225.493.501.502 4.203.137 5.899 2 6.999 3.401m0-13.59c1.1-1.401 2.796-2.801 6.999-2.904a.487.487 0 01.501.489v12.101a.51.51 0 01-.501.503c-4.203.137-5.899 2-6.999 3.401m0-13.59V20.5"
          ></path>
          <path
            stroke="#000"
            strokeLinejoin="round"
            d="M19.235 6H21.5a.5.5 0 01.5.5v13.039c0 .405-.477.673-.846.51-.796-.354-2.122-.786-3.86-.786C14.353 19.263 12 21 12 21s-2.353-1.737-5.294-1.737c-1.738 0-3.064.432-3.86.785-.37.164-.846-.104-.846-.509V6.5a.5.5 0 01.5-.5h2.265"
          ></path>
        </svg>
      );
};

export const SearchIcon = ({ width, height }) => {
    return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={width}
          height={height}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 6a5 5 0 015 5m.659 5.655L21 21m-2-10a8 8 0 11-16 0 8 8 0 0116 0z"
          ></path>
        </svg>
    );
};

