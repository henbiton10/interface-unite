import React, { useEffect, useState } from 'react';
import { DataGridPro, GridColDef, LicenseInfo } from '@mui/x-data-grid-pro';
import { Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import { ClassNames } from '@emotion/react';

interface Dog {
  id: number;
  name: string;
  bark: string;
  food: string;
}

interface Cat {
  id: number;
  name: string;
  meow: string;
  food: string;
  hobby: string;
}

interface ShirBarak {
  id: number;
  protein: string;
  food: string;
  hobby: string;
}

const dogs: Dog[] = [
  {
    id: 1,
    name: 'doggo',
    bark: 'woof',
    food: 'dogly',
  }, 
  {
    id: 2,
    name: 'naknikos',
    bark: 'hav',
    food: 'bonzo',
  },
  {
    id: 3,
    name: 'mbappe',
    bark: 'pendel',
    food: 'kaki',
  }
];

const cats: Cat[] = [
  {
    id: 4,
    name: 'kitty',
    food: 'salmon',
    hobby: 'annoy',
    meow: 'meowwwww'
  },
  {
    id: 5,
    name: 'mitzi',
    food: 'milk',
    hobby: 'annoy',
    meow: 'meu'
  },
  {
    id: 6,
    name: 'menashe',
    food: 'salmon',
    hobby: 'annoy',
    meow: 'khhhhh'
  }
];

const shirs: ShirBarak[] = [
  {
    id: 7,
    protein: 'a lot',
    food: 'beans',
    hobby: 'kosher'
  },
  {
    id: 8,
    protein: 'too much',
    food: 'tuna',
    hobby: 'train'
  },
  {
    id: 9,
    protein: 'yes',
    food: 'cottage chesse',
    hobby: 'mahon kosher'
  }
]
const types = [{name: 'shir', elements: shirs},{name: 'dog', elements: dogs},{name: 'cat', elements: cats}]
LicenseInfo.setLicenseKey('6239d8e4e4e446a3d208d638ff7603bdT1JERVI6Um9tLVRlc3QsRVhQSVJZPTIyMjMwNjEyMDAwMDAsS0VZVkVSU0lPTj0x')
const App:React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [currentDisplayedNames, setCurrentDisplayedNames] = useState<string[]>([]);

  const getSelectedEntitiesProps = () => {
    const properties:string[][] = currentDisplayedNames.map(name => {
      return Object.keys(types.find(type => type.name === name)!.elements[0]);
    })
    return properties;
  }

  const getCommonProps = (propsArray: string[][]) => {
    const result = propsArray.shift()!.filter((v) => {
      return propsArray.every((a) => {
          return a.indexOf(v) !== -1;
      });
  });
    return result
  }


  const setTableValues = (props: string[]) => {
    let newRows: any[] = [];

    const newColumns:GridColDef[] = props.map(key => (
      {field: key, headerName: key === 'id' ? 'ID' : key, width: 100}
    ));

    setColumns(newColumns);
    const arrays: any[][] = currentDisplayedNames.map(name => types.find(type => type.name === name)!.elements)
    
    arrays.forEach(arr => {
      let row: any = {};
      arr.forEach(prop => {
        const mapper = Object.entries(prop)
        
        const properValues = mapper.filter(map => props.some(key => map[0] === key));
        if (properValues.length) {
          properValues.forEach(value => {
            row[value[0].toString()] = value[1]
          })
          newRows = [...newRows, {...row}]
          console.log(properValues);
        }
      })
    })
    setRows(newRows)
  }
 
  useEffect(() => {
    if(currentDisplayedNames.length !== 0) {
      const propsArray = getSelectedEntitiesProps();
      const commonProps = getCommonProps(propsArray);
      setTableValues(commonProps)
    } else {
      setRows([]);
      setColumns([]);
    }

  }, [currentDisplayedNames])
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
    event.target.checked ? setCurrentDisplayedNames(prev => [...prev, name]) :  setCurrentDisplayedNames(prev => prev.filter(displayed => name != displayed)); 
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

export default App;