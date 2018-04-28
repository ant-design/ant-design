import * as React from 'react';

// Better place for this?
export interface FolderProps {
  open: boolean;
}

export const Folder: React.StatelessComponent<FolderProps> = ({ open = false }) => {
  if (open) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 48 48"
        version="1.0"
        viewBox="0 0 48 48"
        width="100%"
        x="0px"
        y="0px"
      >
        <g>
          <path
            d="M38,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h31c1.7,0,3-1.3,3-3V16C42,13.8,40.2,12,38,12z"
            fill="#FFA000"
          />
        </g>
        <g>
          <path
            d="M42.2,18H15.3c-1.9,0-3.6,1.4-3.9,3.3L8,40h31.7c1.9,0,3.6-1.4,3.9-3.3l2.5-14C46.6,20.3,44.7,18,42.2,18z"
            fill="#FFCA28"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      enable-background="new 0 0 48 48"
      version="1.0"
      viewBox="0 0 48 48"
      width="100%"
      x="0px"
      y="0px"
    >
      <g>
        <path
          d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
          fill="#FFA000"
        />
      </g>
      <g>
        <path
          d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
          fill="#FFCA28"
        />
      </g>
    </svg>
  );
};
