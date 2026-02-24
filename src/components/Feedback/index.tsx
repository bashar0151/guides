import React from 'react';
import { Widget } from '@happyreact/react';
import '@happyreact/react/dist/style.css';

export default function Feedback({ resource }: { resource: string }) {
  return (
    <div style={{ 
      marginTop: '2rem', 
      padding: '1.5rem', 
      borderTop: '1px solid var(--ifm-hr-border-color)',
      textAlign: 'center' 
    }}>
      <h3 style={{ marginBottom: '1rem' }}>Was this guide helpful?</h3>
      <Widget
        token="c5377165-5131-4668-9cb2-a3a08ac7be54" 
        resource={resource}
      />
    </div>
  );
}