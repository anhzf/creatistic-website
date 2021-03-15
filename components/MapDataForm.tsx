import TextInput from 'components/elements/TextInput';
import { Dispatch, SetStateAction, useCallback } from 'react';
import List from 'components/List';
import Button from 'components/elements/Button';
import { HiTrash } from 'react-icons/hi'

export interface MapData {
  key: string;
  value: string | number;
}

interface Props {
  dataHandler: [
    MapData[],
    Dispatch<SetStateAction<MapData[]>>
  ]
}

export default function MapDataForm({ dataHandler: [dataSet, setDataSet] }: Props) {
  const addData = useCallback(
    // prevent adding dataSet when its empty or last dataSet key not empty
    () => (!dataSet.length || dataSet[dataSet.length - 1].key) && setDataSet([...dataSet, {
      key: '',
      value: '',
    }]),
    [dataSet],
  );
  const setData = useCallback(
    (index: number, val: MapData | ((v: MapData) => MapData)) => setDataSet(dataSet
      .map((data, i) => (i === index)
        ? typeof val === 'function' ? val(data) : val
        : data)),
    [dataSet],
  );
  const popData = useCallback(
    () => setDataSet(dataSet.splice(0, dataSet.length - 1)),
    [dataSet],
  );

  return (
    <List>
      {dataSet.map((data, i) => (
        <List.Item key={i}>
          <List.DT>
            <TextInput
              value={data.key}
              onChange={e => setData(i, { ...data, key: e.target.value })}
            />
          </List.DT>
          <List.DD>
            <TextInput
              value={data.value}
              onChange={e => setData(i, { ...data, value: e.target.value })}
            />
            <button onClick={popData}><HiTrash /></button>
          </List.DD>
        </List.Item>
      ))}

      <List.Item>
        <Button onClick={addData} className="col-span-3">Tambah data</Button>
      </List.Item>
    </List>
  )
}

export const MapDataListToObject = function (mapDataList: MapData[]) {
  return mapDataList.reduce((acc, mapData) => ({
    ...acc,
    [mapData.key]: mapData.value,
  }), {});
};

export const ObjectToMapDataList = function (data: Record<string, string>): MapData[] {
  return Object.entries(data).map(([k, v]) => ({
    key: k,
    value: v,
  }))
}
