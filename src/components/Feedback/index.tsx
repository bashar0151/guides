import React from 'react';
import { Widget } from '@happyreact/react';

export default function Feedback({ resource }: { resource: string }) {
  return (
    <div style={{ 
      marginTop: '30px', 
      padding: '20px', 
      border: '2px solid #25c2a0', 
      borderRadius: '10px',
      textAlign: 'center' 
    }}>
      <h3 style={{ color: 'white', marginBottom: '15px' }}>Was this guide helpful?</h3>
      <div style={{ display: 'flex', justifyContent: 'center', minHeight: '50px' }}>
        <Widget
          token="c5377165-5131-4668-9cb2-a3a08ac7be54" 
          resource={resource}
          classes={{ container: 'hr-widget', button: 'hr-button' }}
        />
      </div>
    </div>
  );
}