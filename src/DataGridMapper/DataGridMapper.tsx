import React, { useEffect, useState } from 'react';
import { DataGridPro, GridColDef } from '@mui/x-data-grid-pro';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';

import { cats, dogs, shirs } from '../Data/data';
import { useDataGridMapper } from './useDataGridMapper';

export const types = [{ name: 'shir', elements: shirs }, { name: 'dog', elements: dogs }, { name: 'cat', elements: cats }];

const DataGridMapper = () => {
    const [rows, setRows] = useState<any[]>([]);
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [currentDisplayedNames, setCurrentDisplayedNames] = useState<string[]>([]);
    
    const {
        getCommonProps,
        getSelectedEntitiesProps,
        setTableValues
    } = useDataGridMapper({currentDisplayedNames, setColumns, setRows});
    
  
    useEffect(() => {
      if (currentDisplayedNames.length !== 0) {
        const propsArray = getSelectedEntitiesProps();
        const commonProps = getCommonProps(propsArray);
        setTableValues(commonProps)
      } else {
        setRows([]);
        setColumns([]);
      }
    }, [currentDisplayedNames])
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
      event.target.checked ? setCurrentDisplayedNames(prev => [...prev, name]) : setCurrentDisplayedNames(prev => prev.filter(displayed => name != displayed));
    }
    return (
      <div>
        <FormGroup>
          {types.map(type => (
            <FormControlLabel control={<Checkbox onChange={(event) => handleChange(event, type.name)} />} label={type.name} />
          ))}
        </FormGroup>
        <div style={{ height: 400, width: 500 }}>
          <DataGridPro
            rows={rows}
            columns={columns}
          />    
        </div>
      </div>
    )
}

export default DataGridMapper;