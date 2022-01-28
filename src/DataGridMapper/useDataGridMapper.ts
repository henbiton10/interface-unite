import { Dispatch, SetStateAction } from 'react';
import { GridColDef } from '@mui/x-data-grid-pro';

import { types } from './DataGridMapper';

interface useDataGridMapperIncome {
    currentDisplayedNames: string[];
    setColumns: Dispatch<SetStateAction<GridColDef[]>>;
    setRows: Dispatch<React.SetStateAction<any[]>>;
}

interface useDataGridMapperOutcome {
    getSelectedEntitiesProps: () => string[][];
    getCommonProps: (propsArray: string[][]) => string[];
    setTableValues: (props: string[]) => void;
}

export const useDataGridMapper = (props: useDataGridMapperIncome): useDataGridMapperOutcome => {
    const { currentDisplayedNames, setColumns, setRows } = props;
    //generate the common keys to GridColDef[] of mui datagrid
    const generateColumnsFromKeys = (keys: string[]): GridColDef[] => keys.map(key => (
        { field: key, headerName: key === 'id' ? 'ID' : key, width: 100 }
      ))
    //generate the rows to any[] compatible to the columns definition
      const generateRowsFromKeys = (keysToDisplay: string[]) => {
        let newRows: any[] = [];

        //get the elements to show arrays
        const arrays: any[][] = currentDisplayedNames.map(name => types.find(type => type.name === name)!.elements)
        arrays.forEach(arr => {
            //init new row
          let row: any = {};
          //prop is one object
          arr.forEach(prop => {
              //mapper is the object as an array of [key,val]
            const mapper = Object.entries(prop)
            //find only the keys that appear at the keysToDisplay and filter them out
            const properValues = mapper.filter(map => keysToDisplay.some(key => map[0] === key));
            //if we have some(should have by definition because the mandatory id field)
            if (properValues.length) {
                //add the key: val to the row json object
              properValues.forEach(value => {
                row[value[0].toString()] = value[1]
              })
              //be careful to add it by value and not by reference
              newRows = [...newRows, { ...row }]
            }
          })
        })
        return newRows
      }
    //check the types of objects desired to display and returns the keys of each object as string[]
    const getSelectedEntitiesProps = () => {
        const properties: string[][] = currentDisplayedNames.map(name => {
          return Object.keys(types.find(type => type.name === name)!.elements[0]);
        })
        return properties;
      }
    
      //recieves the string arrays of each object and returns an string[] of common keys for all of them
      const getCommonProps = (propsArray: string[][]) => {
        const result = propsArray.shift()!.filter((v) => {
          return propsArray.every((a) => {
            return a.indexOf(v) !== -1;
          });
        });
        return result
      }
    
      const setTableValues = (props: string[]) => {
        const newColumns = generateColumnsFromKeys(props)
        setColumns(newColumns);
        const newRows = generateRowsFromKeys(props);
        setRows(newRows)
      }
      return {
            getCommonProps,
            getSelectedEntitiesProps,
            setTableValues
      }
}