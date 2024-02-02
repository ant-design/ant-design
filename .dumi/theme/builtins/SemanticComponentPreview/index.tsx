import React from 'react';

export interface SemanticComponentPreviewProps {
  component: string;
  semantic: string;
}

const SemanticComponentPreview = (props: SemanticComponentPreviewProps) => {
  const { component, semantic } = props;

  return (
    <div>
      {component}, {semantic}
    </div>
  );
};

export default SemanticComponentPreview;
