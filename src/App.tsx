import React from 'react';
import { LicenseInfo } from '@mui/x-data-grid-pro';

import DataGridMapper from './DataGridMapper/DataGridMapper';

LicenseInfo.setLicenseKey(import.meta.env.VITE_MUI_PRO_KEY as string)    

const App: React.FC = () => {
  return (<DataGridMapper />)
}

export default App;